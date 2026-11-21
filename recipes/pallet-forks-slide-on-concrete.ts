import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-chain-scrape.ts';

export default {
  id: "pallet-forks-slide-on-concrete",
  name: "Pallet forks slide on concrete",
  category: "Vehicles & Engines",
  tags: ["pallet", "forks", "slide", "concrete", "vehicle"],
  loopable: false,
  durationSec: 1.25,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 1.13, .54, .33, 3920, .004, .14],
      ["brush", "stone", 0, 1.03, .4, 720, .004],
      ["contact", "iron", 1.015, .17, .55, 414, .0017],
    ]);
  },
} satisfies SoundRecipe;
