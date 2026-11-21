import { mix } from '../engine/dsp.ts';
import { airTransient } from './_shared/air-transients.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-turbine-ignition.ts';

export default {
  id: "ground-crew-jet-ignition-interior-wash",
  name: "Ground crew jet ignition interior wash",
  category: "Aircraft",
  tags: ["ground", "crew", "jet", "ignition", "interior", "wash"],
  loopable: false,
  durationSec: 3.58,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = airTransient(ctx, {
      motion: "launch", focus: 0, width: .37, whistle: 219,
      weight: .43, cutoff: 1130, reflection: .15,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 3.58, .58, .24, 2220, .002, .66],
      ["contact", "iron", 0, .087, .32, 346, .0018],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
