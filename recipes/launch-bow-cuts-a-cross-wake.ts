import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import atlasPebble from './_recordings/atlas-pebble.ts';
import motionJetWaterApproach from './_recordings/motion-jet-water-approach.ts';
import wateringGardenSoak from './_recordings/watering-garden-soak.ts';
import woodPlatformLanding from './_recordings/wood-platform-landing.ts';
import milestoneSnapwater from './_recordings/milestone-snapwater.ts';
import motionJetWaterRetreat from './_recordings/motion-jet-water-retreat.ts';

export default {
  id: 'launch-bow-cuts-a-cross-wake', name: "Launch Bow Cuts a Cross-Wake", category: 'Water & Fire',
  tags: ["boat", "launch", "bow", "wake", "hull", "spray", "maritime"],
  durationSec: 4.2, loopable: false, mixRole: 'foley', targetRmsDbfs: -15.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...performanceCredits(atlasPebble, motionJetWaterApproach, wateringGardenSoak, woodPlatformLanding, milestoneSnapwater, motionJetWaterRetreat),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.intensity, [
      [atlasPebble, 0, 2.5, 0.36, 0.9, 6700, 0.05, 0.004, 0.4],
      [motionJetWaterApproach, 0, 1.3, 0.52, 0.92, 5800, 0.04, 0.25, 0.45],
      [wateringGardenSoak, 0.38, 1.05, 0.36, 1.04, 7200, 0.08, 0.22, 0.38],
      [motionJetWaterApproach, 0.72, 1.2, 0.68, 1.02, 7400, 0.1, 0.18, 0.45],
      [woodPlatformLanding, 0.96, 0.75, 0.74, 0.58, 520, 0.0, 0.012, 0.48],
      [milestoneSnapwater, 0.98, 1.05, 0.88, 1.05, 10800, 0.0, 0.015, 0.42],
      [wateringGardenSoak, 1.18, 1.25, 0.76, 1.08, 9600, 0.04, 0.1, 0.48],
      [woodPlatformLanding, 1.58, 0.68, 0.52, 0.64, 480, 0.04, 0.015, 0.42],
      [milestoneSnapwater, 1.62, 0.98, 0.66, 0.96, 8600, 0.1, 0.02, 0.44],
      [wateringGardenSoak, 1.95, 1.25, 0.58, 0.94, 7000, 0.12, 0.24, 0.52],
      [motionJetWaterRetreat, 2.15, 1.35, 0.62, 0.92, 6000, 0.05, 0.28, 0.55],
      [motionJetWaterRetreat, 2.9, 1.3, 0.4, 0.84, 4200, 0.14, 0.3, 0.72],
    ]);
  },
} satisfies SoundRecipe;
