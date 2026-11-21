import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-tram-door.ts';

export default {
  id: "heritage-rail-coach-door-slides-open",
  name: "Heritage Rail Coach Door Slides Open",
  category: "Vehicles & Engines",
  tags: ["heritage", "rail", "coach", "door", "slides", "open", "vehicle"],
  loopable: false,
  durationSec: 1.69,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.57, 0.76, 0.43, 3510, 0.007, 0.08],
      ["brush", "iron", 0.1, 1.25, 0.3, 542.64, 0.07],
      ["contact", "rubber", 1.03, 0.32, 0.36, 197.6, 0.002],
    ]);
  },
} satisfies SoundRecipe;
