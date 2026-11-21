import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-track-roll.ts';

export default {
  id: "armored-crawler-gravel-creep-loop",
  name: "Armored crawler gravel creep loop",
  category: "Vehicles & Engines",
  tags: ["armored", "crawler", "gravel", "creep", "tank", "tracked", "armoured", "vehicle"],
  loopable: true,
  durationSec: 5.1,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 164, edge: 1970, drift: .75, density: 17, material: "stone", texture: .49,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 5.22, .61, .81, 2800, 0, 0],
      ["grains", "stone", .15, 4.75, .51, 690, 58],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
