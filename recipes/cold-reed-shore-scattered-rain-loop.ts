import { mix } from '../engine/dsp.ts';
import { surfaceRain } from './_shared/weather-textures.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-farm-marsh.ts';

export default {
  id: "cold-reed-shore-scattered-rain-loop",
  name: "Cold Reed Shore Scattered Rain",
  category: "Weather & Ambience",
  tags: ["cold", "reed", "shore", "scattered", "rain", "ambience"],
  loopable: true,
  durationSec: 10.0,
  targetRmsDbfs: -32,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = surfaceRain(ctx, { material: "leaves", duration: 10.0, force: params.intensity, density: 0.32, pace: 1.33 });
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 10.075, 0.15, 1.03, 3208.5, 0, 0],
      ["grains", "plant", 0.28, 8.74, 0.07, 1097.1, 38],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
