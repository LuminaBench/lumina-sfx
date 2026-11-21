import { reverb } from '../engine/dsp.ts';
import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/glass-wall-collapse.ts';

export default {
  id: "glass-wall-collapse", name: "Glass Wall Collapse", category: "Impacts",
  tags: ["collapse", "glass", "break", "shards"],
  loopable: false, durationSec: 1.45, targetRmsDbfs: -20,
  params: { weight: { label: "Weight", min: 0, max: 1, default: 0.55 } },
  recording: recording.credit,
  spectrum: [{ band: 'high', minShare: 0.065 }],
  render(ctx, { params }) {
    const shards = renderRecording(ctx, recording, { cutoffHz: 12800 - params.weight * 1700 });
    return reverb(shards, ctx.sampleRate, 'room', 0.14 + params.weight * 0.11);
  },
} satisfies SoundRecipe;
