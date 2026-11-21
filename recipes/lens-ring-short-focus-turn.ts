import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/field-jar-turn.ts';
import source2 from './_recordings/demo-film-wind.ts';

export default {
  id: "lens-ring-short-focus-turn",
  name: "Lens Ring Short Focus Turn",
  category: "Props & Interactions",
  tags: ["lens", "ring", "short", "focus", "turn"],
  loopable: false,
  durationSec: 0.67,
  targetRmsDbfs: -29,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .52, .52, .19, 5200],
      ['clip', source2, .08, .48, .54, .15, 7200],
      ["contact", "rubber", .39, .17, .22, 380, .003],
    ]);
  },
} satisfies SoundRecipe;
