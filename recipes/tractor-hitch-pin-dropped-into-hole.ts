import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/door-chain-latch-slide.ts';
import source2 from './_recordings/blacksmith-anvil-strike.ts';

export default {
  id: "tractor-hitch-pin-dropped-into-hole",
  name: "Tractor Hitch Pin Dropped into Hole",
  category: "Vehicles & Engines",
  tags: ["tractor", "hitch", "pin", "dropped", "hole", "vehicle"],
  loopable: false,
  durationSec: 0.63,
  targetRmsDbfs: -22,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .37, .63, .02, 8600],
      ['clip', source2, .13, .39, .52, .025, 10300],
      ["contact", "iron", .117, .31, .71, 336, .0005],
    ]);
  },
} satisfies SoundRecipe;
