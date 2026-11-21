import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-rail-joints.ts';

export default {
  id: "train-wheels-over-rail-joints-loop",
  name: "Train Wheels over Rail Joints",
  category: "Vehicles & Engines",
  tags: ["train", "wheels", "rail", "joints", "vehicle"],
  loopable: true,
  durationSec: 9.0,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 330, edge: 1300, drift: .16, density: 1.9, material: "iron", texture: .23,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 9.075, .95, .30, 9600, 0, 0],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
