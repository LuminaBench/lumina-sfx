import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import contact0 from './_recordings/response-microclick.ts';
import contact2 from './_recordings/response-rocker.ts';

export default {
  id: 'radar-console-track-lock', name: 'Radar console track lock', category: 'Sci-Fi & UI',
  tags: ["ui", "feedback", "radar", "console", "track", "lock", "confirm", "glass"], loopable: false, durationSec: 0.179,
  mixRole: 'interface', targetRmsDbfs: -22,
  ...sceneCredits(contact0, contact2),
  params: { pressure: { label: 'Contact pressure', min: 0, max: 1, default: 0.56 } },
  render(ctx, { seed, params }) {
    return scene(ctx, seed, params.pressure, [
      ['clip', contact0, 0.0000, 0.042, 0.45, 0, 11700, 0.0004, 0.011],
      ['clip', contact2, 0.0337, 0.109, 1.00, 0, 9900, 0.0004, 0.012],
      ['contact', 'glass', 0.013, 0.081, 0.35, 1172, 0.0012],
    ]);
  },
} satisfies SoundRecipe;
