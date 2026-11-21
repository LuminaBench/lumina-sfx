import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/energy-cell-seating.ts';

export default {
  id: "drone-docked-charge-contact",
  name: "Drone Docked Charge Contact",
  category: "Sci-Fi & UI",
  tags: ["drone", "docked", "charge", "contact"],
  loopable: false,
  durationSec: 0.92,
  targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .47, .61, .019, 8000],
      ["contact", "iron", .089, .17, .56, 713, .001],
      ["contact", "iron", .224, .18, .61, 514, .002],
      ["tone", .267, .49, .37, 201, 278, .036, .36],
    ]);
  },
} satisfies SoundRecipe;
