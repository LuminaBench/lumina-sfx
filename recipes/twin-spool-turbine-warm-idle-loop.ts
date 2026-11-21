import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-turbine-idle.ts';

export default {
  id: "twin-spool-turbine-warm-idle-loop",
  name: "Twin spool turbine warm idle loop",
  category: "Aircraft",
  tags: ["twin", "spool", "turbine", "warm", "idle", "flight", "jet"],
  loopable: true,
  durationSec: 4.8,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 170, edge: 3060, drift: .41, density: 13, material: "air", texture: .31,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 4.92, .84, .1, 7600, 0, 0],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
