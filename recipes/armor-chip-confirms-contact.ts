import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import energyCellSeating from './_recordings/energy-cell-seating.ts';
import responseMicroclick from './_recordings/response-microclick.ts';

export default {
  id: 'armor-chip-confirms-contact', name: "Armor chip confirms contact", category: 'Sci-Fi & UI',
  tags: ["ui", "combat", "hit", "confirm", "impact"],
  loopable: false, durationSec: 0.131, mixRole: 'interface', targetRmsDbfs: -25,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(energyCellSeating, responseMicroclick),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [energyCellSeating, 0.0, 0.081, 0.74, 1, 10500, 0, 0.001, 0.022],
      [responseMicroclick, 0.021, 0.044, 0.61, 1.22, 9200.0, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
