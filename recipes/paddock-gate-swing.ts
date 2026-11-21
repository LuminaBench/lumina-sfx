import { renderRecording } from '../engine/recording.ts';
import type { SoundRecipe } from '../engine/types.ts';
import recording from './_recordings/paddock-gate-swing.ts';

export default {
  id: "paddock-gate-swing", name: "Paddock Gate Swing", category: "Farming",
  tags: ["gate", "paddock", "wood", "hinge", "swing"],
  durationSec: 1.8325, loopable: false, targetRmsDbfs: -23,
  params: { distance: { label: 'Distance', min: 0, max: 1, default: 0.05 } },
  recording: recording.credit,
  render(ctx, { seed, params }) {
    return renderRecording(ctx, recording, { seed, cutoffHz: 9300 - params.distance * 5766 });
  },
} satisfies SoundRecipe;
