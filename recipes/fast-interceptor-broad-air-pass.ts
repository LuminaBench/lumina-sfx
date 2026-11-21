import { mix } from '../engine/dsp.ts';
import { airTransient } from './_shared/air-transients.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-jet-pass.ts';

export default {
  id: "fast-interceptor-broad-air-pass",
  name: "Fast interceptor broad air pass",
  category: "Missiles",
  tags: ["fast", "interceptor", "broad", "air", "pass", "projectile", "flight", "whoosh"],
  loopable: false,
  durationSec: 1.77,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = airTransient(ctx, {
      motion: "flyby", focus: .39, width: .32, whistle: 525,
      weight: .79, cutoff: 5000, reflection: 0,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.77, .41, .55, 6500, .11, .40],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
