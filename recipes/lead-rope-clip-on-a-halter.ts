import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/key-ring-jingle.ts';
import source2 from './_recordings/door-chain-latch-slide.ts';
import source3 from './_recordings/leather-strap-flex.ts';

export default {
  id: "lead-rope-clip-on-a-halter",
  name: "Lead Rope Clip on a Halter",
  category: "Animals",
  tags: ["lead", "rope", "clip", "halter", "livestock"],
  loopable: false,
  durationSec: 0.84,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .38, .53, .085, 8900],
      ['clip', source2, .13, .41, .58, .04, 9300],
      ['clip', source3, .31, .42, .52, .13, 6500],
    ]);
  },
} satisfies SoundRecipe;
