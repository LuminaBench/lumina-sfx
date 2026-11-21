import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import fieldFarmAir from './_recordings/field-farm-air.ts';
import fieldLambCall from './_recordings/field-lamb-call.ts';
import sheepBleat from './_recordings/sheep-bleat.ts';
import sheepBellJingle from './_recordings/sheep-bell-jingle.ts';

export default {
  id: 'lambs-between-two-pasture-fences-loop', name: "Lambs between two pasture fences loop", category: 'Animals',
  tags: ["sheep", "lamb", "spring", "pasture", "loop"],
  loopable: true, durationSec: 4.5, mixRole: 'ambience', targetRmsDbfs: -28,
  params: { presence: { label: 'Presence', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(fieldFarmAir, fieldLambCall, sheepBleat, sheepBellJingle),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.presence, [
      [fieldFarmAir, 0, 5.0, 0.19, 1, 7100, 3.0, 0.001, 0.015],
      [fieldLambCall, 0.31, 0.94, 0.78, 1, 10500, 0, 0.001, 0.022],
      [sheepBleat, 1.8, 1.15, 0.39, 1, 10500, 0, 0.001, 0.022],
      [sheepBellJingle, 3.25, 0.72, 0.29, 1, 10500, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
