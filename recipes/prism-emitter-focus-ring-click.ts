import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-clank-close.ts';

export default {
  id: "prism-emitter-focus-ring-click",
  name: "Prism emitter focus ring click",
  category: "Weapons",
  tags: ["prism", "emitter", "focus", "ring", "click"],
  loopable: false,
  durationSec: 0.44,
  targetRmsDbfs: -30,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .19, .40, .09, 9700, .002, .048],
      ["contact", "iron", 0, .053, .58, 1310, .00066],
      ["contact", "glass", .072, .12, .31, 1850, .0016],
    ]);
  },
} satisfies SoundRecipe;
