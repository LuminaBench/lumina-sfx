import { mix } from '../engine/dsp.ts';
import { airTransient } from './_shared/air-transients.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-jet-pass.ts';

export default {
  id: "heavy-jet-low-doppler-sweep",
  name: "Heavy jet low Doppler sweep",
  category: "Aircraft",
  tags: ["heavy", "jet", "low", "doppler", "sweep"],
  loopable: false,
  durationSec: 3.41,
  targetRmsDbfs: -23,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = airTransient(ctx, {
      motion: "flyby", focus: .40, width: .30, whistle: 314,
      weight: .86, cutoff: 4300, reflection: 0,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 3.41, .71, .14, 7900, .012, .55],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
