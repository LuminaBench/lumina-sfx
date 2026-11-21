import { mix } from '../engine/dsp.ts';
import { surfaceRain } from './_shared/weather-textures.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/water-drops-from-spout.ts';

export default {
  id: "rain-filling-a-clay-pot-loop",
  name: "Rain Filling a Clay Pot",
  category: "Weather & Ambience",
  tags: ["rain", "filling", "clay", "pot", "ambience"],
  loopable: true,
  durationSec: 9.0,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = surfaceRain(ctx, { material: "puddles", duration: 9.0, force: params.intensity, density: .29, pace: 1 });
    const detail = scene(ctx, seed, params.intensity, [
      ["grains", "glass", .2, 8.4, .19, 620, 41],
      ['clip', source, 6.12, .87, .26, 0, 11800, .045, .10],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
