import type { SoundRecipe } from '../engine/types.ts';
import { vibration } from './_shared/alerts.ts';

export default {
  id: "phone-vibration-table", name: "Phone Vibration on Table", category: "Footsteps & UI",
  tags: ["phone","vibration","buzz","haptic"], loopable: false, durationSec: 1.02,
  params: { weight: { label: "Weight", min: 0, max: 1, default: 0.68 } },
  targetRmsDbfs: -25,
  render(ctx, { params }) {
    return vibration(ctx, params.weight);
  },
} satisfies SoundRecipe;
