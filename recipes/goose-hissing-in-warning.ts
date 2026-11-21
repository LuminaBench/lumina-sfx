import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-goose-hiss.ts';

export default {
  id: "goose-hissing-in-warning",
  name: "Goose Hissing in Warning",
  category: "Animals",
  tags: ["goose", "hissing", "warning", "livestock"],
  loopable: false,
  durationSec: 1.16,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .83, .96, .008, 11800],
      ['clip', source, .09, .59, .12, .09, 3400],
    ]);
  },
} satisfies SoundRecipe;
