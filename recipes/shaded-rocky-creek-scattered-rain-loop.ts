import { mix } from '../engine/dsp.ts';
import { surfaceRain } from './_shared/weather-textures.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-brook-bed.ts';

export default {
  id: "shaded-rocky-creek-scattered-rain-loop",
  name: "Shaded Rocky Creek Scattered Rain",
  category: "Weather & Ambience",
  tags: ["shaded", "rocky", "creek", "scattered", "rain", "ambience"],
  loopable: true,
  durationSec: 10.0,
  targetRmsDbfs: -32,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = surfaceRain(ctx, { material: "puddles", duration: 10.0, force: params.intensity, density: 0.32, pace: 1.54 });
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 10.075, 0.15, 1.03, 5053, 0, 0],
      ["grains", "water", 0.28, 8.74, 0.07, 1727.8, 38],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
