import { farmBed } from './_shared/farm-foley.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "trickle-into-irrigation-loop", name: "Irrigation Channel Trickle", category: "Water & Fire",
  tags: ["irrigation", "channel", "water", "trickle", "stream", "loop"],
  durationSec: 10.6, loopable: true, targetRmsDbfs: -31,
  params: { activity: { label: 'Activity', min: 0, max: 1, default: 0.42 } },
  render(ctx, { params }) {
    return farmBed(ctx, params.activity, { flow: 520, hiss: 2770, pace: .31, pulse: 3.7, drops: 32, ring: 445 });
  },
} satisfies SoundRecipe;
