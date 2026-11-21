import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-stalk-bed.ts';
import source2 from './_recordings/burlap-feed-sack-open.ts';

export default {
  id: "airing-a-grain-shed-loop",
  name: "Airing a Grain Shed",
  category: "Weather & Ambience",
  tags: ["airing", "grain", "shed", "ambience"],
  loopable: true,
  durationSec: 14.0,
  targetRmsDbfs: -34,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 225, edge: 1480, drift: .20, density: 5.1, material: "paper", texture: .36,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 14.075, .45, 1.59, 4570, 0, 0],
      ['clip', source2, 5.32, .61, .09, .02, 3300, .03, .1],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
