import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/jacket-movement-rustle.ts';
import source2 from './_recordings/field-wings.ts';
import source3 from './_recordings/water-drops-from-spout.ts';

export default {
  id: "shake-rain-from-a-work-coat",
  name: "Shake Rain from a Work Coat",
  category: "Footsteps & UI",
  tags: ["shake", "rain", "work", "coat"],
  loopable: false,
  durationSec: 1.03,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .75, .77, .012, 8800],
      ['clip', source2, .098, .62, .27, .089, 6100],
      ['clip', source3, .193, .76, .40, .045, 10000],
    ]);
  },
} satisfies SoundRecipe;
