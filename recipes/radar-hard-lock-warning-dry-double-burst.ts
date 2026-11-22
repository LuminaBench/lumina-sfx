import type { SoundRecipe } from '../engine/types.ts';
import { radarSignal } from './_shared/flight-alert.ts';
export default {
  id: 'radar-hard-lock-warning-dry-double-burst', name: 'Radar hard lock warning dry double burst', category: 'Sci-Fi & UI', mixRole: 'interface',
  isolation: 'isolated', tags: ["radar", "dogfight", "alert", "lock", "warning", "hard", "lock", "dry", "double", "burst", "alarm"], loopable: false, durationSec: 0.63, targetRmsDbfs: -25,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: .55 } },

  render(ctx, {params}) { return radarSignal(ctx, 'lock', params.intensity); },
} satisfies SoundRecipe;
