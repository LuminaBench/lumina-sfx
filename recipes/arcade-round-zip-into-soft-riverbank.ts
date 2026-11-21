import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-snapwater.ts';

export default {
  id: "arcade-round-zip-into-soft-riverbank",
  name: "Arcade round zip into soft riverbank",
  category: "Weapons",
  tags: ["arcade", "round", "zip", "soft", "riverbank"],
  loopable: false,
  durationSec: 0.7,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "impact",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "soil", 0, .09, .85, 340, .0009],
      ["contact", "water", 0, .09, .52, 321, .0019],
      ["grains", "soil", .019, .55, .53, 680, 13],
      ['clip', source, .012, .47, .22, .041, 4200, .004, .10],
    ]);
  },
} satisfies SoundRecipe;
