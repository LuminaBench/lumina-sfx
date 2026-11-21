import { mix } from '../engine/dsp.ts';
import { surfaceRain } from './_shared/weather-textures.ts';
import { scene } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';

export default {
  id: "hail-hitting-a-glasshouse-loop",
  name: "Hail Hitting a Glasshouse",
  category: "Weather & Ambience",
  tags: ["hail", "hitting", "glasshouse", "ambience"],
  loopable: true,
  durationSec: 9.0,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  render(ctx, { params, seed }) {
    const bed = surfaceRain(ctx, { material: "hail", duration: 9.0, force: params.intensity, density: .67, pace: 2 });
    const detail = scene(ctx, seed, params.intensity, [
      ["grains", "glass", .018, 8.65, .24, 1290, 131],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
