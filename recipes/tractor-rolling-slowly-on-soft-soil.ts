import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/tractor-diesel-pullaway.ts';
import source2 from './_recordings/spade-wet-mud.ts';

export default {
  id: "tractor-rolling-slowly-on-soft-soil",
  name: "Tractor Rolling Slowly on Soft Soil",
  category: "Vehicles & Engines",
  tags: ["tractor", "rolling", "slowly", "soft", "soil", "vehicle"],
  loopable: false,
  durationSec: 2.33,
  targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 2.18, .75, .16, 6100],
      ['clip', source2, .38, .63, .23, .045, 3200],
      ["brush", "rubber", .15, 1.46, .38, 160, .06],
      ["contact", "soil", 1.49, .41, .25, 225, .005],
    ]);
  },
} satisfies SoundRecipe;
