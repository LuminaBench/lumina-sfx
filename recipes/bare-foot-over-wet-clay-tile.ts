import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/ceramic-tile-footstep.ts';
import source2 from './_recordings/shallow-water-footstep.ts';

export default {
  id: "bare-foot-over-wet-clay-tile",
  name: "Bare Foot over Wet Clay Tile",
  category: "Footsteps & UI",
  tags: ["bare", "foot", "wet", "clay", "tile"],
  loopable: false,
  durationSec: 0.58,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .43, .67, .046, 5750],
      ['clip', source2, .059, .42, .40, .102, 6800],
      ["contact", "rubber", .128, .20, .24, 435, .009],
    ]);
  },
} satisfies SoundRecipe;
