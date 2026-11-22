import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/spade-wet-mud.ts';
import source2 from './_recordings/field-garden-release.ts';
import source3 from './_recordings/shake-soil-off-roots.ts';

export default {
  id: "lifting-a-beet-from-packed-clay",
  name: "Lifting a Beet from Packed Clay",
  category: "Farming",
  tags: ["lifting", "beet", "packed", "clay", "farm"],
  loopable: false,
  durationSec: 0.76,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2, source3),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .50, .53, .03, 6200],
      ['clip', source2, .15, .46, .7, .107, 8600],
      ["contact", "soil", .24, .16, .21, 280, .0018],
      ['clip', source3, .31, .33, .29, .03, 7600],
    ]);
  },
} satisfies SoundRecipe;
