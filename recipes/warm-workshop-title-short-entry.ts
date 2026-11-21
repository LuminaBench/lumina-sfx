import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-jar-contact.ts';

export default {
  id: "warm-workshop-title-short-entry",
  name: "Warm Workshop Title Short Entry",
  category: "Sci-Fi & UI",
  tags: ["warm", "workshop", "title", "short", "entry"],
  loopable: false,
  durationSec: 0.72,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.37, 0.26, 0.028, 5280, 0.007, 0.08],
      ["brush", "wood", 0, 0.43, 0.33, 1760, 0.06],
      ["contact", "wood", 0.164, 0.2, 0.48, 349, 0.002],
      ["tone", 0.1476, 0.36, 0.5, 282.69, 415.31, 0.021, 0.28],
    ]);
  },
} satisfies SoundRecipe;
