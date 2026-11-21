import { mix } from '../engine/dsp.ts';
import { surfaceRain } from './_shared/weather-textures.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/jacket-movement-rustle.ts';

export default {
  id: "rain-on-a-fabric-parasol-loop",
  name: "Rain on a Fabric Parasol",
  category: "Weather & Ambience",
  tags: ["rain", "fabric", "parasol", "ambience"],
  loopable: true,
  durationSec: 9.0,
  targetRmsDbfs: -29,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = surfaceRain(ctx, { material: "mist", duration: 9.0, force: params.intensity, density: .71, pace: 4 });
    const detail = scene(ctx, seed, params.intensity, [
      ["grains", "cloth", .10, 8.55, .21, 395, 137],
      ['clip', source, 5.82, .63, .045, 0, 3800, .04, .19],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
