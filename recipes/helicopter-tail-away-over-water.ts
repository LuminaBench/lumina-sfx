import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-rotor-pass.ts';

export default {
  id: "helicopter-tail-away-over-water",
  name: "Helicopter Tail-away over Water",
  category: "Aircraft",
  tags: ["helicopter", "tail", "away", "water"],
  loopable: false,
  durationSec: 5.4,
  targetRmsDbfs: -29,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 5.22, .91, 3.97, 3000, .018, .58],
      ["brush", "air", 2.47, 2.45, .30, 945, .25],
    ]);
  },
} satisfies SoundRecipe;
