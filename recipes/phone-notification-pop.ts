import type { SoundRecipe } from '../engine/types.ts';
import { beeps } from './_shared/alerts.ts';

export default {
  id: "phone-notification-pop", name: "Phone Notification Pop", category: "Footsteps & UI",
  tags: ["phone","notification","message","chime"], loopable: false, durationSec: 0.43,
  params: { color: { label: "Color", min: 0, max: 1, default: 0.58 } },
  targetRmsDbfs: -23,
  render(ctx, { params }) {
    return beeps(ctx, [[0, 835, 0.062, 0.91], [0.073, 1257, 0.139, 1]], params.color, 'soft');
  },
} satisfies SoundRecipe;
