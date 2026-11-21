import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/loose-gravel-landing.ts';
import source2 from './_recordings/chain-rattle-short.ts';
import source3 from './_recordings/mixed-rubble-footstep.ts';

export default {
  id: "unloaded-trailer-rattle-on-stone",
  name: "Unloaded Trailer Rattle on Stone",
  category: "Vehicles & Engines",
  tags: ["unloaded", "trailer", "rattle", "stone", "vehicle"],
  loopable: false,
  durationSec: 1.71,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .51, .66, .024, 7400],
      ['clip', source2, .10, .86, .61, .012, 6700],
      ['clip', source3, .76, .46, .38, .05, 5800],
      ["contact", "iron", .88, .45, .21, 340, .0019],
    ]);
  },
} satisfies SoundRecipe;
