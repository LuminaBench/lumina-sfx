import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/hatchet-greenwood.ts';

export default {
  id: "chisel-tapping-soft-wood",
  name: "Chisel Tapping Soft Wood",
  category: "Impacts",
  tags: ["chisel", "tapping", "soft", "wood"],
  loopable: false,
  durationSec: 0.78,
  targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .22, .43, .07, 10600],
      ["contact", "wood", 0, .19, .63, 415, .0006],
      ["contact", "wood", .151, .20, .56, 488, .0007],
      ["contact", "wood", .357, .20, .70, 520, .0007],
    ]);
  },
} satisfies SoundRecipe;
