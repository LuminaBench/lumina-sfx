import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import contact0 from './_recordings/physical-light-switch.ts';
import contact2 from './_recordings/irrigation-valve-shut.ts';

export default {
  id: 'greenhouse-timer-bypass-release', name: 'Greenhouse timer bypass release', category: 'Sci-Fi & UI',
  tags: ["ui", "feedback", "greenhouse", "timer", "bypass", "release", "rubber"], loopable: false, durationSec: 0.165,
  mixRole: 'interface', targetRmsDbfs: -24,
  ...sceneCredits(contact0, contact2),
  params: { pressure: { label: 'Contact pressure', min: 0, max: 1, default: 0.56 } },
  render(ctx, { seed, params }) {
    return scene(ctx, seed, params.pressure, [
      ['clip', contact2, 0.0000, 0.059, 0.62, 0, 7100, 0.0004, 0.012],
      ['clip', contact0, 0.0762, 0.053, 0.54, 0, 11700, 0.0004, 0.012],
      ['brush', 'rubber', 0.013, 0.067, 0.2, 1023, 0.0012],
    ]);
  },
} satisfies SoundRecipe;
