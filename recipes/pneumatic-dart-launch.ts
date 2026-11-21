import { pneumaticReport } from "./_shared/arena-reports.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "pneumatic-dart-launch", name: "Pneumatic Dart Launch", category: "Weapons",
  tags: ["dart", "pneumatic", "hiss", "pop"],
  loopable: false, durationSec: 0.23, targetRmsDbfs: -22,
  params: { pop: { label: "Pop", min: 0, max: 1, default: 0.47 } },
  render(ctx, { params }) {
    return pneumaticReport(ctx, params.pop);
  },
} satisfies SoundRecipe;
