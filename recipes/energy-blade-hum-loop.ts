import type { SoundRecipe } from '../engine/types.ts';
import { bladeHum } from './_shared/scifi.ts';

export default {
  id: "energy-blade-hum-loop", name: "Energy Blade Hum", category: 'Sci-Fi & UI',
  tags: ["sci-fi","energy-blade","hum","loop"], loopable: true, durationSec: 6.4,
  params: { edge: { label: "Edge", min: 0, max: 1, default: 0.65 } },
  targetRmsDbfs: -24,
  render(ctx, { params }) {
    return bladeHum(ctx, 6.4, params.edge);
  },
} satisfies SoundRecipe;
