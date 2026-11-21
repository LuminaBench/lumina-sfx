import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-jar-turn.ts';
import source2 from './_recordings/physical-light-switch.ts';

export default {
  id: "lens-hood-bayonet-click",
  name: "Lens Hood Bayonet Click",
  category: "Props & Interactions",
  tags: ["lens", "hood", "bayonet", "click"],
  loopable: false,
  durationSec: 0.62,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .43, .52, .09, 6500],
      ['clip', source2, .266, .16, .59, 0, 10100],
      ["contact", "rubber", .29, .24, .41, 574, .003],
    ]);
  },
} satisfies SoundRecipe;
