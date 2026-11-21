import { farmBed } from './_shared/farm-foley.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "irrigation-mister-loop", name: "Greenhouse Mist Sprayer", category: "Water & Fire",
  tags: ["mist", "sprayer", "greenhouse", "irrigation", "water", "loop"],
  durationSec: 9.6, loopable: true, targetRmsDbfs: -31,
  params: { activity: { label: 'Activity', min: 0, max: 1, default: 0.42 } },
  render(ctx, { params }) {
    return farmBed(ctx, params.activity, { flow: 1100, hiss: 5920, pace: .26, pulse: 8.4, drops: 18, ring: 1090 });
  },
} satisfies SoundRecipe;
