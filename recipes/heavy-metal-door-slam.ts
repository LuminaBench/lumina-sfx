import { renderRecording } from "../engine/recording.ts";
import recording from "./_recordings/heavy-metal-door-slam.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "heavy-metal-door-slam", name: "Heavy Metal Door Slam", category: "Impacts",
  tags: ["door", "heavy", "close", "slam", "steel", "bang"],
  loopable: false, durationSec: 1.02, targetRmsDbfs: -21,
  params: { pace: { label: "Pace", min: 0, max: 1, default: 0.54 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.98 + params.pace * 0.046, cutoffHz: 12600 });
  },
} satisfies SoundRecipe;
