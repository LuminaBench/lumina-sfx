import { renderRecording } from "../engine/recording.ts";
import recording from "./_recordings/wooden-crate-smash.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "wooden-crate-smash", name: "Wooden Crate Smash", category: "Impacts",
  tags: ["wood", "crate", "smash", "splinter", "debris"],
  loopable: false, durationSec: 0.74, targetRmsDbfs: -20,
  params: { pace: { label: "Pace", min: 0, max: 1, default: 0.54 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.96 + params.pace * 0.078, cutoffHz: 14300 });
  },
} satisfies SoundRecipe;
