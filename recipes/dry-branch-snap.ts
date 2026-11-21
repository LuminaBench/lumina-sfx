import { renderRecording } from "../engine/recording.ts";
import recording from "./_recordings/dry-branch-snap.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "dry-branch-snap", name: "Dry Branch Snap", category: "Impacts",
  tags: ["wood", "branch", "snap", "twig", "crack"],
  loopable: false, durationSec: 0.47, targetRmsDbfs: -24,
  params: { pace: { label: "Pace", min: 0, max: 1, default: 0.54 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.97 + params.pace * 0.078, cutoffHz: 13400 });
  },
} satisfies SoundRecipe;
