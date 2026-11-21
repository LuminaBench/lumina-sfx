import { renderRecording } from "../engine/recording.ts";
import recording from "./_recordings/jar-shatter-on-tile.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "jar-shatter-on-tile", name: "Jar Shatter on Tile", category: "Impacts",
  tags: ["glass", "jar", "shatter", "tile", "smash"],
  loopable: false, durationSec: 1.16, targetRmsDbfs: -22,
  params: { pace: { label: "Pace", min: 0, max: 1, default: 0.54 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.97 + params.pace * 0.065, cutoffHz: 14800 });
  },
} satisfies SoundRecipe;
