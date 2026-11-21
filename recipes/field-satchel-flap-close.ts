import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import contact0 from './_recordings/leather-strap-flex.ts';
import contact2 from './_recordings/car-seat-belt-click.ts';

export default {
  id: 'field-satchel-flap-close', name: 'Field satchel flap close', category: 'Sci-Fi & UI',
  tags: ["ui", "feedback", "field", "satchel", "flap", "close", "back", "cloth"], loopable: false, durationSec: 0.266,
  mixRole: 'interface', targetRmsDbfs: -24,
  ...sceneCredits(contact0, contact2),
  params: { pressure: { label: 'Contact pressure', min: 0, max: 1, default: 0.56 } },
  render(ctx, { seed, params }) {
    return scene(ctx, seed, params.pressure, [
      ['clip', contact0, 0.0000, 0.066, 0.33, 0, 5800, 0.0004, 0.012],
      ['clip', contact2, 0.1038, 0.126, 0.90, 0, 4400, 0.0004, 0.012],
      ['brush', 'cloth', 0.013, 0.135, 0.23, 504, 0.0012],
    ]);
  },
} satisfies SoundRecipe;
