import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-ratchet.ts';

export default {
  id: "prop-launcher-empty-chamber-spring-release",
  name: "Prop launcher empty chamber spring release",
  category: "Weapons",
  tags: ["prop", "launcher", "empty", "chamber", "spring", "release", "reload", "mechanical", "weapon"],
  loopable: false,
  durationSec: 0.64,
  targetRmsDbfs: -28,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .53, .64, .05, 6300, .002, .114],
      ["contact", "iron", 0, .048, .52, 919, .0009],
      ["contact", "rubber", .34, .105, .71, 290, .0012],
      ["contact", "iron", .389, .135, .64, 650, .0013],
    ]);
  },
} satisfies SoundRecipe;
