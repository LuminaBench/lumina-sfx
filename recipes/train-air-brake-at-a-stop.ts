import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/truck-air-brake-release.ts';
import source2 from './_recordings/demo-tram-door.ts';

export default {
  id: "train-air-brake-at-a-stop",
  name: "Train Air Brake at a Stop",
  category: "Vehicles & Engines",
  tags: ["train", "air", "brake", "stop", "vehicle"],
  loopable: false,
  durationSec: 1.75,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.41, .80, .021, 10600],
      ['clip', source2, .21, 1.44, .19, .32, 4500],
      ["contact", "iron", 1.15, .32, .33, 310, .007],
    ]);
  },
} satisfies SoundRecipe;
