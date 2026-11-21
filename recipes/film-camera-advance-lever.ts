import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/demo-film-wind.ts';

export default {
  id: "film-camera-advance-lever",
  name: "Film Camera Advance Lever",
  category: "Props & Interactions",
  tags: ["film", "camera", "advance", "lever"],
  loopable: false,
  durationSec: 0.84,
  targetRmsDbfs: -27,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .76, 1, .004, 12300],
    ]);
  },
} satisfies SoundRecipe;
