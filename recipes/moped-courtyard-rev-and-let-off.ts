import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-moped-street.ts';

export default {
  id: "moped-courtyard-rev-and-let-off",
  name: "Moped courtyard rev and let-off",
  category: "Vehicles & Engines",
  tags: ["moped", "courtyard", "rev", "let", "vehicle"],
  loopable: false,
  durationSec: 4.25,
  targetRmsDbfs: -24.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "vehicle",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 4.25, .86, .68, 7700, .008, .33],
      ["contact", "iron", 0, .061, .10, 548, .002],
    ]);
  },
} satisfies SoundRecipe;
