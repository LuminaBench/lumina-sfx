import { makeBuzzProbe, organicMaterial } from './buzz.mjs';
import { activeRms, PEAK_LIMIT_DB, targetRmsDb } from '../engine/render.ts';
import { dbToGain, gainToDb } from '../engine/dsp.ts';

const round = (value) => Number(value.toFixed(4));

export function decodeWav(wav, rate) {
  const bytes = new Uint8Array(wav);
  const view = new DataView(wav);
  const text = (i) => String.fromCharCode(...bytes.subarray(i, i + 4));
  if (wav.byteLength < 44 || text(0) !== 'RIFF' || view.getUint32(4, true) !== wav.byteLength - 8 ||
    text(8) !== 'WAVE' || text(12) !== 'fmt ' || view.getUint32(16, true) !== 16 ||
    view.getUint16(20, true) !== 1 || view.getUint16(22, true) !== 1 ||
    view.getUint32(24, true) !== rate || view.getUint32(28, true) !== rate * 2 ||
    view.getUint16(32, true) !== 2 || view.getUint16(34, true) !== 16 ||
    text(36) !== 'data' || view.getUint32(40, true) !== wav.byteLength - 44 || (wav.byteLength - 44) % 2) {
    throw new Error('Expected a mono 16-bit PCM WAV header with matching sample rate and data size');
  }
  return Float32Array.from({ length: (wav.byteLength - 44) / 2 }, (_, i) => {
    const sample = view.getInt16(44 + i * 2, true);
    return sample / (sample < 0 ? 32768 : 32767);
  });
}

function firstOnset(samples, threshold) {
  for (let i = 0; i < samples.length; i++) {
    if (Math.abs(samples[i]) >= threshold) return i;
  }
  return Infinity;
}

export function checkLoop(samples, rate) {
  const end = samples.length - 1;
  const firstDelta = samples[1] - samples[0];
  const lastDelta = samples[end] - samples[end - 1];
  const wrapDelta = samples[0] - samples[end];
  const length = Math.min(Math.round(rate * 0.012), samples.length >> 2);
  const steps = [];
  const curves = [];
  for (const offset of [0, samples.length - length]) {
    for (let i = offset + 2; i < offset + length; i++) {
      steps.push(Math.abs(samples[i] - samples[i - 1]));
      curves.push(Math.abs(samples[i] - 2 * samples[i - 1] + samples[i - 2]));
    }
  }
  const upper = (values) => values.sort((a, b) => a - b)[Math.floor(values.length * 0.99)];
  const stepLimit = Math.max(dbToGain(-55), upper(steps) * 1.5);
  const curveLimit = Math.max(dbToGain(-52), upper(curves) * 1.75);
  const step = Math.abs(wrapDelta);
  const curvature = Math.max(Math.abs(wrapDelta - lastDelta), Math.abs(firstDelta - wrapDelta));
  return {
    pass: step <= stepLimit && curvature <= curveLimit,
    step: round(step), stepLimit: round(stepLimit),
    curvature: round(curvature), curvatureLimit: round(curveLimit),
  };
}

const FFT_SIZE = 2048;
const HOP = FFT_SIZE / 2;
const hann = Float64Array.from({ length: FFT_SIZE }, (_, i) => 0.5 - 0.5 * Math.cos(2 * Math.PI * i / FFT_SIZE));
const bitReverse = Uint16Array.from({ length: FFT_SIZE }, (_, index) => {
  let reverse = 0;
  for (let step = 1; step < FFT_SIZE; step <<= 1) {
    reverse = (reverse << 1) | (index & 1);
    index >>= 1;
  }
  return reverse;
});
const cos = Float64Array.from({ length: HOP }, (_, i) => Math.cos(-2 * Math.PI * i / FFT_SIZE));
const sin = Float64Array.from({ length: HOP }, (_, i) => Math.sin(-2 * Math.PI * i / FFT_SIZE));

