import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import naturalGrowl from './_recordings/natural-growl.ts';
import dryBranchSnap from './_recordings/dry-branch-snap.ts';
import wetCropBrush from './_recordings/wet-crop-brush.ts';
import responseMicroclick from './_recordings/response-microclick.ts';

export default {
  id: 'infected-jaw-snaps-shut', name: "Infected jaw snaps shut", category: 'Zombies & Combat',
  tags: ["zombie", "bite", "jaw", "bone", "teeth"],
  loopable: false, durationSec: 0.55, mixRole: 'voice', targetRmsDbfs: -21,
  params: { force: { label: 'Force', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(naturalGrowl, dryBranchSnap, wetCropBrush, responseMicroclick),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [naturalGrowl, 0.0, 0.48, 0.75, 1, 10500, 0, 0.001, 0.022],
      [dryBranchSnap, 0.29, 0.12, 0.64, 1, 10500, 0, 0.001, 0.022],
      [wetCropBrush, 0.31, 0.19, 0.38, 1, 10500, 0, 0.001, 0.022],
      [responseMicroclick, 0.338, 0.07, 0.25, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
