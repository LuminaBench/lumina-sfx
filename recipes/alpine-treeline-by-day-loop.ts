import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-corn-rustle.ts';
import source2 from './_recordings/field-farm-air.ts';

export default {
  id: "alpine-treeline-by-day-loop",
  name: "Alpine Treeline by Day",
  category: "Weather & Ambience",
  tags: ["alpine", "treeline", "day", "ambience"],
  loopable: true,
  durationSec: 10.0,
  targetRmsDbfs: -32,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 320, edge: 2240, drift: 0.16, density: 6, material: "plant", texture: 0.46,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 10.075, 0.59, 0.61, 6944, 0, 0],
      ['clip', source2, 1.5, 7.2, 0.16, 0.46, 3852.8, 1.2, 1.1],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
