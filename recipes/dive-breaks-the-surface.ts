import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import milestoneSnapwater from './_recordings/milestone-snapwater.ts';
import atlasBubbles from './_recordings/atlas-bubbles.ts';

export default {
  id: 'dive-breaks-the-surface', name: "Dive breaks the water surface", category: 'Water & Fire',
  tags: ["dive", "breaks", "the", "surface"], contains: ["entry splash", "air escapes underwater"], perspective: 'crossing waterline',
  markers: {"entry": 0, "submerged": 0.25}, loopable: false, durationSec: 1.25,
  mixRole: 'foley', targetRmsDbfs: -22,
  params: { force: { label: 'Gesture force', min: 0, max: 1, default: 0.5 } },
  ...performanceCredits(milestoneSnapwater, atlasBubbles),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.force, [
      [milestoneSnapwater, 0, 0.55, 1, 0.97, 12400],
      [atlasBubbles, 0.18, 1.02, 0.7, 0.83, 4300, 0.15],
    ]);
  },
} satisfies SoundRecipe;
