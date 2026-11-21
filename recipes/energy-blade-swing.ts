import type { SoundRecipe } from '../engine/types.ts';
import { bladeSwing } from './_shared/scifi.ts';

export default {
  id: "energy-blade-swing", name: "Energy Blade Swing", category: 'Sci-Fi & UI',
  tags: ["sci-fi","energy-blade","swing","whoosh"], loopable: false, durationSec: 0.66,
  params: { speed: { label: "Speed", min: 0, max: 1, default: 0.65 } },
  targetRmsDbfs: -20,
  render(ctx, { params }) {
    return bladeSwing(ctx, params.speed);
  },
} satisfies SoundRecipe;
