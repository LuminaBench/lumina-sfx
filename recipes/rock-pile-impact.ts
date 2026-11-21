import { renderRecording } from "../engine/recording.ts";
import recording from "./_recordings/rock-pile-impact.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "rock-pile-impact", name: "Rock Pile Impact", category: "Impacts",
  tags: ["rock", "stone", "impact", "rubble", "gravel"],
  loopable: false, durationSec: 0.61, targetRmsDbfs: -22,
  params: { pace: { label: "Pace", min: 0, max: 1, default: 0.54 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.96 + params.pace * 0.084, cutoffHz: 13800 });
  },
} satisfies SoundRecipe;
