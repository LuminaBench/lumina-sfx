import type { SoundRecipe } from '../engine/types.ts';
import { perform, performanceCredits } from './_shared/field-performance.ts';
import responseMicroclick from './_recordings/response-microclick.ts';
import cardboardPackageOpen from './_recordings/cardboard-package-open.ts';

export default {
  id: 'blueprint-pin-pulled-free', name: "Blueprint pin pulled free", category: 'Sci-Fi & UI',
  tags: ["ui", "crafting", "unpin", "blueprint"],
  loopable: false, durationSec: 0.18, mixRole: 'interface', targetRmsDbfs: -28,
  params: { pressure: { label: 'Pressure', min: 0, max: 1, default: 0.52 } },
  ...performanceCredits(responseMicroclick, cardboardPackageOpen),
  render(ctx, { seed, params }) {
    return perform(ctx, seed, params.pressure, [
      [responseMicroclick, 0.0, 0.044, 0.68, 1, 10500, 0, 0.001, 0.022],
      [cardboardPackageOpen, 0.023, 0.107, 0.24, 1.17, 5200.0, 0, 0.001, 0.022],
    ]);
  },
} satisfies SoundRecipe;
