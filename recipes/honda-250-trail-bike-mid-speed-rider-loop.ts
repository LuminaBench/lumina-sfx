import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-honda-dirt-roll.ts';

export default {
  id: "honda-250-trail-bike-mid-speed-rider-loop",
  name: "Honda 250 trail bike mid-speed rider loop",
  category: "Vehicles & Engines",
  tags: ["honda", "250", "trail", "bike", "mid", "speed", "rider", "vehicle"],
  loopable: true,
  durationSec: 4.07,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 186, edge: 1300, drift: .63, density: 8, material: "rubber", texture: .15,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 4.19, .79, .15, 7000, 0, 0],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
