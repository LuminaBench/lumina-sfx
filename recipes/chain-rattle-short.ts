import { renderRecording } from "../engine/recording.ts";
import recording from "./_recordings/chain-rattle-short.ts";
import type { SoundRecipe } from "../engine/types.ts";

export default {
  id: "chain-rattle-short", name: "Short Chain Rattle", category: "Impacts",
  tags: ["chain", "rattle", "links", "steel", "foley"],
  loopable: false, durationSec: 0.99, targetRmsDbfs: -23,
  params: { pace: { label: "Pace", min: 0, max: 1, default: 0.54 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, speed: 0.98 + params.pace * 0.046, cutoffHz: 14400 });
  },
} satisfies SoundRecipe;
