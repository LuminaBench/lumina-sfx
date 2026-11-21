import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import contact0 from './_recordings/milestone-ratchet.ts';
import contact2 from './_recordings/response-metal-pressure.ts';

export default {
  id: 'score-relay-elimination-confirm', name: 'Score relay elimination confirm', category: 'Sci-Fi & UI',
  tags: ["ui", "feedback", "score", "relay", "elimination", "confirm", "iron"], loopable: false, durationSec: 0.18,
  mixRole: 'interface', targetRmsDbfs: -22,
  ...sceneCredits(contact0, contact2),
  params: { pressure: { label: 'Contact pressure', min: 0, max: 1, default: 0.56 } },
  render(ctx, { seed, params }) {
    return scene(ctx, seed, params.pressure, [
      ['clip', contact0, 0.0000, 0.042, 0.45, 0, 11700, 0.0004, 0.011],
      ['clip', contact2, 0.0348, 0.109, 1.00, 0, 9900, 0.0004, 0.012],
      ['contact', 'iron', 0.013, 0.081, 0.35, 1085, 0.0012],
    ]);
  },
} satisfies SoundRecipe;
