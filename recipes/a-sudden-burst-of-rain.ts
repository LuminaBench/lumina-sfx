import { mix } from '../engine/dsp.ts';
import { surfaceRain } from './_shared/weather-textures.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/water-drops-from-spout.ts';

export default {
  id: "a-sudden-burst-of-rain",
  name: "A Sudden Burst of Rain",
  category: "Weather & Ambience",
  tags: ["sudden", "burst", "rain", "ambience"],
  loopable: false,
  durationSec: 3.15,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = surfaceRain(ctx, { material: "open", duration: 3.15, force: params.intensity, density: .64, pace: 1 });
    for (let i = 0; i < bed.length; i++) {
      const fraction = i / bed.length;
      bed[i] *= Math.min(1, 0.065 + fraction ** 1.45 * 1.45);
    }
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .45, .32, .1, 8700],
      ["grains", "water", 0, .90, .15, 610, 13],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
