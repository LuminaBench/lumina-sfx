import type { SoundRecipe } from '../engine/types.ts';
import { thunderPass } from './_shared/weather-textures.ts';

export default {
  id: "distant-rolling-thunder", name: "Distant Rolling Thunder", category: 'Weather & Ambience',
  tags: ["thunder","storm","distant","rumble"], loopable: false, durationSec: 7.8,
  params: { distance: { label: "Distance", min: 0, max: 1, default: 0.66 } },
  spectrum: [{ band: 'sub', minShare: 0.34 }],
  render(ctx, { params }) {
    return thunderPass(ctx, 0.62 + params.distance * 0.28, false);
  },
} satisfies SoundRecipe;
