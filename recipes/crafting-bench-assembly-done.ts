import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import contact0 from './_recordings/wooden-chest-latch-release.ts';
import contact1 from './_recordings/leather-strap-flex.ts';
import contact2 from './_recordings/milestone-tool.ts';

export default {
  id: 'crafting-bench-assembly-done', name: 'Crafting bench assembly done', category: 'Sci-Fi & UI',
  tags: ["ui", "feedback", "crafting", "bench", "assembly", "done", "reward", "wood"], loopable: false, durationSec: 0.236,
  mixRole: 'interface', targetRmsDbfs: -22,
  ...sceneCredits(contact0, contact1, contact2),
  params: { pressure: { label: 'Contact pressure', min: 0, max: 1, default: 0.56 } },
  render(ctx, { seed, params }) {
    return scene(ctx, seed, params.pressure, [
      ['clip', contact1, 0.0000, 0.079, 0.60, 0, 6800, 0.0004, 0.012],
      ['clip', contact2, 0.0475, 0.136, 0.96, 0, 9300, 0.0004, 0.012],
      ['clip', contact0, 0.1478, 0.052, 0.22, 0, 5700, 0.0004, 0.012],
      ['contact', 'wood', 0.013, 0.100, 0.39, 889, 0.0012],
    ]);
  },
} satisfies SoundRecipe;
