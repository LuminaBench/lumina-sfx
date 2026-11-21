import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-sheltered-wind.ts';
import source2 from './_recordings/demo-station-room.ts';

export default {
  id: "late-night-workshop-window-air-loop",
  name: "Late Night Workshop Window Air",
  category: "Weather & Ambience",
  tags: ["late", "night", "workshop", "window", "air", "ambience"],
  loopable: true,
  durationSec: 10.0,
  targetRmsDbfs: -35,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 190, edge: 1310, drift: .13, density: 1.23, material: "air", texture: .17,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 10.075, .34, 3.37, 2250, 0, 0],
      ['clip', source2, .11, 8, .08, 1.41, 1700, .51, 1.5],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
