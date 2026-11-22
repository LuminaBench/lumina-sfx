const DEFAULT_RPM_CONFIG = {
  minRpm: 800,
  maxRpm: 7000,
  minPitch: 0.7,
  maxPitch: 2.0,
  minGain: 0.65,
  maxGain: 1.0,
};

const DEFAULT_WEATHER_CONFIG = {
  minGain: 0.08,
  maxGain: 1.0,
  minFreq: 500,
  maxFreq: 14000,
  minPitch: 0.92,
  maxPitch: 1.12,
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function extractVec3(v) {
  if (!v) return null;
  if (Array.isArray(v) || ArrayBuffer.isView(v)) {
    return {
      x: Number(v[0]) || 0,
      y: Number(v[1]) || 0,
      z: Number(v[2]) || 0,
    };
  }
  if (typeof v.x === 'number' && typeof v.y === 'number' && typeof v.z === 'number') {
    return { x: v.x, y: v.y, z: v.z };
  }
  return null;
}

function normalizeVec3(v, fallback) {
  const len = Math.hypot(v.x, v.y, v.z);
  if (len < 1e-6) return fallback;
  return { x: v.x / len, y: v.y / len, z: v.z / len };
}

function setParam(param, value, now, rampTime = 0) {
  param.cancelScheduledValues(now);
  if (rampTime > 0) {
    param.setValueAtTime(param.value, now);
    param.linearRampToValueAtTime(value, now + rampTime);
  } else {
    param.setValueAtTime(value, now);
  }
}

function setPannerPosition(panner, pos, now, rampTime = 0) {
  if ('positionX' in panner) {
    setParam(panner.positionX, pos.x, now, rampTime);
    setParam(panner.positionY, pos.y, now, rampTime);
    setParam(panner.positionZ, pos.z, now, rampTime);
  } else if (typeof panner.setPosition === 'function') {
    panner.setPosition(pos.x, pos.y, pos.z);
  }
}

function setListenerTransform(listener, pos, forward, up, now, rampTime = 0) {
  if ('positionX' in listener) {
    setParam(listener.positionX, pos.x, now, rampTime);
    setParam(listener.positionY, pos.y, now, rampTime);
    setParam(listener.positionZ, pos.z, now, rampTime);
  } else if (typeof listener.setPosition === 'function') {
    listener.setPosition(pos.x, pos.y, pos.z);
  }

  if ('forwardX' in listener && 'upX' in listener) {
    setParam(listener.forwardX, forward.x, now, rampTime);
    setParam(listener.forwardY, forward.y, now, rampTime);
    setParam(listener.forwardZ, forward.z, now, rampTime);
    setParam(listener.upX, up.x, now, rampTime);
    setParam(listener.upY, up.y, now, rampTime);
    setParam(listener.upZ, up.z, now, rampTime);
  } else if (typeof listener.setOrientation === 'function') {
    listener.setOrientation(forward.x, forward.y, forward.z, up.x, up.y, up.z);
  }
}

export class SoundHandle {
  constructor({
    id,
    audio,
    context,
    source,
    filter,
    gain,
    panner,
    baseVolume,
    basePitch,
    pitchVariation,
    rpmConfig,
    weatherConfig,
    pannerDefaults,
    onDispose,
  }) {
    this.id = id;
    this._audio = audio;
    this._ctx = context;
    this._source = source;
    this._filter = filter;
    this._gain = gain;
    this._panner = panner;
    this._pannerDefaults = pannerDefaults;
    this._onDispose = onDispose;

    this._baseVolume = baseVolume;
    this._basePitch = basePitch;
    this._pitchVariation = pitchVariation;

    this._rpmConfig = { ...DEFAULT_RPM_CONFIG, ...rpmConfig };
    this._weatherConfig = { ...DEFAULT_WEATHER_CONFIG, ...weatherConfig };

    this._rpmPitch = 1;
    this._rpmGain = 1;
    this._weatherPitch = 1;
    this._weatherGain = 1;
    this._filterFreq = 20000;

    this._playing = true;
    this._stopping = false;
    this._cleaned = false;

    this._source.onended = () => this._cleanup();
  }

  get isPlaying() {
    return this._playing;
  }

  get pitchVariation() {
    return this._pitchVariation;
  }

  get playbackRate() {
    return clamp(
      this._basePitch * this._pitchVariation * this._rpmPitch * this._weatherPitch,
      0.05,
      8
    );
  }

  setPosition(position, rampTime = 0) {
    if (!this._playing) return this;
    const pos = extractVec3(position);
    if (!pos) return this;

    if (!this._panner) {
      this._panner = this._audio._createPanner(this._pannerDefaults);
      this._gain.disconnect();
      this._gain.connect(this._panner);
      this._panner.connect(this._audio._masterGain);
    }

    setPannerPosition(this._panner, pos, this._ctx.currentTime, rampTime);
    return this;
  }

  setVolume(volume, rampTime = 0.02) {
    if (!this._playing || this._stopping) return this;
    this._baseVolume = Math.max(0, Number(volume) || 0);
    this._applyGain(rampTime);
    return this;
  }

  setPitch(pitch, rampTime = 0.02) {
    if (!this._playing || this._stopping) return this;
    this._basePitch = clamp(Number(pitch) || 1, 0.05, 8);
    this._applyPlaybackRate(rampTime);
    return this;
  }

  setRpm(rpm, rampTime = 0.05) {
    if (!this._playing || this._stopping) return this;
    const { minRpm, maxRpm, minPitch, maxPitch, minGain, maxGain } = this._rpmConfig;
    const span = Math.max(1e-6, maxRpm - minRpm);
    const t = clamp((rpm - minRpm) / span, 0, 1);

    this._rpmPitch = lerp(minPitch, maxPitch, t);
    this._rpmGain = lerp(minGain, maxGain, t);

    this._applyPlaybackRate(rampTime);
    this._applyGain(rampTime);
    return this;
  }

  setWeather(intensity, rampTime = 0.15) {
    if (!this._playing || this._stopping) return this;
    const { minGain, maxGain, minFreq, maxFreq, minPitch, maxPitch } = this._weatherConfig;
    const t = clamp(Number(intensity) || 0, 0, 1);
    const low = Math.max(20, minFreq);
    const high = Math.max(low, maxFreq);

    this._weatherGain = lerp(minGain, maxGain, t);
    this._weatherPitch = lerp(minPitch, maxPitch, t);
    this._filterFreq = low * Math.pow(high / low, t);

    const now = this._ctx.currentTime;
    setParam(this._filter.frequency, this._filterFreq, now, rampTime);
    this._applyPlaybackRate(rampTime);
    this._applyGain(rampTime);
    return this;
  }

  stop(fadeOut = 0.03) {
    if (!this._playing || this._stopping) return;
    this._stopping = true;

    const now = this._ctx.currentTime;
    if (fadeOut > 0 && this._ctx.state === 'running') {
      setParam(this._gain.gain, 0, now, fadeOut);
      try {
        this._source.stop(now + fadeOut + 0.01);
      } catch {
        this._cleanup();
      }
    } else {
      try {
        this._source.stop();
      } catch {
        // Source already stopped.
      }
      this._cleanup();
    }
  }

  _applyPlaybackRate(rampTime) {
    setParam(this._source.playbackRate, this.playbackRate, this._ctx.currentTime, rampTime);
  }

  _applyGain(rampTime) {
    const target = clamp(this._baseVolume * this._rpmGain * this._weatherGain, 0, 4);
    setParam(this._gain.gain, target, this._ctx.currentTime, rampTime);
  }

  _cleanup() {
    if (this._cleaned) return;
    this._cleaned = true;
    this._playing = false;
    try {
      this._source.disconnect();
      this._filter.disconnect();
      this._gain.disconnect();
      if (this._panner) this._panner.disconnect();
    } catch {
      // Ignore disconnect errors on already-released nodes.
    }
    this._onDispose(this);
  }
}

export class WebGameAudio {
  constructor(options = {}) {
    this.assetRoot = options.assetRoot ?? '';
    this.pitchJitter = options.pitchJitter ?? 0.05;
    this.defaultDistanceModel = options.distanceModel ?? 'inverse';
    this.defaultPanningModel = options.panningModel ?? 'HRTF';
    this.defaultRefDistance = options.refDistance ?? 1;
    this.defaultMaxDistance = options.maxDistance ?? 100;
    this.defaultRolloffFactor = options.rolloffFactor ?? 1;
    this._masterVolume = options.masterVolume ?? 1;

    this._ctx = options.context ?? null;
    this._ownsContext = !options.context;
    this._masterGain = null;
    this._pools = new Map();
    this._active = new Set();

    if (this._ctx) {
      this._initMasterGain();
    }
  }

  get context() {
    return this.ensureContext();
  }

  get state() {
    return this._ctx ? this._ctx.state : 'uninitialized';
  }

  ensureContext() {
    if (!this._ctx) {
      const AudioCtx = globalThis.AudioContext || globalThis.webkitAudioContext;
      if (!AudioCtx) {
        throw new Error('Web Audio API is not available in this environment.');
      }
      this._ctx = new AudioCtx();
      this._initMasterGain();
    }
    return this._ctx;
  }

  _initMasterGain() {
    this._masterGain = this._ctx.createGain();
    this._masterGain.gain.value = clamp(this._masterVolume, 0, 4);
    this._masterGain.connect(this._ctx.destination);
  }

  async unlock() {
    const ctx = this.ensureContext();
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
    return ctx;
  }

  resolvePath(relativePath) {
    if (/^(?:[a-z]+:)?\/\//i.test(relativePath) || relativePath.startsWith('/')) {
      return relativePath;
    }
    if (!this.assetRoot) return relativePath;
    const base = this.assetRoot.replace(/\/+$/, '');
    const rel = relativePath.replace(/^\/+/, '');
    return `${base}/${rel}`;
  }

  async registerPool(
    id,
    paths = [`audio/${id}-01.wav`, `audio/${id}-02.wav`, `audio/${id}-03.wav`]
  ) {
    if (!id || typeof id !== 'string') {
      throw new Error('Pool ID must be a non-empty string.');
    }
    if (!Array.isArray(paths) || paths.length === 0) {
      throw new Error(`Pool "${id}" requires an array of WAV paths (e.g. 3 variants).`);
    }

    const ctx = this.ensureContext();
    const buffers = await Promise.all(
      paths.map(async (path) => {
        const url = this.resolvePath(path);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to load audio "${url}" (${response.status}).`);
        }
        const arrayBuffer = await response.arrayBuffer();
        return ctx.decodeAudioData(arrayBuffer);
      })
    );

    this._pools.set(id, { buffers, nextIndex: 0 });
    return buffers.length;
  }

  hasPool(id) {
    return this._pools.has(id);
  }

  setMasterVolume(volume, rampTime = 0.02) {
    this._masterVolume = clamp(Number(volume) || 0, 0, 4);
    if (this._masterGain) {
      setParam(this._masterGain.gain, this._masterVolume, this._ctx.currentTime, rampTime);
    }
  }

  setListener(
    position,
    forward = { x: 0, y: 0, z: -1 },
    up = { x: 0, y: 1, z: 0 },
    rampTime = 0
  ) {
    const ctx = this.ensureContext();
    const pos = extractVec3(position);
    if (!pos) return;
    const fwd = normalizeVec3(extractVec3(forward) ?? { x: 0, y: 0, z: -1 }, { x: 0, y: 0, z: -1 });
    const upVec = normalizeVec3(extractVec3(up) ?? { x: 0, y: 1, z: 0 }, { x: 0, y: 1, z: 0 });
    setListenerTransform(ctx.listener, pos, fwd, upVec, ctx.currentTime, rampTime);
  }

  syncListener(cameraOrObject, rampTime = 0) {
    if (!cameraOrObject) return;
    if (cameraOrObject.matrixWorld && cameraOrObject.matrixWorld.elements) {
      if (typeof cameraOrObject.updateMatrixWorld === 'function') {
        cameraOrObject.updateMatrixWorld();
      }
      const e = cameraOrObject.matrixWorld.elements;
      const pos = { x: e[12], y: e[13], z: e[14] };
      const up = { x: e[4], y: e[5], z: e[6] };
      const forward = { x: -e[8], y: -e[9], z: -e[10] };
      this.setListener(pos, forward, up, rampTime);
      return;
    }
    if (cameraOrObject.position) {
      this.setListener(
        cameraOrObject.position,
        cameraOrObject.forward,
        cameraOrObject.up,
        rampTime
      );
      return;
    }
    this.setListener(cameraOrObject, undefined, undefined, rampTime);
  }

  play(id, options = {}) {
    const pool = this._pools.get(id);
    if (!pool) {
      throw new Error(`Audio pool "${id}" is not registered.`);
    }

    const ctx = this.ensureContext();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const buffer = pool.buffers[pool.nextIndex];
    pool.nextIndex = (pool.nextIndex + 1) % pool.buffers.length;

    const jitter = Math.max(0, options.pitchJitter ?? this.pitchJitter);
    const pitchVariation = clamp(1 + (Math.random() * 2 - 1) * jitter, 0.25, 4);
    const basePitch = clamp(options.pitch ?? 1, 0.05, 8);
    const baseVolume = Math.max(0, options.volume ?? 1);

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = Boolean(options.loop);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 20000;
    filter.Q.value = 0.707;

    const gain = ctx.createGain();
    gain.gain.value = baseVolume;

    const pannerDefaults = {
      distanceModel: options.distanceModel ?? this.defaultDistanceModel,
      panningModel: options.panningModel ?? this.defaultPanningModel,
      refDistance: options.refDistance ?? this.defaultRefDistance,
      maxDistance: options.maxDistance ?? this.defaultMaxDistance,
      rolloffFactor: options.rolloffFactor ?? this.defaultRolloffFactor,
    };

    const pos = extractVec3(options.position);
    let panner = null;
    if (pos || options.spatial) {
      panner = this._createPanner(pannerDefaults);
      if (pos) {
        setPannerPosition(panner, pos, ctx.currentTime, 0);
      }
    }

    source.connect(filter);
    filter.connect(gain);
    if (panner) {
      gain.connect(panner);
      panner.connect(this._masterGain);
    } else {
      gain.connect(this._masterGain);
    }

    const handle = new SoundHandle({
      id,
      audio: this,
      context: ctx,
      source,
      filter,
      gain,
      panner,
      baseVolume,
      basePitch,
      pitchVariation,
      rpmConfig: options.rpmConfig,
      weatherConfig: options.weatherConfig,
      pannerDefaults,
      onDispose: (h) => this._active.delete(h),
    });

    if (typeof options.rpm === 'number') {
      handle.setRpm(options.rpm, 0);
    }
    if (typeof options.weather === 'number') {
      handle.setWeather(options.weather, 0);
    }
    handle._applyPlaybackRate(0);
    handle._applyGain(0);

    this._active.add(handle);
    source.start(ctx.currentTime);
    return handle;
  }

  playLoop(id, options = {}) {
    return this.play(id, { ...options, loop: true });
  }

  stopAll(fadeOut = 0.03) {
    for (const handle of [...this._active]) {
      handle.stop(fadeOut);
    }
  }

  async dispose() {
    this.stopAll(0);
    this._pools.clear();
    if (this._ctx && this._ownsContext && this._ctx.state !== 'closed') {
      await this._ctx.close();
    }
  }

  _createPanner(config) {
    const panner = this._ctx.createPanner();
    panner.panningModel = config.panningModel;
    panner.distanceModel = config.distanceModel;
    panner.refDistance = config.refDistance;
    panner.maxDistance = config.maxDistance;
    panner.rolloffFactor = config.rolloffFactor;
    return panner;
  }
}

export default WebGameAudio;
