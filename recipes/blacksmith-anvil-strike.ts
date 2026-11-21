import { renderRecording } from "../engine/recording.ts";
import recording from "./_recordings/blacksmith-anvil-strike.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "blacksmith-anvil-strike", name: "Anvil-Style Forge Strike", category: "Impacts",
  tags: ["steel", "iron", "blacksmith", "forge", "clang"],
  loopable: false, durationSec: 0.52, targetRmsDbfs: -21,
  params: { pace: { label: "Pace", min: 0, max: 1, default: 0.54 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.98 + params.pace * 0.041, cutoffHz: 14900 });
  },
} satisfies SoundRecipe;
