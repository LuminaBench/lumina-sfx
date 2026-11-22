import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import hatchetGreenwood from './_recordings/hatchet-greenwood.ts';
import atlasThunderRoll from './_recordings/atlas-thunder-roll.ts';
import woodenCrateSmash from './_recordings/wooden-crate-smash.ts';
import woodPlatformLanding from './_recordings/wood-platform-landing.ts';
import looseGravelLanding from './_recordings/loose-gravel-landing.ts';

export default {
  id: 'blast-through-a-timber-partition', name: "Blast Through a Timber Partition", category: 'Impacts',
  tags: ["blast", "timber", "wood", "breach", "splinters", "debris", "cinematic", "explosion"],
  durationSec: 4.0, loopable: false, mixRole: 'impact', targetRmsDbfs: -10.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...performanceCredits(hatchetGreenwood, atlasThunderRoll, woodenCrateSmash, woodPlatformLanding, looseGravelLanding),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.intensity, [
      [hatchetGreenwood, 0, 0.42, 0.88, 1.08, 9800, 0.0, 0.003, 0.22],
      [atlasThunderRoll, 0.012, 1.85, 0.96, 0.44, 240, 0.0, 0.012, 1.05],
      [woodenCrateSmash, 0.025, 0.98, 0.96, 0.96, 10400, 0.0, 0.005, 0.44],
      [woodenCrateSmash, 0.16, 0.92, 0.84, 1.12, 11800, 0.06, 0.01, 0.42],
      [hatchetGreenwood, 0.34, 0.48, 0.7, 0.92, 7600, 0.033, 0.008, 0.26],
      [woodPlatformLanding, 0.58, 0.85, 0.76, 0.72, 1600, 0.02, 0.015, 0.48],
      [looseGravelLanding, 0.74, 1.05, 0.62, 1.14, 8600, 0.04, 0.08, 0.48],
      [atlasThunderRoll, 0.95, 1.95, 0.56, 0.48, 300, 0.12, 0.28, 1.1],
      [woodenCrateSmash, 1.12, 0.84, 0.48, 0.88, 6200, 0.14, 0.06, 0.46],
      [woodPlatformLanding, 1.54, 0.78, 0.5, 0.86, 2800, 0.08, 0.02, 0.46],
      [looseGravelLanding, 1.75, 1.15, 0.44, 1.04, 6800, 0.12, 0.18, 0.56],
      [woodPlatformLanding, 2.38, 0.76, 0.28, 0.96, 3200, 0.114, 0.03, 0.48],
      [looseGravelLanding, 2.75, 1.15, 0.24, 0.96, 5200, 0.18, 0.24, 0.68],
    ]);
  },
} satisfies SoundRecipe;
