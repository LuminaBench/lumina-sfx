import { renderRecording } from "../engine/recording.ts";
import recording from "./_recordings/light-blade-swish.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  perspective: "close pass", contains: ["short recorded blade air movement"], markers: {"pass": 0.01},
  id: "light-blade-swish", name: "Light Blade Swish", category: "Impacts",
  tags: ["blade", "swish", "whoosh", "melee", "motion"],
  loopable: false, durationSec: 0.34, targetRmsDbfs: -23,
  params: { pace: { label: "Pace", min: 0, max: 1, default: 0.54 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.95 + params.pace * 0.111, cutoffHz: 12100 });
  },
} satisfies SoundRecipe;
