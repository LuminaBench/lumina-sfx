import type { SoundRecipe } from '../engine/types.ts';
import { waterCrossing } from './_shared/water-crossing.ts';

export default {
  id: 'dive-breaks-the-surface', name: "Dive breaks the water surface", category: 'Water & Fire',
  tags: ["dive", "breaks", "the", "surface"], contains: ["entry splash", "air escapes underwater"], perspective: 'crossing waterline',
  markers: {"entry": 0, "submerged": 0.25}, loopable: false, durationSec: 1.25,
  mixRole: 'foley', targetRmsDbfs: -22,
  params: { force: { label: 'Gesture force', min: 0, max: 1, default: 0.5 } },
  isolation: 'isolated',
  render(ctx, { params }) {
    return waterCrossing(ctx, params.force, true);
  },
} satisfies SoundRecipe;
