import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/leather-strap-flex.ts';

export default {
  id: "environmental-suit-seal-failure",
  name: "Environmental Suit Seal Failure",
  category: "Sci-Fi & UI",
  tags: ["environmental", "suit", "seal", "failure"],
  loopable: false,
  durationSec: 1.39,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .52, .45, .093, 5900],
      ["contact", "rubber", .071, .29, .57, 368, .005],
      ["brush", "air", .19, 1.10, 1, 2080, .021],
      ["tone", .24, .50, .27, 910, 484, .028, .46],
    ]);
  },
} satisfies SoundRecipe;
