import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-clank-close.ts';

export default {
  id: "modular-prop-empty-cradle-latch",
  name: "Modular prop empty cradle latch",
  category: "Weapons",
  tags: ["modular", "prop", "empty", "cradle", "latch"],
  loopable: false,
  durationSec: 0.47,
  targetRmsDbfs: -29,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .28, .67, .018, 8700, .002, .05],
      ["contact", "iron", 0, .057, .38, 960, .0008],
      ["contact", "rubber", .113, .106, .55, 420, .0021],
    ]);
  },
} satisfies SoundRecipe;
