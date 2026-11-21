import { farmBed } from './_shared/farm-foley.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "pasture-breeze-stalks-loop", name: "Pasture Breeze in Tall Stalks", category: "Weather & Ambience",
  tags: ["pasture", "breeze", "wheat", "grass", "wind", "loop"],
  durationSec: 11.4, loopable: true, targetRmsDbfs: -31,
  params: { activity: { label: 'Activity', min: 0, max: 1, default: 0.42 } },
  render(ctx, { params }) {
    return farmBed(ctx, params.activity, { flow: 610, hiss: 2190, pace: .19, pulse: .73, drops: 1.6, ring: 110 });
  },
} satisfies SoundRecipe;
