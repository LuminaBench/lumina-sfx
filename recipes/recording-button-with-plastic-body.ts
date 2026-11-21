import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/physical-light-switch.ts';

export default {
  id: "recording-button-with-plastic-body",
  name: "Recording Button with Plastic Body",
  category: "Props & Interactions",
  tags: ["recording", "button", "plastic", "body"],
  loopable: false,
  durationSec: 0.44,
  targetRmsDbfs: -29,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .13, .76, 0, 10900],
      ["contact", "rubber", .015, .27, .55, 457, .002],
    ]);
  },
} satisfies SoundRecipe;
