import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import contact0 from './_recordings/response-rocker.ts';
import contact2 from './_recordings/response-appliance-single.ts';

export default {
  id: 'radio-stack-carrier-release', name: 'Radio stack carrier release', category: 'Sci-Fi & UI',
  tags: ["ui", "feedback", "radio", "stack", "carrier", "release", "iron"], loopable: false, durationSec: 0.168,
  mixRole: 'interface', targetRmsDbfs: -24,
  ...sceneCredits(contact0, contact2),
  params: { pressure: { label: 'Contact pressure', min: 0, max: 1, default: 0.56 } },
  render(ctx, { seed, params }) {
    return scene(ctx, seed, params.pressure, [
      ['clip', contact2, 0.0000, 0.059, 0.62, 0, 7100, 0.0004, 0.012],
      ['clip', contact0, 0.0792, 0.053, 0.54, 0, 11700, 0.0004, 0.012],
      ['brush', 'iron', 0.013, 0.067, 0.2, 1829, 0.0012],
    ]);
  },
} satisfies SoundRecipe;
