import type { SoundRecipe } from '../engine/types.ts';
import { seatedContact } from './_shared/screen-foley.ts';
import paperboard from './_recordings/isolated-paperboard-seat.ts';

export default {
  id: 'paper-title-card-seat', name: 'Paper title card landing', category: 'Footsteps & UI',
  tags: ['title', 'card', 'land', 'settle', 'restrained', 'paper', 'contact', 'editorial', 'dry'],
  isolation: 'isolated', mixRole: 'interface', perspective: 'close dry contact',
  contains: ['one short paperboard contact'], recording: paperboard.credit,
  loopable: false, durationSec: 0.12, targetRmsDbfs: -32,
  markers: { contact: 0, settle: 0 }, params: { weight: { label: 'Card weight', min: 0, max: 1, default: 0.38 } },
  render(ctx, { seed, params }) {
    return seatedContact(ctx, paperboard, seed, params.weight, 430, 3900, 0.25);
  },
} satisfies SoundRecipe;
