import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import contact1 from './_recordings/book-page-turn.ts';

export default {
  id: 'map-table-boundary-bump', name: 'Map table boundary bump', category: 'Sci-Fi & UI',
  tags: ["ui", "feedback", "map", "table", "boundary", "bump", "reject", "wood"], loopable: false, durationSec: 0.111,
  mixRole: 'interface', targetRmsDbfs: -24,
  ...sceneCredits(contact1),
  params: { pressure: { label: 'Contact pressure', min: 0, max: 1, default: 0.56 } },
  render(ctx, { seed, params }) {
    return scene(ctx, seed, params.pressure, [
      ['clip', contact1, 0.0000, 0.037, 0.87, 0, 4600, 0.0004, 0.009],
      ['clip', contact1, 0.0480, 0.027, 0.51, 0, 2100, 0.0004, 0.007],
      ['contact', 'wood', 0.013, 0.096, 0.45, 592, 0.0012],
    ]);
  },
} satisfies SoundRecipe;
