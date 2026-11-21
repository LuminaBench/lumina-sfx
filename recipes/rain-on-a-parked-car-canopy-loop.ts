import { mix } from '../engine/dsp.ts';
import { surfaceRain } from './_shared/weather-textures.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/car-wiper-rain-loop.ts';

export default {
  id: "rain-on-a-parked-car-canopy-loop",
  name: "Rain on a Parked Car Canopy",
  category: "Weather & Ambience",
  tags: ["rain", "parked", "car", "canopy", "ambience"],
  loopable: true,
  durationSec: 10.0,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = surfaceRain(ctx, { material: "roof", duration: 10.0, force: params.intensity, density: .64, pace: 2 });
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 2.72, 5, .095, .40, 2540, .91, 1.13],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
