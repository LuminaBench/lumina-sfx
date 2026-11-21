import { mix } from '../engine/dsp.ts';
import { surfaceRain } from './_shared/weather-textures.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-stalk-bed.ts';

export default {
  id: "autumn-meadow-edge-scattered-rain-loop",
  name: "Autumn Meadow Edge Scattered Rain",
  category: "Weather & Ambience",
  tags: ["autumn", "meadow", "edge", "scattered", "rain", "ambience"],
  loopable: true,
  durationSec: 10.0,
  targetRmsDbfs: -32,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = surfaceRain(ctx, { material: "leaves", duration: 10.0, force: params.intensity, density: 0.32, pace: 0.91 });
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 10.075, 0.15, 1.03, 3642.5, 0, 0],
      ["grains", "plant", 0.28, 8.74, 0.07, 1245.5, 38],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
