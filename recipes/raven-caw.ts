import type { SoundRecipe } from '../engine/types.ts';
import { calls } from './_shared/animals.ts';

export default {
  id: "raven-caw", name: "Raven Caw", category: 'Animals',
  tags: ["bird","raven","crow","caw"], loopable: false, durationSec: 0.87,
  params: { rasp: { label: "Rasp", min: 0, max: 1, default: 0.72 } },
  targetRmsDbfs: -20,
  render(ctx, { params }) {
    return calls(ctx, [[0, 390, 612, 208, 0.24, 1, 0.73], [0.343, 354, 542, 206, 0.187, 0.75, 0.72]], { formants: [790, 1530, 2870], grit: 0.65 + params.rasp * 0.33, air: 0.54, wobble: 0.47 });
  },
} satisfies SoundRecipe;
