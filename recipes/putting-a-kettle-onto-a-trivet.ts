import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-heavy-hatch.ts';
import source2 from './_recordings/blacksmith-anvil-strike.ts';

export default {
  id: "putting-a-kettle-onto-a-trivet",
  name: "Putting a Kettle onto a Trivet",
  category: "Props & Interactions",
  tags: ["putting", "kettle", "trivet"],
  loopable: false,
  durationSec: 0.76,
  targetRmsDbfs: -22,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .50, .72, .39, 9000],
      ['clip', source2, .074, .42, .23, .046, 7400],
      ["contact", "iron", .136, .31, .30, 290, .001],
    ]);
  },
} satisfies SoundRecipe;
