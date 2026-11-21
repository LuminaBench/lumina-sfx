import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-sheltered-wind.ts';
import source2 from './_recordings/demo-tent-tension.ts';

export default {
  id: "parachute-descent-calm-loop",
  name: "Parachute Descent Calm",
  category: "Weather & Ambience",
  tags: ["parachute", "descent", "calm", "ambience"],
  loopable: true,
  durationSec: 9.0,
  targetRmsDbfs: -33,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 260, edge: 1430, drift: .16, density: 2.35, material: "cloth", texture: .16,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 9.075, .46, 2.32, 4300, 0, 0],
      ['clip', source2, 3.25, 3.08, .15, .03, 4900, .42, .65],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
