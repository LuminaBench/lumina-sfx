import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-tram-door.ts';
import source2 from './_recordings/field-heavy-hatch.ts';

export default {
  id: "heritage-rail-coach-door-shuts-into-seal",
  name: "Heritage Rail Coach Door Shuts into Seal",
  category: "Vehicles & Engines",
  tags: ["heritage", "rail", "coach", "door", "shuts", "seal", "vehicle"],
  loopable: false,
  durationSec: 1.42,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.98, 0.62, 0.731, 2187, 0.007, 0.08],
      ['clip', source2, 0.72, 0.61, 0.59, 0.44, 3780, 0.007, 0.08],
      ["contact", "rubber", 0.92, 0.31, 0.47, 148.96, 0.002],
    ]);
  },
} satisfies SoundRecipe;
