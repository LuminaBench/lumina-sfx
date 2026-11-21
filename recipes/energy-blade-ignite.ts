import type { SoundRecipe } from '../engine/types.ts';
import { bladeIgnition } from './_shared/scifi.ts';

export default {
  id: "energy-blade-ignite", name: "Energy Blade Ignition", category: 'Sci-Fi & UI',
  tags: ["sci-fi","energy-blade","ignition","power-on"], loopable: false, durationSec: 0.86,
  params: { tone: { label: "Tone", min: 0, max: 1, default: 0.57 } },
  targetRmsDbfs: -20,
  render(ctx, { params }) {
    return bladeIgnition(ctx, params.tone);
  },
} satisfies SoundRecipe;
