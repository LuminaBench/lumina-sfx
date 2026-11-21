import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-ratchet.ts';

export default {
  id: "desktop-printer-paper-feed-engagement",
  name: "Desktop Printer Paper Feed Engagement",
  category: "Props & Interactions",
  tags: ["desktop", "printer", "paper", "feed", "engagement"],
  loopable: false,
  durationSec: 1.43,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 0.7, 0.81, 0.014, 6050, 0.007, 0.08],
      ["brush", "paper", 0.07, 0.57, 0.25, 672, 0.032],
      ["contact", "paper", 0.22, 0.23, 0.38, 400, 0.002],
    ]);
  },
} satisfies SoundRecipe;
