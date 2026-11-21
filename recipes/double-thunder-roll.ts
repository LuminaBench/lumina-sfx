import type { SoundRecipe } from '../engine/types.ts';
import { thunderPass } from './_shared/weather-textures.ts';

export default {
  id: "double-thunder-roll", name: "Double Thunder Roll", category: 'Weather & Ambience',
  tags: ["thunder","lightning","double","storm"], loopable: false, durationSec: 8.8,
  params: { distance: { label: "Distance", min: 0, max: 1, default: 0.38 } },
  spectrum: [{ band: 'sub', minShare: 0.34 }],
  render(ctx, { params }) {
    return thunderPass(ctx, 0.15 + params.distance * 0.58, true);
  },
} satisfies SoundRecipe;
