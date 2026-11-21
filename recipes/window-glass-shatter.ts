import { renderRecording } from "../engine/recording.ts";
import recording from "./_recordings/window-glass-shatter.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "window-glass-shatter", name: "Window Glass Shatter", category: "Impacts",
  tags: ["glass", "window", "shatter", "debris", "crash"],
  loopable: false, durationSec: 1.05, targetRmsDbfs: -21,
  params: { pace: { label: "Pace", min: 0, max: 1, default: 0.54 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.97 + params.pace * 0.068, cutoffHz: 14750 });
  },
} satisfies SoundRecipe;
