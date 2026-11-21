import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-garage-motor.ts';
import source2 from './_recordings/loose-gravel-landing.ts';

export default {
  id: "airport-service-tug-coming-to-rest",
  name: "Airport Service Tug Coming to Rest",
  category: "Aircraft",
  tags: ["airport", "service", "tug", "coming", "rest"],
  loopable: false,
  durationSec: 3.63,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 2.85, 0.38, 0.64, 1500, 0.021, 0.53],
      ["contact", "stone", 0.34, 0.24, 0.62, 212.6, 0.002],
      ["grains", "stone", 0.39, 1.94, 0.42, 270, 19],
      ['clip', source2, 0.76, 1.58, 0.29, 0.01, 1800, 0.007, 0.08],
    ]);
  },
} satisfies SoundRecipe;
