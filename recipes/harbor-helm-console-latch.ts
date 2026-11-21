import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import contact0 from './_recordings/key-turn-in-lock.ts';
import contact2 from './_recordings/motion-chain-link.ts';

export default {
  id: 'harbor-helm-console-latch', name: 'Harbor helm console latch', category: 'Sci-Fi & UI',
  tags: ["ui", "feedback", "harbor", "helm", "console", "latch", "back", "wood"], loopable: false, durationSec: 0.255,
  mixRole: 'interface', targetRmsDbfs: -24,
  ...sceneCredits(contact0, contact2),
  params: { pressure: { label: 'Contact pressure', min: 0, max: 1, default: 0.56 } },
  render(ctx, { seed, params }) {
    return scene(ctx, seed, params.pressure, [
      ['clip', contact0, 0.0000, 0.066, 0.33, 0, 5800, 0.0004, 0.012],
      ['clip', contact2, 0.0933, 0.126, 0.90, 0, 4400, 0.0004, 0.012],
      ['brush', 'wood', 0.013, 0.135, 0.23, 490, 0.0012],
    ]);
  },
} satisfies SoundRecipe;
