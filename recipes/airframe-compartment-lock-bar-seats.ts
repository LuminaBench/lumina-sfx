import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-clank-close.ts';

export default {
  id: "airframe-compartment-lock-bar-seats",
  name: "Airframe compartment lock bar seats",
  category: "Aircraft",
  tags: ["airframe", "compartment", "lock", "bar", "seats", "flight"],
  loopable: false,
  durationSec: 0.77,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .30, .59, .012, 6800, .002, .036],
      ["contact", "iron", 0, .16, .66, 272, .0016],
      ["brush", "iron", .133, .234, .22, 770, .007],
      ["contact", "iron", .343, .17, .59, 1260, .001],
    ]);
  },
} satisfies SoundRecipe;
