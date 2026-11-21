import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-chain-scrape.ts';

export default {
  id: "dirt-bike-chain-guide-chatter-loop",
  name: "Dirt bike chain guide chatter loop",
  category: "Vehicles & Engines",
  tags: ["dirt", "bike", "chain", "guide", "chatter", "vehicle"],
  loopable: true,
  durationSec: 3.25,
  targetRmsDbfs: -30,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 350, edge: 3160, drift: .91, density: 16, material: "iron", texture: .51,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 2.31, .30, .012, 5600, 0, .18],
      ["grains", "iron", .16, 2.92, .29, 1130, 29],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
