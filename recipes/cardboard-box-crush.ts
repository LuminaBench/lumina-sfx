import { renderRecording } from "../engine/recording.ts";
import recording from "./_recordings/cardboard-box-crush.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "cardboard-box-crush", name: "Cardboard Box Crush", category: "Impacts",
  tags: ["cardboard", "box", "crush", "thud", "paper"],
  loopable: false, durationSec: 0.53, targetRmsDbfs: -23,
  params: { pace: { label: "Pace", min: 0, max: 1, default: 0.54 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.97 + params.pace * 0.072, cutoffHz: 12400 });
  },
} satisfies SoundRecipe;
