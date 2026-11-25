import type { SoundRecipe } from '../engine/types.ts';
import { biquad } from '../engine/dsp.ts';
import { renderRecording } from '../engine/recording.ts';
import core from './_recordings/isolated-turbine-core.ts';
import { propulsion } from './_shared/propulsion.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import idle from './_recordings/isolated-demo-turbine-idle.ts';
import loaded from './_recordings/isolated-demo-fighter-rise.ts';

export default {
  isolation: 'isolated',
  components: ['jet-engine'],
  id: 'interceptor-turbofan-canopy-interior-cruise-loop',
  name: 'Interceptor turbofan canopy interior cruise loop',
  category: 'Aircraft',
  tags: [
    'aircraft',
    'jet',
    'engine',
    'cabin',
    'interceptor',
    'turbofan',
    'canopy',
    'interior',
    'cruise',
    'loop',
  ],
  loopable: true,
  durationSec: 4.19,
  targetRmsDbfs: -25,
  mixRole: 'vehicle',
  params: {
    rpm: { label: 'Normalized shaft speed', min: 0, max: 1, default: 0.5 },
    intensity: { label: 'Power demand', min: 0, max: 1, default: 0.55 },
  },
  ...sceneCredits(idle, loaded),
  render(ctx, { seed, params }) {
    const wash = propulsion(
      ctx,
      seed,
      params.intensity,
      params.rpm,
      'cabin',
      {
        kind: 'jet',
        pulseHz: [180, 760],
        timbre: 0.91,
        idleWindow: [0.23, 0.93],
        powerWindow: [0.22, 0.91],
      },
      idle,
      loaded,
    );
    // Keep the brief, steady engine performance. An overlapping wrap avoids a
    // repeated attack while the independently varying broadband rumble continues.
    const rate = ctx.sampleRate;
    const speed = 0.86 + 0.25 * params.rpm;
    const length = Math.floor((rate * 1.52) / speed);
    const corePcm = renderRecording({ ...ctx, frames: length }, core, {
      speed,
      cutoffHz: 1700 + 1400 * params.intensity,
    });
    // A close takeoff gets louder across the microphone. For held cruise, remove
    // that pass-by contour once, before repeating the steady portion.
    const power = new Float64Array(length + 1);
    for (let i = 0; i < length; i++) power[i + 1] = power[i] + corePcm[i] ** 2;
    const radius = Math.round(0.072 * rate),
      rms = Math.sqrt(power[length] / length);
    for (let i = 0; i < length; i++) {
      const lo = Math.max(0, i - radius),
        hi = Math.min(length, i + radius + 1);
      const local = Math.sqrt((power[hi] - power[lo]) / (hi - lo));
      corePcm[i] *= Math.min(2, Math.max(0.24, (rms / Math.max(0.012, local)) ** 0.82));
    }
    const overlap = Math.floor(rate * 0.19),
      period = length - overlap;
    const structure = biquad('lowpass', 560 + 220 * params.rpm, 0.65, rate);
    const phase = Math.floor(ctx.random() * period);
    return wash.map((bed, i) => {
      const j = (i + phase) % period;
      const w = Math.min(1, j / overlap);
      const blend = w * w * (3 - 2 * w);
      const engine = j < overlap ? corePcm[j] * blend + corePcm[period + j] * (1 - blend) : corePcm[j];
      return 0.46 * bed + 0.77 * engine + 0.35 * structure(engine);
    });
  },
} satisfies SoundRecipe;
