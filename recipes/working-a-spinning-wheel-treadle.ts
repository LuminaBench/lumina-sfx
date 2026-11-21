import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/barn-timber-creak.ts';
import source2 from './_recordings/hardwood-footstep.ts';
import source3 from './_recordings/leather-strap-flex.ts';

export default {
  id: "working-a-spinning-wheel-treadle",
  name: "Working a Spinning Wheel Treadle",
  category: "Props & Interactions",
  tags: ["working", "spinning", "wheel", "treadle"],
  loopable: false,
  durationSec: 1.63,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .71, .51, .071, 4200],
      ['clip', source2, .114, .30, .56, .014, 5200],
      ["motor", .18, 1.22, .06, 92, 134, .11, .57],
      ['clip', source2, .54, .28, .39, .002, 3800],
      ['clip', source3, .85, .63, .25, .06, 6300],
    ]);
  },
} satisfies SoundRecipe;
