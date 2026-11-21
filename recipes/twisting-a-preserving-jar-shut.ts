import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-jar-turn.ts';
import source2 from './_recordings/field-jar-contact.ts';

export default {
  id: "twisting-a-preserving-jar-shut",
  name: "Twisting a Preserving Jar Shut",
  category: "Props & Interactions",
  tags: ["twisting", "preserving", "jar", "shut"],
  loopable: false,
  durationSec: 1.01,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .86, .87, .006, 9600],
      ['clip', source2, .47, .37, .28, .095, 11900],
      ["contact", "iron", .66, .16, .18, 970, .001],
    ]);
  },
} satisfies SoundRecipe;
