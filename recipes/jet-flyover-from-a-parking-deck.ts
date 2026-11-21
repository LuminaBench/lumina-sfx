import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-plane-overhead.ts';
import source2 from './_recordings/demo-jet-pass.ts';

export default {
  id: "jet-flyover-from-a-parking-deck",
  name: "Jet Flyover from a Parking Deck",
  category: "Aircraft",
  tags: ["jet", "flyover", "parking", "deck"],
  loopable: false,
  durationSec: 7.6,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 7.325, .89, .018, 5200, .015, .29],
      ['clip', source2, 1.78, 3.7, .22, .38, 7600, .82, .9],
    ]);
  },
} satisfies SoundRecipe;
