import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import contact1 from './_recordings/response-button.ts';

export default {
  id: 'radio-stack-channel-busy', name: 'Radio stack channel busy', category: 'Sci-Fi & UI',
  tags: ["ui", "feedback", "radio", "stack", "channel", "busy", "reject", "iron"], loopable: false, durationSec: 0.116,
  mixRole: 'interface', targetRmsDbfs: -24,
  ...sceneCredits(contact1),
  params: { pressure: { label: 'Contact pressure', min: 0, max: 1, default: 0.56 } },
  render(ctx, { seed, params }) {
    return scene(ctx, seed, params.pressure, [
      ['clip', contact1, 0.0000, 0.037, 0.87, 0, 4600, 0.0004, 0.009],
      ['clip', contact1, 0.0535, 0.027, 0.51, 0, 2100, 0.0004, 0.007],
      ['contact', 'iron', 0.013, 0.101, 0.45, 555, 0.0012],
    ]);
  },
} satisfies SoundRecipe;
