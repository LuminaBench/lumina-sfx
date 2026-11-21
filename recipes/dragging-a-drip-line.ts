import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/jacket-movement-rustle.ts';
import source2 from './_recordings/shovel-dry-earth.ts';

export default {
  id: "dragging-a-drip-line",
  name: "Dragging a Drip Line",
  category: "Farming",
  tags: ["dragging", "drip", "line", "farm", "wakefall"],
  loopable: false,
  durationSec: 0.99,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .61, .47, .07, 4100],
      ['clip', source2, .07, .83, .53, .025, 7200],
      ["brush", "rubber", .11, .68, .35, 410, .052],
      ["contact", "rubber", .57, .14, .20, 395, .003],
    ]);
  },
} satisfies SoundRecipe;
