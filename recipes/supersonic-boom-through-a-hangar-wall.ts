import { mix } from '../engine/dsp.ts';
import { airTransient } from './_shared/air-transients.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-clank-close.ts';

export default {
  id: "supersonic-boom-through-a-hangar-wall",
  name: "Supersonic boom through a hangar wall",
  category: "Aircraft",
  tags: ["supersonic", "boom", "hangar", "wall"],
  loopable: false,
  durationSec: 1.96,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = airTransient(ctx, {
      motion: "boom", focus: 0, width: .24, whistle: 0,
      weight: .77, cutoff: 540, reflection: .31,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, .028, .29, .26, .02, 1480, .003, .06],
      ["contact", "iron", .11, .42, .67, 132, .004],
      ["contact", "glass", .24, .33, .32, 278, .004],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
