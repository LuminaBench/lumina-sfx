import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/car-crash-metal-glass.ts';

export default {
  id: "car-crash-metal-glass", name: "Car Crash · Metal & Glass", category: "Vehicles & Engines",
  tags: ["car","crash","collision","glass","vehicle"], loopable: false, durationSec: 2.38,
  params: { glass: { label: "Glass", min: 0, max: 1, default: 0.72 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 7650 + params.glass * 6600 });
  },
} satisfies SoundRecipe;
