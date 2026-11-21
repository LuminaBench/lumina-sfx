import { farmFoley } from './_shared/farm-foley.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "plant-pot-tap", name: "Tapping a Terracotta Pot", category: "Farming",
  tags: ["pot", "terracotta", "planter", "garden", "tap"],
  durationSec: .43, loopable: false, targetRmsDbfs: -24,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return farmFoley(ctx, params.force, [
      [0, 'stone', .72, 2450, .035],
      [.005, 'wood', .47, 475, .053],
      [.093, 'metal', .14, 482, .042],
      [.106, 'stone', .32, 2450, .024],
    ]);
  },
} satisfies SoundRecipe;
