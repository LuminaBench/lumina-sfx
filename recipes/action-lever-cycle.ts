import { mix } from "../engine/dsp.ts";
import { renderRecording } from "../engine/recording.ts";
import { arenaMechanism } from "./_shared/arena-reports.ts";
import recording from "./_recordings/action-lever-cycle.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "action-lever-cycle", name: "Action Lever Cycle", category: "Weapons",
  tags: ["game", "mechanical", "lever", "cycle", "foley", "clack"],
  loopable: false, durationSec: 0.5, targetRmsDbfs: -23,
  recording: recording.credit,
  params: { firmness: { label: "Firmness", min: 0, max: 1, default: 0.56 } },
  render(ctx, { seed, params }) {
    const signal = renderRecording(ctx, recording, { seed, speed: 0.96 + params.firmness * 0.09, cutoffHz: 12000 });
    const stop = arenaMechanism(ctx, {
      snaps: [[0, 515, 3690, 0.009, 0.47], [0.168, 800, 4960, 0.0074, 0.53]],
      slide: [0.026, 0.125, 941, 0.29],
    }, params.firmness);
    mix(signal, stop, 0.32);
    return signal;
  },
} satisfies SoundRecipe;
