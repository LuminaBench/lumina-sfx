import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-ratchet.ts';

export default {
  id: "desktop-printer-paper-exits-tray",
  name: "Desktop Printer Paper Exits Tray",
  category: "Props & Interactions",
  tags: ["desktop", "printer", "paper", "exits", "tray"],
  loopable: false,
  durationSec: 1.04,
  targetRmsDbfs: -24,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "foley",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.6, 0.65, 0.22, 4416.5, 0.007, 0.08],
      ["contact", "paper", 0.067, 0.29, 0.44, 312, 0.002],
      ["grains", "paper", 0.107, 0.51, 0.22, 800, 8],
      ["contact", "wood", 0.525, 0.3, 0.39, 264, 0.002],
    ]);
  },
} satisfies SoundRecipe;
