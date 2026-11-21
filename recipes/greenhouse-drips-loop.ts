import { farmBed } from './_shared/farm-foley.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "greenhouse-drips-loop", name: "Dripping Inside a Greenhouse", category: "Weather & Ambience",
  tags: ["greenhouse", "water", "glass", "drip", "garden", "loop"],
  durationSec: 12.4, loopable: true, targetRmsDbfs: -32,
  params: { activity: { label: 'Activity', min: 0, max: 1, default: 0.42 } },
  render(ctx, { params }) {
    return farmBed(ctx, params.activity, { flow: 290, hiss: 1330, pace: .22, pulse: .64, drops: 5.1, ring: 690 });
  },
} satisfies SoundRecipe;
