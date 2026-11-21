import type { SoundRecipe } from '../engine/types.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import contact0 from './_recordings/car-central-lock.ts';
import contact1 from './_recordings/motion-workshop-slide.ts';
import contact2 from './_recordings/milestone-tool.ts';

export default {
  id: 'workshop-panel-feeder-cycle', name: 'Workshop panel feeder cycle', category: 'Sci-Fi & UI',
  tags: ["ui", "feedback", "workshop", "panel", "feeder", "cycle", "browse", "iron"], loopable: false, durationSec: 0.307,
  mixRole: 'interface', targetRmsDbfs: -25,
  ...sceneCredits(contact0, contact1, contact2),
  params: { pressure: { label: 'Contact pressure', min: 0, max: 1, default: 0.56 } },
  render(ctx, { seed, params }) {
    return scene(ctx, seed, params.pressure, [
      ['clip', contact0, 0.0000, 0.043, 0.40, 0, 8900, 0.0004, 0.011],
      ['clip', contact1, 0.0637, 0.051, 0.53, 0, 7800, 0.0004, 0.012],
      ['clip', contact0, 0.1137, 0.036, 0.50, 0, 9400, 0.0004, 0.009],
      ['clip', contact1, 0.1480, 0.047, 0.64, 0, 9000, 0.0004, 0.012],
      ['clip', contact2, 0.1960, 0.075, 0.65, 0, 6700, 0.0004, 0.012],
      ['brush', 'iron', 0.013, 0.180, 0.11, 1140, 0.0012],
    ]);
  },
} satisfies SoundRecipe;
