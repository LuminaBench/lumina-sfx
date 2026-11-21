import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "spent-brass-prop-drops-into-grass",
  name: "Spent brass prop drops into grass",
  category: "Weapons",
  tags: ["spent", "brass", "prop", "drops", "grass"],
  loopable: false,
  durationSec: 0.46,
  targetRmsDbfs: -33,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ["contact", "iron", 0, .045, .38, 1110, .00065],
      ["contact", "plant", .009, .084, .57, 380, .0017],
      ["brush", "plant", .04, .39, .46, 570, .008],
      ["contact", "soil", .22, .093, .21, 282, .0019],
    ]);
  },
} satisfies SoundRecipe;
