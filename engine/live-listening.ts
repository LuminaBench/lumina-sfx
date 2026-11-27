// A small, independent live player for pre-rendered dry stems. Preload outside the input handler.
import { poseAt, relativePose, roomTaps, validateTrajectory, validatePlacement } from './spatial.ts';
import type { OutputMode, Placement, Pose, Trajectory } from './spatial.ts';

interface Source {
  label: string;
  offsetSec: number;
  dry: { file: string; restoreGain: number };
  placement: Placement;
}
interface Segment {
  from: number;
  to: number;
  gain: Record<string, number>;
}
export interface ListeningManifest {
  schemaVersion: 2;
  masterGain?: number;
  frames: number;
  rate: number;
  output: OutputMode;
  listener: Trajectory;
  sources: Source[];
  regions: Segment[];
}
type LiveVoice = {
  s: Source;
  src: AudioBufferSourceNode;
  filter: BiquadFilterNode;
  direct: GainNode;
  echo: GainNode;
  reflectionNodes: AudioNode[];
  wide: GainNode;
  panner: PannerNode;
  focus: GainNode;
  placement: Placement;
};
const rad = Math.PI / 180;
function ramp(param: AudioParam, value: number, t: number, initial: boolean) {
  if (initial) param.setValueAtTime(value, t);
  else param.linearRampToValueAtTime(value, t);
}

