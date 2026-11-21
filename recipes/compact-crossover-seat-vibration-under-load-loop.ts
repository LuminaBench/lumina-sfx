import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-saturn-idle.ts';

export default {
  id: "compact-crossover-seat-vibration-under-load-loop",
  name: "Compact crossover seat vibration under load loop",
  category: "Vehicles & Engines",
  tags: ["compact", "crossover", "seat", "vibration", "under", "load", "vehicle"],
  loopable: true,
  durationSec: 4.59,
  targetRmsDbfs: -30,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 160, edge: 1530, drift: .67, density: 5, material: "rubber", texture: .21,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 4.71, .81, .76, 920, 0, 0],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
