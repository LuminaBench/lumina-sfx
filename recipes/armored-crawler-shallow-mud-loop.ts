import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-track-roll.ts';

export default {
  id: "armored-crawler-shallow-mud-loop",
  name: "Armored crawler shallow mud loop",
  category: "Vehicles & Engines",
  tags: ["armored", "crawler", "shallow", "mud", "tank", "tracked", "armoured", "vehicle"],
  loopable: true,
  durationSec: 5.4,
  targetRmsDbfs: -29,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 130, edge: 878, drift: .43, density: 9, material: "water", texture: .39,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 5.52, .44, .52, 1730, 0, 0],
      ["contact", "water", 1.08, .24, .46, 124, .007],
      ["contact", "water", 2.46, .34, .61, 108, .014],
      ["contact", "water", 3.96, .30, .51, 167, .01],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
