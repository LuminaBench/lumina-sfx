import { renderRecording } from "../engine/recording.ts";
import recording from "./_recordings/room-door-slam.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "room-door-slam", name: "Room Door Slam", category: "Impacts",
  tags: ["door", "room", "shut", "slam", "indoors"],
  loopable: false, durationSec: 0.86, targetRmsDbfs: -23,
  params: { pace: { label: "Pace", min: 0, max: 1, default: 0.54 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.98 + params.pace * 0.044, cutoffHz: 11400 });
  },
} satisfies SoundRecipe;
