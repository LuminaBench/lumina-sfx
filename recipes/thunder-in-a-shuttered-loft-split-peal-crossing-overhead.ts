import type { SoundRecipe } from '../engine/types.ts';
import { thunderChannel } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-thunder-left.ts';
import wash from './_recordings/atlas-thunder-right.ts';
import detail from './_recordings/atlas-thunder-roll.ts';

const path = { space: "interior", cutoff: 1240, rolls: [0.01, 0.394, 0.664, 1.624, 2.501], decay: 2.7, width: 0.055 } as const;

export default {
  id: "thunder-in-a-shuttered-loft-split-peal-crossing-overhead", name: "Thunder in a shuttered loft — split peal crossing overhead", category: "Weather & Ambience",
  tags: ["thunder", "lightning", "storm", "stereo", "interior"], loopable: false, durationSec: 5.98,
  mixRole: "impact", targetRmsDbfs: -20,
  params: { distance: { label: "Distance", min: 0, max: 1, default: 0.39 } },
  ...sceneCredits(source, wash, detail),
  renderStereo(ctx, { seed, params }) {
    return [
      thunderChannel(ctx, seed, params.distance, path, source, detail, -1),
      thunderChannel(ctx, seed, params.distance, path, wash, detail, 1),
    ];
  },
  render(ctx, { seed, params }) {
    const left = thunderChannel(ctx, seed, params.distance, path, source, detail, -1);
    const right = thunderChannel(ctx, seed, params.distance, path, wash, detail, 1);
    return left.map((v, i) => .5 * (v + right[i]));
  },
} satisfies SoundRecipe;
