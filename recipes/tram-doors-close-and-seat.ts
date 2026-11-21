import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-tram-door.ts';
import source2 from './_recordings/field-heavy-hatch.ts';

export default {
  id: "tram-doors-close-and-seat",
  name: "Tram Doors Close and Seat",
  category: "Vehicles & Engines",
  tags: ["tram", "doors", "close", "seat", "vehicle"],
  loopable: false,
  durationSec: 2.13,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.65, .85, .45, 6970, .014, .18],
      ['clip', source2, 1.24, .66, .49, .25, 5550],
      ["contact", "rubber", 1.46, .35, .31, 255, .004],
    ]);
  },
} satisfies SoundRecipe;
