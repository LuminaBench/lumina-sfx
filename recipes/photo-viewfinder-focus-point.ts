import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import contact0 from './_recordings/demo-camera.ts';

export default {
  id: 'photo-viewfinder-focus-point', name: 'Photo viewfinder focus point', category: 'Sci-Fi & UI',
  tags: ["ui", "feedback", "photo", "viewfinder", "focus", "point", "hover", "rubber"], loopable: false, durationSec: 0.09,
  mixRole: 'interface', targetRmsDbfs: -26,
  ...sceneCredits(contact0),
  params: { pressure: { label: 'Contact pressure', min: 0, max: 1, default: 0.56 } },
  render(ctx, { seed, params }) {
    return scene(ctx, seed, params.pressure, [
      ['clip', contact0, 0.0000, 0.054, 0.75, 0, 10500, 0.0004, 0.012],
      ['brush', 'rubber', 0.008, 0.038, 0.075, 3667, 0.0012],
    ]);
  },
} satisfies SoundRecipe;
