import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/leather-strap-flex.ts';
import source2 from './_recordings/burlap-feed-sack-open.ts';

export default {
  id: "dry-rope-drawn-over-a-beam",
  name: "Dry Rope Drawn over a Beam",
  category: "Impacts",
  tags: ["dry", "rope", "drawn", "beam"],
  loopable: false,
  durationSec: 1.14,
  targetRmsDbfs: -26,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .71, .73, .012, 7500],
      ['clip', source2, .08, .76, .51, .011, 6400],
      ["brush", "wood", .42, .57, .34, 487, .085],
    ]);
  },
} satisfies SoundRecipe;
