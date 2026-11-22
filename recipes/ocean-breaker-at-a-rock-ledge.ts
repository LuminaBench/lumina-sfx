import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import milestoneOcean from './_recordings/milestone-ocean.ts';
import atlasThunderRoll from './_recordings/atlas-thunder-roll.ts';
import demoShelteredWind from './_recordings/demo-sheltered-wind.ts';
import milestoneSmallwater from './_recordings/milestone-smallwater.ts';
import milestoneSnapwater from './_recordings/milestone-snapwater.ts';
import pebbleWash from './_recordings/atlas-pebble.ts';

export default {
  id: 'ocean-breaker-at-a-rock-ledge', name: "Ocean Breaker at a Rock Ledge", category: 'Water & Fire',
  tags: ["ocean", "wave", "breaker", "rock", "surf", "splash", "coastal"],
  durationSec: 4.8, loopable: false, mixRole: 'foley', targetRmsDbfs: -16.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...performanceCredits(milestoneOcean, atlasThunderRoll, demoShelteredWind, milestoneSmallwater, milestoneSnapwater, pebbleWash),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.intensity, [
      [milestoneOcean, 0, 2.9, 1.02, 0.9, 6700, 0.05, 0.004, 0.4],
      [atlasThunderRoll, 0, 1.4, 0.34, 0.62, 340, 0.05, 0.45, 0.55],
      [demoShelteredWind, 0.08, 1.35, 0.24, 0.88, 2800, 0.04, 0.4, 0.5],
      [milestoneSmallwater, 0.32, 0.95, 0.38, 0.85, 4200, 0.06, 0.22, 0.35],
      [atlasThunderRoll, 0.78, 1.65, 0.51, 0.52, 290, 0.02, 0.08, 0.85],
      [milestoneSnapwater, 0.82, 1.1, 0.88, 0.92, 9200, 0.0, 0.015, 0.45],
      [milestoneSnapwater, 0.98, 1.05, 0.72, 1.08, 11500, 0.08, 0.03, 0.42],
      [pebbleWash, 1.12, 1.25, 0.74, 0.96, 8400, 0.04, 0.14, 0.52],
      [demoShelteredWind, 1.28, 1.45, 0.42, 1.12, 6800, 0.12, 0.24, 0.65],
      [pebbleWash, 1.85, 1.35, 0.62, 0.88, 6200, 0.1, 0.28, 0.58],
      [milestoneSmallwater, 2.15, 1.1, 0.52, 0.94, 5400, 0.12, 0.22, 0.48],
      [atlasThunderRoll, 2.3, 1.85, 0.42, 0.56, 260, 0.14, 0.35, 1.1],
      [pebbleWash, 2.85, 1.3, 0.42, 0.82, 4200, 0.18, 0.32, 0.68],
      [milestoneSmallwater, 3.35, 1.25, 0.3, 0.8, 3200, 0.15, 0.28, 0.72],
      [demoShelteredWind, 3.5, 1.3, 0.18, 0.82, 2400, 0.2, 0.3, 0.8],
    ]);
  },
} satisfies SoundRecipe;
