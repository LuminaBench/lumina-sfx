import { withImpactFoley } from './_shared/recorded-impact.ts';
import foley0 from './_recordings/atlas-firecracker.ts';
import foley1 from './_recordings/atlas-scrap.ts';
import { destruction } from "./_shared/destruction-effects.ts";
import type { SoundRecipe } from "../engine/types.ts";

const original = {
  id: "steel-drum-burst", name: "Steel Drum Burst", category: "Impacts",
  tags: ["explosion", "steel", "drum", "enclosure", "crash"],
  loopable: false, durationSec: 0.75, targetRmsDbfs: -18,
  params: { weight: { label: "Weight", min: 0, max: 1, default: 0.55 } },
  render(ctx, { params }) {
    return destruction(ctx, {
      cracks: [
        { at: 0, width: 0.01, weight: 1.02, bite: 1.38, bloom: 0.061 },
        { at: 0.042, width: 0.007, weight: 0.44, bite: 0.97, bloom: 0.05 },
      ],
      debris: "steel", debrisAt: 0.011, debrisSpan: 0.44, fragments: 17, space: "room",
    }, params.weight);
  },
} satisfies SoundRecipe;

export default withImpactFoley(original, [
  { clip: foley0, at: 0, span: 0.18, gain: 0.63, cutoff: 7900, speed: 0.77 },
  { clip: foley1, at: 0.034, span: 0.62, gain: 0.56, cutoff: 6700, speed: 0.85 },
]);
