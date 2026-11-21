import { mix } from "../engine/dsp.ts";
import { renderRecording } from "../engine/recording.ts";
import { arenaMechanism } from "./_shared/arena-reports.ts";
import recording from "./_recordings/energy-cell-seating.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "energy-cell-seating", name: "Energy Cell Seating", category: "Weapons",
  tags: ["game", "mechanical", "cell", "latch", "insertion", "scifi"],
  loopable: false, durationSec: 0.3, targetRmsDbfs: -23,
  recording: recording.credit,
  params: { firmness: { label: "Firmness", min: 0, max: 1, default: 0.56 } },
  render(ctx, { seed, params }) {
    const signal = renderRecording(ctx, recording, { seed, speed: 0.93 + params.firmness * 0.16, cutoffHz: 12800 });
    const latch = arenaMechanism(ctx, {
      snaps: [[0.023, 610, 3620, 0.006, 0.63], [0.041, 960, 5600, 0.008, 0.71]],
    }, params.firmness);
    mix(signal, latch, 0.31);
    return signal;
  },
} satisfies SoundRecipe;
