import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-wet-road.ts';
import source2 from './_recordings/drop-root-crops-crate.ts';
import source3 from './_recordings/field-heavy-hatch.ts';

export default {
  id: "pickup-bed-load-shift",
  name: "Pickup Bed Load Shift",
  category: "Vehicles & Engines",
  tags: ["pickup", "bed", "load", "shift", "vehicle"],
  loopable: false,
  durationSec: 1.27,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .98, .45, .94, 4300],
      ['clip', source2, .16, .62, .67, .03, 3700],
      ['clip', source3, .39, .69, .45, .499, 6020],
    ]);
  },
} satisfies SoundRecipe;
