import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-jar-pop.ts';

export default {
  id: "jar-cooling-seal-pop",
  name: "Jar Cooling Seal Pop",
  category: "Props & Interactions",
  tags: ["jar", "cooling", "seal", "pop"],
  loopable: false,
  durationSec: 0.4,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .34, .9, .02, 12300],
      ["contact", "glass", .062, .18, .17, 1130, .001],
    ]);
  },
} satisfies SoundRecipe;
