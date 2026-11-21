import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/car-door-shut-inside.ts';
import source2 from './_recordings/field-heavy-hatch.ts';

export default {
  id: "trunk-latch-final-close",
  name: "Trunk Latch Final Close",
  category: "Vehicles & Engines",
  tags: ["trunk", "latch", "final", "close", "vehicle"],
  loopable: false,
  durationSec: 0.97,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .72, .73, .046, 6800],
      ['clip', source2, .117, .7, .37, .19, 8800],
      ["contact", "iron", .28, .23, .43, 560, .0008],
    ]);
  },
} satisfies SoundRecipe;
