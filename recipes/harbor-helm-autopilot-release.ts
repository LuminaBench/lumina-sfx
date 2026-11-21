import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import contact0 from './_recordings/key-turn-in-lock.ts';
import contact2 from './_recordings/motion-chain-link.ts';

export default {
  id: 'harbor-helm-autopilot-release', name: 'Harbor helm autopilot release', category: 'Sci-Fi & UI',
  tags: ["ui", "feedback", "harbor", "helm", "autopilot", "release", "wood"], loopable: false, durationSec: 0.167,
  mixRole: 'interface', targetRmsDbfs: -24,
  ...sceneCredits(contact0, contact2),
  params: { pressure: { label: 'Contact pressure', min: 0, max: 1, default: 0.56 } },
  render(ctx, { seed, params }) {
    return scene(ctx, seed, params.pressure, [
      ['clip', contact2, 0.0000, 0.059, 0.62, 0, 7100, 0.0004, 0.012],
      ['clip', contact0, 0.0784, 0.053, 0.54, 0, 11700, 0.0004, 0.012],
      ['brush', 'wood', 0.013, 0.067, 0.2, 1070, 0.0012],
    ]);
  },
} satisfies SoundRecipe;
