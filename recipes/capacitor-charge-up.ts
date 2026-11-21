import type { SoundRecipe } from '../engine/types.ts';
import { chargeUp } from './_shared/scifi.ts';

export default {
  id: "capacitor-charge-up", name: "Capacitor Charge-Up", category: 'Sci-Fi & UI',
  tags: ["sci-fi","charge","capacitor","power"], loopable: false, durationSec: 1.3,
  params: { edge: { label: "Edge", min: 0, max: 1, default: 0.62 } },
  targetRmsDbfs: -22,
  render(ctx, { params }) {
    return chargeUp(ctx, params.edge);
  },
} satisfies SoundRecipe;