export function spectrum(samples, rate, organic = false) {
  const probe = organic ? makeBuzzProbe(rate, FFT_SIZE) : null;
  const power = probe ? new Float64Array(HOP) : null;
  const re = new Float64Array(FFT_SIZE);
  const im = new Float64Array(FFT_SIZE);
  let total = 0;
  let sub = 0;
  let high = 0;
  for (let start = -HOP; start < samples.length; start += HOP) {
    im.fill(0);
    for (let i = 0; i < FFT_SIZE; i++) re[bitReverse[i]] = (samples[start + i] ?? 0) * hann[i];
    for (let width = 2; width <= FFT_SIZE; width <<= 1) {
      const half = width >> 1;
      for (let left = 0; left < FFT_SIZE; left += width) {
        for (let j = 0; j < half; j++) {
          const a = left + j;
          const b = a + half;
          const k = j * FFT_SIZE / width;
          const real = re[b] * cos[k] - im[b] * sin[k];
          const imaginary = re[b] * sin[k] + im[b] * cos[k];
          re[b] = re[a] - real;
          im[b] = im[a] - imaginary;
          re[a] += real;
          im[a] += imaginary;
        }
      }
    }
    for (let bin = 1; bin < HOP; bin++) {
      const hz = (bin * rate) / FFT_SIZE;
      const energy = re[bin] ** 2 + im[bin] ** 2;
      if (power) power[bin] = energy;
      total += energy;
      if (hz < 120) sub += energy;
      if (hz > 4000) high += energy;
    }
    if (probe) probe.frame(power, start);
  }
  return { buzz: probe?.result(), sub: total ? sub / total : 0, high: total ? high / total : 0 };
}

export function inspect(samples, recipe, rate) {
  let maximum = 0;
  for (const sample of samples) maximum = Math.max(maximum, Math.abs(sample));
  const peakDb = gainToDb(maximum);
  const rmsDb = gainToDb(activeRms(samples, rate));
  const target = targetRmsDb(recipe.loopable, recipe.targetRmsDbfs);
  const onsetMs = firstOnset(samples, Math.max(maximum * 0.02, dbToGain(-60))) / rate * 1000;
  const onsetLimit = 1;
  const bands = spectrum(samples, rate, organicMaterial(recipe));
  const defaults = [
    ...(['explosion', 'thunder'].some((tag) => recipe.tags.includes(tag)) ? [{ band: 'sub', minShare: 0.15 }] : []),
    ...(['ricochet', 'metal'].some((tag) => recipe.tags.includes(tag)) ? [{ band: 'high', minShare: 0.08 }] : []),
  ];
  const expectations = [...new Map([...defaults, ...recipe.spectrum ?? []].map((item) => [item.band, item])).values()];
  const spectralChecks = expectations.map(({ band, minShare }) => ({
    band, minShare, measuredShare: round(bands[band]), pass: bands[band] >= minShare,
  }));
  return {
    stationaryBuzz: bands.buzz ?? null,
    peak: { pass: peakDb <= PEAK_LIMIT_DB, dbfs: round(peakDb), maxDbfs: PEAK_LIMIT_DB },
    loudness: { pass: Math.abs(rmsDb - target) <= 1.25, activeRmsDbfs: round(rmsDb), targetDbfs: target, toleranceDb: 1.25 },
    onset: recipe.loopable ? null : { pass: onsetMs < onsetLimit, ms: Number.isFinite(onsetMs) ? round(onsetMs) : null, maxMsExclusive: onsetLimit },
    loopBoundary: recipe.loopable ? checkLoop(samples, rate) : null,
    spectrum: {
      pass: spectralChecks.every((item) => item.pass),
      subBelow120HzShare: round(bands.sub), highAbove4kHzShare: round(bands.high), expectations: spectralChecks,
    },
  };
}

export function inspectBalanced(samples, recipe, rate, settings, measured) {
  const onsetMs = firstOnset(samples, Math.max(dbToGain(measured.peakDbfs) * 0.02, dbToGain(-60 + settings.gainDb))) / rate * 1000;
  const loop = recipe.loopable ? checkLoop(samples, rate) : null;
  const deltaDb = measured.activeDb - settings.activeDb;
  const pass = measured.peakDbfs <= settings.ceilingDbfs + 0.01 &&
    Math.abs(deltaDb - settings.gainDb) < 0.10 &&
    (recipe.loopable ? loop.pass : onsetMs < (1));
  return {
    pass,
    role: settings.role,
    peakDbfs: round(measured.peakDbfs),
    ceilingDbfs: settings.ceilingDbfs,
    activeDb: round(measured.activeDb),
    gainDb: round(settings.gainDb),
    onsetMs: recipe.loopable || !Number.isFinite(onsetMs) ? null : round(onsetMs),
    loop,
  };
}
