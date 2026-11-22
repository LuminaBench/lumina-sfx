import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import atlasBubbles from './_recordings/atlas-bubbles.ts';
import shallowWaterFootstep from './_recordings/shallow-water-footstep.ts';
import milestoneSmallwater from './_recordings/milestone-smallwater.ts';

export default {
  id: 'swimmer-breaks-into-air', name: "Swimmer breaks back into open air", category: 'Water & Fire',
  tags: ["swimmer", "breaks", "into", "air"], contains: ["last submerged bubbles", "surface breaks", "water drains"], perspective: 'crossing waterline',
  markers: {"surface": 0.2, "drain": 0.52}, loopable: false, durationSec: 1.04,
  mixRole: 'foley', targetRmsDbfs: -23,
  params: { force: { label: 'Gesture force', min: 0, max: 1, default: 0.5 } },
  ...performanceCredits(atlasBubbles, shallowWaterFootstep, milestoneSmallwater),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [atlasBubbles, 0, 0.25, 0.65, 0.99, 3300, 0.26],
      [shallowWaterFootstep, 0.2, 0.36, 0.72, 1.11, 12900],
      [milestoneSmallwater, 0.43, 0.59, 0.37, 1.08, 9400, 0.58],
    ]);
  },
} satisfies SoundRecipe;
