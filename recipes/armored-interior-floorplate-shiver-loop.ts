import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-track-roll.ts';

export default {
  id: "armored-interior-floorplate-shiver-loop",
  name: "Armored interior floorplate shiver loop",
  category: "Vehicles & Engines",
  tags: ["armored", "interior", "floorplate", "shiver", "tank", "tracked", "armoured", "vehicle"],
  loopable: true,
  durationSec: 4.4,
  targetRmsDbfs: -31,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 148, edge: 811, drift: .94, density: 4, material: "iron", texture: .23,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 4.52, .55, 1.24, 850, 0, 0],
      ["contact", "iron", .51, .16, .25, 250, .004],
      ["contact", "iron", 1.62, .28, .2, 270, .004],
      ["contact", "iron", 3.23, .18, .29, 325, .003],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
