import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-ev-surface.ts';

export default {
  id: "electric-taxi-low-speed-cabin-coast-loop",
  name: "Electric taxi low-speed cabin coast loop",
  category: "Vehicles & Engines",
  tags: ["electric", "taxi", "low", "speed", "cabin", "coast", "car", "engine", "vehicle"],
  loopable: true,
  durationSec: 5.2,
  targetRmsDbfs: -31,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 195, edge: 1270, drift: .73, density: 8, material: "rubber", texture: .28,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 5.32, .56, 1.45, 1050, 0, 0],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
