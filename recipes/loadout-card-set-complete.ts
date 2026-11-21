import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import contact0 from './_recordings/seed-packet-rustle.ts';
import contact1 from './_recordings/book-page-turn.ts';
import contact2 from './_recordings/response-button.ts';

export default {
  id: 'loadout-card-set-complete', name: 'Loadout card set complete', category: 'Sci-Fi & UI',
  tags: ["ui", "feedback", "loadout", "card", "set", "complete", "reward", "paper"], loopable: false, durationSec: 0.271,
  mixRole: 'interface', targetRmsDbfs: -22,
  ...sceneCredits(contact0, contact1, contact2),
  params: { pressure: { label: 'Contact pressure', min: 0, max: 1, default: 0.56 } },
  render(ctx, { seed, params }) {
    return scene(ctx, seed, params.pressure, [
      ['clip', contact1, 0.0000, 0.079, 0.60, 0, 6800, 0.0004, 0.012],
      ['clip', contact2, 0.0589, 0.136, 0.96, 0, 9300, 0.0004, 0.012],
      ['clip', contact0, 0.1831, 0.052, 0.22, 0, 5700, 0.0004, 0.012],
      ['contact', 'paper', 0.013, 0.100, 0.39, 1074, 0.0012],
    ]);
  },
} satisfies SoundRecipe;
