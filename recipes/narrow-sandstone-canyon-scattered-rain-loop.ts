import { mix } from '../engine/dsp.ts';
import { surfaceRain } from './_shared/weather-textures.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-sheltered-wind.ts';

export default {
  id: "narrow-sandstone-canyon-scattered-rain-loop",
  name: "Narrow Sandstone Canyon Scattered Rain",
  category: "Weather & Ambience",
  tags: ["narrow", "sandstone", "canyon", "scattered", "rain", "ambience"],
  loopable: true,
  durationSec: 10.0,
  targetRmsDbfs: -32,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = surfaceRain(ctx, { material: "open", duration: 10.0, force: params.intensity, density: 0.32, pace: 1.47 });
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 10.075, 0.15, 1.03, 2185.5, 0, 0],
      ["grains", "stone", 0.28, 8.74, 0.07, 747.3, 38],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
