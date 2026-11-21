import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import contact0 from './_recordings/seed-packet-rustle.ts';
import contact1 from './_recordings/book-page-turn.ts';
import contact2 from './_recordings/response-button.ts';

export default {
  id: 'loadout-card-fan-deck', name: 'Loadout card fan deck', category: 'Sci-Fi & UI',
  tags: ["ui", "feedback", "loadout", "card", "fan", "deck", "browse", "paper"], loopable: false, durationSec: 0.329,
  mixRole: 'interface', targetRmsDbfs: -25,
  ...sceneCredits(contact0, contact1, contact2),
  params: { pressure: { label: 'Contact pressure', min: 0, max: 1, default: 0.56 } },
  render(ctx, { seed, params }) {
    return scene(ctx, seed, params.pressure, [
      ['clip', contact0, 0.0000, 0.043, 0.40, 0, 8900, 0.0004, 0.011],
      ['clip', contact1, 0.0709, 0.051, 0.53, 0, 7800, 0.0004, 0.012],
      ['clip', contact0, 0.1264, 0.036, 0.50, 0, 9400, 0.0004, 0.009],
      ['clip', contact1, 0.1646, 0.047, 0.64, 0, 9000, 0.0004, 0.012],
      ['clip', contact2, 0.2180, 0.075, 0.65, 0, 6700, 0.0004, 0.012],
      ['brush', 'paper', 0.013, 0.180, 0.11, 1598, 0.0012],
    ]);
  },
} satisfies SoundRecipe;
