import { withImpactFoley } from './_shared/recorded-impact.ts';
import foley0 from './_recordings/atlas-firecracker.ts';
import foley1 from './_recordings/atlas-stone.ts';
import { renderRecording } from '../engine/recording.ts';
import recording from './_recordings/response-street-pressure.ts';
import { layer, mix, punch } from '../engine/dsp.ts';
import type { SoundRecipe } from '../engine/types.ts';
import { pressure, rumble, scatter } from './_shared/acoustics.ts';

const original = {
  id: 'grenade-explosion', name: 'Grenade Explosion', category: 'Weapons',
  tags: ['grenade', 'explosion', 'debris', 'sub-bass'], loopable: false, durationSec: 2.65,
  recording: recording.credit,
  params: { debris: { label: 'Debris', min: 0, max: 1, default: 0.69 } },
  spectrum: [{ band: 'sub', minShare: 0.24 }],
  render(ctx, { params, seed }) {
    const sound = new Float32Array(ctx.frames);
    const front = pressure({ ...ctx, frames: Math.round(0.105 * ctx.sampleRate) },
      { span: 0.0042, low: 216, high: 2100, edge: 1.44, weight: 1.75 });
    mix(sound, front);
    scatter(ctx, sound, front, 0.73, 1.63, 3600);
    layer(ctx, sound, 0.008, 1.05, (air) => rumble(air, 104, 0.022, 0.17, 1.02), 1.86);
    layer(ctx, sound, 0.084, 1.45, (air) => rumble(air, 96, 0.054, 0.31, 0.74), 1.12);
    layer(ctx, sound, 0.278, 1.69, (air) => rumble(air, 78, 0.12, 0.39, 0.67), 0.98);
    layer(ctx, sound, 0.64, 1.85, (air) => rumble(air, 68, 0.18, 0.46, 0.47), 0.72);
    for (let i = 0; i < 19; i++) {
      const at = 0.037 + ((i + ctx.random()) / 19) ** 1.75 * 1.32;
      const bright = 730 + ctx.random() ** 1.4 * 5100;
      const weight = (0.45 + ctx.random() * 0.65) * Math.exp(-at * 3.3) * params.debris;
      layer(ctx, sound, at, 0.085, (chip) => punch(chip, [
        { color: 'pink', kind: 'bandpass', hz: bright * 0.42, q: 1.02, gain: 0.85, attack: 0.0018, decay: 0.013 },
        { color: 'white', kind: 'bandpass', hz: bright, q: 1.67, gain: 0.88, attack: 0.00028, decay: 0.008 },
      ]), weight);
    }
    const take = renderRecording(ctx, recording, {
      seed, speed: 0.88 + ctx.random() * 0.08, cutoffHz: 7300 + params.debris * 1600,
    });
    mix(sound, take, 1.5);
    return sound;
  },
} satisfies SoundRecipe;

export default withImpactFoley(original, [
  { clip: foley0, at: 0, span: 0.24, gain: 0.37, cutoff: 10100, speed: 0.77 },
  { clip: foley1, at: 0.175, span: 0.65, gain: params => 0.26 * params.debris, cutoff: 7100, speed: 0.86 },
]);
