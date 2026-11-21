import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import contact0 from './_recordings/milestone-ratchet.ts';
import contact2 from './_recordings/response-metal-pressure.ts';

export default {
  id: 'score-relay-round-end', name: 'Score relay round end', category: 'Sci-Fi & UI',
  tags: ["ui", "feedback", "score", "relay", "round", "end", "back", "iron"], loopable: false, durationSec: 0.245,
  mixRole: 'interface', targetRmsDbfs: -24,
  ...sceneCredits(contact0, contact2),
  params: { pressure: { label: 'Contact pressure', min: 0, max: 1, default: 0.56 } },
  render(ctx, { seed, params }) {
    return scene(ctx, seed, params.pressure, [
      ['clip', contact0, 0.0000, 0.066, 0.33, 0, 5800, 0.0004, 0.012],
      ['clip', contact2, 0.0827, 0.126, 0.90, 0, 4400, 0.0004, 0.012],
      ['brush', 'iron', 0.013, 0.135, 0.23, 1150, 0.0012],
    ]);
  },
} satisfies SoundRecipe;
