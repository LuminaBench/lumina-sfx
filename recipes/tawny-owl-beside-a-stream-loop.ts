import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import fieldBrookBed from './_recordings/field-brook-bed.ts';
import naturalOwl from './_recordings/natural-owl.ts';
import naturalOwlAnswer from './_recordings/natural-owl-answer.ts';

export default {
  id: 'tawny-owl-beside-a-stream-loop', name: "Tawny owl beside a stream loop", category: 'Animals',
  tags: ["owl", "creek", "night", "woodland", "loop"],
  loopable: true, durationSec: 4.5, mixRole: 'ambience', targetRmsDbfs: -29,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(fieldBrookBed, naturalOwl, naturalOwlAnswer),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [fieldBrookBed, 0, 5.0, 0.3, 1, 5700, 3.0, 0.001, 0.015],
      [naturalOwl, 0.36, 0.96, 0.75, 1, 10500, 0, 0.001, 0.022],
      [naturalOwlAnswer, 2.42, 1.54, 0.65, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
