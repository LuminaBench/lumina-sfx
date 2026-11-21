import { renderRecording } from "../engine/recording.ts";
import recording from "./_recordings/urgent-door-knock.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "urgent-door-knock", name: "Urgent Door Knock", category: "Impacts",
  tags: ["door", "knock", "urgent", "interior", "wood"],
  loopable: false, durationSec: 0.57, targetRmsDbfs: -23,
  params: { pace: { label: "Pace", min: 0, max: 1, default: 0.54 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.96 + params.pace * 0.090, cutoffHz: 10100 });
  },
} satisfies SoundRecipe;
