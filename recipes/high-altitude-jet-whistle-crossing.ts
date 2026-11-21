import { mix } from '../engine/dsp.ts';
import { airTransient } from './_shared/air-transients.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-airliner-approach.ts';

export default {
  id: "high-altitude-jet-whistle-crossing",
  name: "High-altitude jet whistle crossing",
  category: "Aircraft",
  tags: ["high", "altitude", "jet", "whistle", "crossing"],
  loopable: false,
  durationSec: 3.7,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = airTransient(ctx, {
      motion: "flyby", focus: .34, width: .38, whistle: 790,
      weight: .23, cutoff: 1600, reflection: 0,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 3.70, .45, .18, 1580, .017, .66],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
