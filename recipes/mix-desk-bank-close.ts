import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import contact0 from './_recordings/response-microclick.ts';
import contact2 from './_recordings/response-rocker.ts';

export default {
  id: 'mix-desk-bank-close', name: 'Mix desk bank close', category: 'Sci-Fi & UI',
  tags: ["ui", "feedback", "mix", "desk", "bank", "close", "back", "rubber"], loopable: false, durationSec: 0.24,
  mixRole: 'interface', targetRmsDbfs: -24,
  ...sceneCredits(contact0, contact2),
  params: { pressure: { label: 'Contact pressure', min: 0, max: 1, default: 0.56 } },
  render(ctx, { seed, params }) {
    return scene(ctx, seed, params.pressure, [
      ['clip', contact0, 0.0000, 0.066, 0.33, 0, 5800, 0.0004, 0.012],
      ['clip', contact2, 0.0783, 0.126, 0.90, 0, 4400, 0.0004, 0.012],
      ['brush', 'rubber', 0.013, 0.135, 0.23, 589, 0.0012],
    ]);
  },
} satisfies SoundRecipe;
