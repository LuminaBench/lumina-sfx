import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import contact0 from './_recordings/milestone-key-single.ts';
import contact1 from './_recordings/book-page-turn.ts';
import contact2 from './_recordings/wooden-chest-latch-release.ts';

export default {
  id: 'map-table-route-plotted', name: 'Map table route plotted', category: 'Sci-Fi & UI',
  tags: ["ui", "feedback", "map", "table", "route", "plotted", "reward", "wood"], loopable: false, durationSec: 0.249,
  mixRole: 'interface', targetRmsDbfs: -22,
  ...sceneCredits(contact0, contact1, contact2),
  params: { pressure: { label: 'Contact pressure', min: 0, max: 1, default: 0.56 } },
  render(ctx, { seed, params }) {
    return scene(ctx, seed, params.pressure, [
      ['clip', contact1, 0.0000, 0.079, 0.60, 0, 6800, 0.0004, 0.012],
      ['clip', contact2, 0.0518, 0.136, 0.96, 0, 9300, 0.0004, 0.012],
      ['clip', contact0, 0.1613, 0.052, 0.22, 0, 5700, 0.0004, 0.012],
      ['contact', 'wood', 0.013, 0.100, 0.39, 1109, 0.0012],
    ]);
  },
} satisfies SoundRecipe;
