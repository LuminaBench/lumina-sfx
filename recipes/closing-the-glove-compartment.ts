import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/wooden-chest-shut.ts';
import source2 from './_recordings/energy-cell-seating.ts';

export default {
  id: "closing-the-glove-compartment",
  name: "Closing the Glove Compartment",
  category: "Vehicles & Engines",
  tags: ["closing", "glove", "compartment", "vehicle"],
  loopable: false,
  durationSec: 0.8,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .68, .64, .02, 4400],
      ['clip', source2, .24, .34, .55, .035, 8200],
      ["contact", "rubber", .33, .25, .35, 225, .005],
    ]);
  },
} satisfies SoundRecipe;
