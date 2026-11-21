import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import contact0 from './_recordings/wooden-chest-latch-release.ts';
import contact2 from './_recordings/milestone-tool.ts';

export default {
  id: 'crafting-bench-part-seat', name: 'Crafting bench part seat', category: 'Sci-Fi & UI',
  tags: ["ui", "feedback", "crafting", "bench", "part", "seat", "confirm", "wood"], loopable: false, durationSec: 0.178,
  mixRole: 'interface', targetRmsDbfs: -22,
  ...sceneCredits(contact0, contact2),
  params: { pressure: { label: 'Contact pressure', min: 0, max: 1, default: 0.56 } },
  render(ctx, { seed, params }) {
    return scene(ctx, seed, params.pressure, [
      ['clip', contact0, 0.0000, 0.042, 0.45, 0, 11700, 0.0004, 0.011],
      ['clip', contact2, 0.0326, 0.109, 1.00, 0, 9900, 0.0004, 0.012],
      ['contact', 'wood', 0.013, 0.081, 0.35, 677, 0.0012],
    ]);
  },
} satisfies SoundRecipe;
