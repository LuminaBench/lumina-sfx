import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import contact0 from './_recordings/seed-packet-rustle.ts';
import contact2 from './_recordings/response-button.ts';

export default {
  id: 'loadout-card-deck-close', name: 'Loadout card deck close', category: 'Sci-Fi & UI',
  tags: ["ui", "feedback", "loadout", "card", "deck", "close", "back", "paper"], loopable: false, durationSec: 0.258,
  mixRole: 'interface', targetRmsDbfs: -24,
  ...sceneCredits(contact0, contact2),
  params: { pressure: { label: 'Contact pressure', min: 0, max: 1, default: 0.56 } },
  render(ctx, { seed, params }) {
    return scene(ctx, seed, params.pressure, [
      ['clip', contact0, 0.0000, 0.066, 0.33, 0, 5800, 0.0004, 0.012],
      ['clip', contact2, 0.0959, 0.126, 0.90, 0, 4400, 0.0004, 0.012],
      ['brush', 'paper', 0.013, 0.135, 0.23, 866, 0.0012],
    ]);
  },
} satisfies SoundRecipe;
