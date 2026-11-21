import { mix } from '../engine/dsp.ts';
import { surfaceRain } from './_shared/weather-textures.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-leaf-bed.ts';

export default {
  id: "freezing-rain-on-bare-branches-loop",
  name: "Freezing Rain on Bare Branches",
  category: "Weather & Ambience",
  tags: ["freezing", "rain", "bare", "branches", "ambience"],
  loopable: true,
  durationSec: 9.0,
  targetRmsDbfs: -31,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = surfaceRain(ctx, { material: "leaves", duration: 9.0, force: params.intensity, density: .32, pace: 2 });
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 9.075, .19, .65, 6040, 0, 0],
      ["grains", "glass", .10, 8.6, .22, 1120, 73],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
