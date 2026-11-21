import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/dry-leaves-footstep.ts';
import source2 from './_recordings/jacket-movement-rustle.ts';

export default {
  id: "crouch-shift-on-leaf-litter",
  name: "Crouch Shift on Leaf Litter",
  category: "Footsteps & UI",
  tags: ["crouch", "shift", "leaf", "litter"],
  loopable: false,
  durationSec: 0.84,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .57, .61, .089, 6600],
      ['clip', source2, .029, .69, .53, .091, 5500],
      ["brush", "plant", .31, .42, .20, 1130, .075],
    ]);
  },
} satisfies SoundRecipe;
