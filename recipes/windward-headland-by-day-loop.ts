import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-ocean.ts';
import source2 from './_recordings/demo-sheltered-wind.ts';

export default {
  id: "windward-headland-by-day-loop",
  name: "Windward Headland by Day",
  category: "Weather & Ambience",
  tags: ["windward", "headland", "day", "ambience"],
  loopable: true,
  durationSec: 10.0,
  targetRmsDbfs: -32,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 495, edge: 2580, drift: 0.32, density: 6, material: "stone", texture: 0.46,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 10.075, 0.59, 0.61, 7998, 0, 0],
      ['clip', source2, 1.5, 7.2, 0.16, 0.46, 4437.6, 1.2, 1.1],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
