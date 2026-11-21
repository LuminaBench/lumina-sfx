import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-clank-close.ts';

export default {
  id: "armored-target-defeated-panel-latch",
  name: "Armored target defeated panel latch",
  category: "Footsteps & UI",
  tags: ["armored", "target", "defeated", "panel", "latch", "event", "combat", "feedback", "kill-confirm", "elimination", "kill"],
  loopable: false,
  durationSec: 0.309,
  targetRmsDbfs: -22.8,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .28, .53, .014, 7350, .001, .042],
      ["contact", "iron", 0, .196, .74, 288, .001],
      ["contact", "iron", .086, .151, .63, 516, .0012],
      ["tone", .098, .16, .18, 117, 77, .002, .33],
    ]);
  },
} satisfies SoundRecipe;
