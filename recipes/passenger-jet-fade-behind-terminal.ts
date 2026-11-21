import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-jet-pass.ts';

export default {
  id: "passenger-jet-fade-behind-terminal",
  name: "Passenger Jet Fade behind Terminal",
  category: "Aircraft",
  tags: ["passenger", "jet", "fade", "terminal"],
  loopable: false,
  durationSec: 5.6,
  targetRmsDbfs: -29,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 5.35, .89, 2.12, 1520, .021, .9],
      ["brush", "air", 1.6, 3.7, .17, 570, .19],
    ]);
  },
} satisfies SoundRecipe;
