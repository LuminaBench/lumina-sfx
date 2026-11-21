import { renderRecording } from "../engine/recording.ts";
import recording from "./_recordings/staff-sweep.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "staff-sweep", name: "Bamboo Staff Sweep", category: "Impacts",
  tags: ["staff", "bamboo", "swoosh", "whoosh", "melee"],
  loopable: false, durationSec: 0.41, targetRmsDbfs: -23,
  params: { pace: { label: "Pace", min: 0, max: 1, default: 0.54 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.94 + params.pace * 0.123, cutoffHz: 12600 });
  },
} satisfies SoundRecipe;
