import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/slatted-crate-settle.ts';
import source2 from './_recordings/wooden-chest-shut.ts';

export default {
  id: "loose-plank-lowered-onto-beam",
  name: "Loose Plank Lowered onto Beam",
  category: "Impacts",
  tags: ["loose", "plank", "lowered", "beam"],
  loopable: false,
  durationSec: 0.77,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .57, .68, 0, 7500],
      ["contact", "wood", .12, .33, .60, 267, .002],
      ['clip', source2, .26, .40, .41, .09, 5500],
    ]);
  },
} satisfies SoundRecipe;
