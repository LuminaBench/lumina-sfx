import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import contact0 from './_recordings/demo-camera.ts';
import contact1 from './_recordings/response-microclick.ts';

export default {
  id: 'photo-viewfinder-aperture-step', name: 'Photo viewfinder aperture step', category: 'Sci-Fi & UI',
  tags: ["ui", "feedback", "photo", "viewfinder", "aperture", "step", "selection", "rubber"], loopable: false, durationSec: 0.122,
  mixRole: 'interface', targetRmsDbfs: -24,
  ...sceneCredits(contact0, contact1),
  params: { pressure: { label: 'Contact pressure', min: 0, max: 1, default: 0.56 } },
  render(ctx, { seed, params }) {
    return scene(ctx, seed, params.pressure, [
      ['clip', contact1, 0.0000, 0.086, 0.87, 0, 8500, 0.0004, 0.012],
      ['clip', contact0, 0.0172, 0.047, 0.36, 0, 6700, 0.0004, 0.012],
      ['contact', 'rubber', 0.008, 0.024, 0.13, 2123, 0.0012],
    ]);
  },
} satisfies SoundRecipe;
