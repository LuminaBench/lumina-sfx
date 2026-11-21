import { mix } from '../engine/dsp.ts';
import { surfaceRain } from './_shared/weather-textures.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "hail-on-garden-soil-loop",
  name: "Hail on Garden Soil",
  category: "Weather & Ambience",
  tags: ["hail", "garden", "soil", "ambience"],
  loopable: true,
  durationSec: 9.0,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params, seed }) {
    const bed = surfaceRain(ctx, { material: "leaves", duration: 9.0, force: params.intensity, density: .53, pace: 1 });
    const detail = scene(ctx, seed, params.intensity, [
      ["grains", "soil", 0, 8.8, .25, 905, 146],
      ["grains", "stone", .062, 8.8, .13, 1670, 85],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
