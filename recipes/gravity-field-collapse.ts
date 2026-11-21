import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "gravity-field-collapse",
  name: "Gravity Field Collapse",
  category: "Sci-Fi & UI",
  tags: ["gravity", "field", "collapse"],
  loopable: false,
  durationSec: 1.41,
  targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["brush", "air", 0, .83, .68, 350, .104],
      ["tone", .07, .94, .48, 243, 47, .28, .68],
      ["contact", "soil", .38, .48, .80, 106, .008],
      ["tone", .45, .65, .31, 88, 36, .01, .57],
    ]);
  },
} satisfies SoundRecipe;
