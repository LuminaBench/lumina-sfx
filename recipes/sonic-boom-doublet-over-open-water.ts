import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import atlasFirecracker from './_recordings/atlas-firecracker.ts';
import atlasThunderLeft from './_recordings/atlas-thunder-left.ts';
import atlasThunderRoll from './_recordings/atlas-thunder-roll.ts';
import atlasThunderRight from './_recordings/atlas-thunder-right.ts';
import milestoneSnapwater from './_recordings/milestone-snapwater.ts';

export default {
  id: 'sonic-boom-doublet-over-open-water', name: "Sonic Boom Doublet Over Open Water", category: 'Aircraft',
  tags: ["sonic-boom", "doublet", "supersonic", "n-wave", "shockwave", "water", "aircraft"],
  durationSec: 4.6, loopable: false, mixRole: 'impact', targetRmsDbfs: -11.0,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...performanceCredits(atlasFirecracker, atlasThunderLeft, atlasThunderRoll, atlasThunderRight, milestoneSnapwater),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.intensity, [
      [atlasFirecracker, 0, 0.22, 0.86, 1.08, 12800, 0.0, 0.002, 0.12],
      [atlasThunderLeft, 0.008, 0.82, 0.92, 0.86, 3800, 0.0, 0.006, 0.52],
      [atlasThunderRoll, 0.015, 1.45, 0.94, 0.44, 240, 0.0, 0.012, 0.85],
      [atlasFirecracker, 0.17, 0.24, 0.9, 0.96, 11600, 0.03, 0.002, 0.14],
      [atlasThunderRight, 0.178, 0.95, 0.96, 0.8, 3400, 0.0, 0.006, 0.62],
      [atlasThunderRoll, 0.185, 1.85, 0.98, 0.4, 280, 0.04, 0.015, 1.05],
      [milestoneSnapwater, 0.36, 0.88, 0.44, 0.78, 2800, 0.06, 0.06, 0.52],
      [milestoneSnapwater, 0.74, 1.02, 0.3, 0.7, 1900, 0.14, 0.14, 0.58],
      [atlasThunderLeft, 0.95, 1.75, 0.6, 0.54, 620, 0.1, 0.24, 0.95],
      [atlasThunderRight, 1.55, 1.9, 0.52, 0.48, 460, 0.12, 0.32, 1.05],
      [atlasThunderRoll, 2.1, 2.35, 0.56, 0.46, 320, 0.1, 0.42, 1.35],
      [atlasThunderLeft, 2.9, 1.7, 0.28, 0.44, 240, 0.18, 0.38, 1.05],
    ]);
  },
} satisfies SoundRecipe;