const readyResponses = new Map<number, Promise<void>>();
// Chrome loads its per-device-rate HRTF database asynchronously on first use.
// An offline quantum warms the native renderer before the first audible source starts.
export function prepareHeadphones(rate: number) {
  let ready = readyResponses.get(rate);
  if (!ready) {
    ready = (async () => {
      const probe = new OfflineAudioContext(2, 2048, rate),
        source = probe.createBufferSource(),
        ear = probe.createPanner();
      const sample = probe.createBuffer(1, 2048, rate);
      sample.getChannelData(0)[0] = 0.001;
      source.buffer = sample;
      ear.panningModel = 'HRTF';
      ear.positionX.value = 1;
      source.connect(ear);
      ear.connect(probe.destination);
      source.start();
      await probe.startRendering();
      source.disconnect();
      ear.disconnect();
    })().catch((e) => {
      readyResponses.delete(rate);
      throw e;
    });
    readyResponses.set(rate, ready);
  }
  return ready;
}
// Smooth updates from a game camera over one control interval. Explicit scene-clock
// paths retain their authored timing; a pose change also supplies radial velocity.
function moveTo(previous: Partial<Trajectory>, requested: Partial<Trajectory>, clock: number): Trajectory {
  if (requested.path?.length) return { ...requested, position: requested.position ?? [0, 0, 0] };
  const start = poseAt(previous, clock),
    end = poseAt(requested, 0);
  return { ...start, path: [...(clock > 0 ? [{ ...start, at: clock }] : []), { ...end, at: clock + 0.025 }] };
}
function lastMove(p: Placement) {
  const curve = p.obstruction;
  const end = Array.isArray(curve) ? (curve.at(-1)?.[0] ?? 0) : 0;
  return Math.max(end, p.path?.at(-1)?.at ?? 0);
}
export class ListeningPlayer {
  readonly context: BaseAudioContext;
  readonly manifest: ListeningManifest;
  private buffers: Map<string, AudioBuffer>;
  private destination: AudioNode;
  private voices: LiveVoice[] = [];
  private listener: Trajectory;
  private epoch = 0;
  private running = false;
  private timer?: ReturnType<typeof setInterval>;
  private scheduledUntil = 0;
  constructor(
    context: BaseAudioContext,
    manifest: ListeningManifest,
    buffers: Map<string, AudioBuffer>,
    destination: AudioNode = context.destination,
  ) {
    if (manifest.schemaVersion !== 2) throw Error('Expected a version 2 stem manifest');
    validateTrajectory(manifest.listener);
    for (const s of manifest.sources) {
      validatePlacement(s.placement);
      if (!buffers.has(s.label)) throw Error('Missing dry buffer for ' + s.label);
    }
    this.context = context;
    this.manifest = manifest;
    this.buffers = buffers;
    this.listener = manifest.listener;
    this.destination = destination;
  }
  static async preload(context: BaseAudioContext, url: URL, destination: AudioNode = context.destination) {
    const response = await fetch(url);
    if (!response.ok) throw Error('Cannot load ' + url);
    const manifest: ListeningManifest = await response.json();
    const buffers = new Map<string, AudioBuffer>();
    const warm = manifest.output === 'headphones' ? prepareHeadphones(context.sampleRate) : Promise.resolve();
    await Promise.all([
      warm,
      ...manifest.sources.map(async (s) => {
        const reply = await fetch(new URL(s.dry.file, url));
        if (!reply.ok) throw Error('Cannot load ' + s.dry.file);
        buffers.set(s.label, await context.decodeAudioData(await reply.arrayBuffer()));
      }),
    ]);
    return new ListeningPlayer(context, manifest, buffers, destination);
  }
  private orient(p: Pose, t: number, initial: boolean) {
    const l = this.context.listener,
      [x, y, z] = p.position,
      yaw = (p.yaw ?? 0) * rad,
      pitch = (p.pitch ?? 0) * rad,
      roll = (p.roll ?? 0) * rad;
    const sy = Math.sin(yaw),
      cy = Math.cos(yaw),
      sp = Math.sin(pitch),
      cp = Math.cos(pitch),
      cr = Math.cos(roll),
      sr = Math.sin(roll);
    for (const [param, value] of [
      [l.positionX, x],
      [l.positionY, y],
      [l.positionZ, z],
      [l.forwardX, sy * cp],
      [l.forwardY, sp],
      [l.forwardZ, -cy * cp],
      [l.upX, -sy * sp * cr - cy * sr],
      [l.upY, cp * cr],
      [l.upZ, cy * sp * cr - sy * sr],
    ] as const)
      ramp(param, value, t, initial);
  }
  private place(v: LiveVoice, t: number, initial: boolean, clock = t - this.epoch) {
    const p = v.placement,
      rel = relativePose(p, this.listener, clock),
      pos = poseAt(p, clock).position;
    const local = p.kind === 'listener',
      width = local ? 1 : (p.spread ?? (p.kind === 'area' ? 0.85 : 0));
    const gain = local ? 1 : rel.gain;
    const amp = v.s.dry.restoreGain * (this.manifest.masterGain ?? 1);
    ramp(v.echo.gain, local ? 0 : gain * amp * (0.15 + 0.85 * rel.obstruction), t, initial);
    ramp(v.direct.gain, amp * gain * (1 - width), t, initial);
    ramp(v.wide.gain, amp * gain * width, t, initial);
    ramp(
      v.filter.frequency,
      local ? this.context.sampleRate * 0.49 : Math.min(rel.cutoff, this.context.sampleRate * 0.45),
      t,
      initial,
    );
    const pan = v.panner;
    for (const [param, value] of [
      [pan.positionX, pos[0]],
      [pan.positionY, pos[1]],
      [pan.positionZ, pos[2]],
    ] as const)
      ramp(param, value, t, initial);
    if (p.doppler && !local) {
      const acrossCut = [p, this.listener].some(path =>
        path.path?.some(key => key.cut && key.at > clock && key.at <= clock + 0.025));
      const next = relativePose(p, this.listener, clock + 0.025);
      const vRad = acrossCut ? 0 : Math.max(-170, Math.min(300, (next.distance - rel.distance) / 0.025));
      ramp(v.src.playbackRate, Math.min(1.8, Math.max(0.55, 343 / (343 + vRad))), t, initial);
    }
  }
  private schedule(start: number, voices: LiveVoice[], scheduleEar: boolean, until = Infinity) {
    const length = this.manifest.frames / this.manifest.rate,
      end = Math.min(until, this.epoch + length);
    const cuts = new Set([this.listener, ...voices.map(v => v.placement)]
      .flatMap(p => (p.path ?? []).filter(key => key.cut).map(key => this.epoch + key.at)));
    const movingUntil = Math.max(
      this.epoch + (this.listener.path?.at(-1)?.at ?? 0),
      ...voices.map(v => this.epoch + lastMove(v.placement)),
      ...[...cuts].map(t => t + 0.008),
    );
    const stop = Math.max(start, Math.min(end, movingUntil));
    const times = new Set([start, stop]);
    for (let t = start + 0.025; t < stop; t += 0.025) times.add(t);
    for (const t of cuts) {
      if (t > start && t < stop) times.add(t);
      if (t + 0.008 > start && t + 0.008 < stop) times.add(t + 0.008);
    }
    for (const t of [...times].sort((a, b) => a - b)) {
      // Hold the old ear until the cut. Web Audio ramps from there to the new pose.
      const initial = t === start;
      const clock = t - this.epoch - (!initial && cuts.has(t) ? 1e-8 : 0);
      if (scheduleEar && (initial || this.listener.path?.length))
        this.orient(poseAt(this.listener, clock), t, initial);
      for (const v of voices)
        if (initial || this.listener.path?.length || v.placement.path?.length || Array.isArray(v.placement.obstruction))
          this.place(v, t, initial, clock);
    }
  }
  play(when = this.context.currentTime + 0.035) {
    if (!Number.isFinite(when) || when < this.context.currentTime - 0.01) throw Error('Invalid scene start');
    this.stop();
    this.epoch = when;
    this.running = true;
    for (const s of this.manifest.sources) {
      const ctx = this.context,
        src = ctx.createBufferSource(),
        filter = ctx.createBiquadFilter(),
        panner = ctx.createPanner();
      const direct = ctx.createGain(),
        wide = ctx.createGain(),
        focus = ctx.createGain();
      src.buffer = this.buffers.get(s.label)!;
      filter.type = 'lowpass';
      filter.Q.value = 0.707;
      panner.panningModel = this.manifest.output === 'headphones' ? 'HRTF' : 'equalpower';
      panner.rolloffFactor = 0;
      if (s.placement.kind === 'listener') src.connect(wide);
      else {
        src.connect(filter);
        filter.connect(panner);
        panner.connect(direct);
        filter.connect(wide);
      }
      direct.connect(focus);
      wide.connect(focus);
      if (this.manifest.output === 'mono') {
        focus.channelCount = 1;
        focus.channelCountMode = 'explicit';
      }
      focus.connect(this.destination);
      for (const [i, r] of this.manifest.regions.entries()) {
        const gain = r.gain[s.label],
          t = when + r.from;
        if (!i) focus.gain.setValueAtTime(gain, t);
        else {
          const prev = this.manifest.regions[i - 1].gain[s.label],
            duration = Math.min(0.1, (r.to - r.from) / 2);
          const values = Float32Array.from(
            { length: 17 },
            (_, n) => prev + (gain - prev) * (0.5 - 0.5 * Math.cos((n * Math.PI) / 16)),
          );
          focus.gain.setValueCurveAtTime(values, t, duration);
        }
      }
      const echo = ctx.createGain(),
        reflectionNodes: AudioNode[] = [];
      if (s.placement.room) {
        echo.connect(focus);
        for (const [delay, g] of roomTaps[s.placement.room]) {
          const tap = ctx.createDelay(),
            level = ctx.createGain();
          tap.delayTime.value = delay;
          level.gain.value = g;
          filter.connect(tap);
          tap.connect(level);
          level.connect(echo);
          reflectionNodes.push(tap, level);
        }
      }
      const voice = {
        s,
        src,
        filter,
        panner,
        direct,
        wide,
        focus,
        echo,
        reflectionNodes,
        placement: s.placement,
      };
      this.voices.push(voice);
      src.onended = () => {
        for (const node of [src, filter, panner, direct, wide, focus, echo, ...reflectionNodes])
          node.disconnect();
        this.voices = this.voices.filter((v) => v !== voice);
        if (!this.voices.length) this.running = false;
      };
      src.start(when + s.offsetSec);
      src.stop(when + s.offsetSec + src.buffer.duration);
    }
    const live = 'resume' in this.context && !('startRendering' in this.context);

    this.scheduledUntil = live ? when + 0.35 : Infinity;
    this.schedule(when, this.voices, true, this.scheduledUntil);
    if (live)
      this.timer = setInterval(() => {
        const now = this.context.currentTime,
          end = this.epoch + this.manifest.frames / this.manifest.rate;
        if (!this.running || now >= end) {
          clearInterval(this.timer);
          return;
        }
        const start = Math.max(now, this.scheduledUntil),
          next = now + 0.35;
        if (next > start) {
          if (
            (this.listener.path?.at(-1)?.at ?? 0) > start - this.epoch ||
            this.voices.some((v) => lastMove(v.placement) > start - this.epoch)
          )
            this.schedule(start, this.voices, true, next);
          this.scheduledUntil = next;
        }
      }, 100);
  }
  setListener(listener: Trajectory) {
    validateTrajectory(listener);
    if (!this.running) {
      this.listener = listener;
      return;
    }
    this.listener = moveTo(this.listener, listener, Math.max(0, this.context.currentTime - this.epoch));
    const now = Math.max(this.context.currentTime, this.epoch);
    if (now >= this.epoch + this.manifest.frames / this.manifest.rate) return;
    const l = this.context.listener;
    for (const a of [
      l.positionX,
      l.positionY,
      l.positionZ,
      l.forwardX,
      l.forwardY,
      l.forwardZ,
      l.upX,
      l.upY,
      l.upZ,
    ])
      a.cancelScheduledValues(now);
    for (const v of this.voices) this.cancelPlacement(v, now);
    this.schedule(now, this.voices, true, this.timer ? Math.max(now + 0.1, this.scheduledUntil) : Infinity);
  }
  private cancelPlacement(v: LiveVoice, t: number) {
    for (const a of [
      v.direct.gain,
      v.wide.gain,
      v.echo.gain,
      v.filter.frequency,
      v.panner.positionX,
      v.panner.positionY,
      v.panner.positionZ,
      v.src.playbackRate,
    ])
      a.cancelScheduledValues(t);
  }
  setPlacement(label: string, p: Placement) {
    validatePlacement(p);
    const v = this.voices.find((v) => v.s.label === label);
    if (!v) throw Error('No active emitter ' + label);
    if (p.room !== v.placement.room) throw Error('Restart to change room geometry');
    if ((p.kind === 'listener') !== (v.placement.kind === 'listener'))
      throw Error('Restart to switch listener anchoring');
    v.placement = { ...p, ...moveTo(v.placement, p, Math.max(0, this.context.currentTime - this.epoch)) };
    const now = Math.max(this.context.currentTime, this.epoch);
    if (now >= this.epoch + this.manifest.frames / this.manifest.rate) return;
    this.cancelPlacement(v, now);
    this.schedule(now, [v], false, this.timer ? Math.max(now + 0.1, this.scheduledUntil) : Infinity);
  }
  stop() {
    clearInterval(this.timer);
    this.timer = undefined;
    if (this.running) {
      const l = this.context.listener;
      for (const a of [
        l.positionX,
        l.positionY,
        l.positionZ,
        l.forwardX,
        l.forwardY,
        l.forwardZ,
        l.upX,
        l.upY,
        l.upZ,
      ])
        a.cancelScheduledValues(this.context.currentTime);
    }
    for (const v of this.voices) v.src.stop();
    this.voices = [];
    this.running = false;
  }
}
