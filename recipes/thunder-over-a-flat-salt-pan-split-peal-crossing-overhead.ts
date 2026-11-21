import type { SoundRecipe } from '../engine/types.ts';
import { thunderChannel } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-thunder-left.ts';
import wash from './_recordings/atlas-thunder-right.ts';
import detail from './_recordings/atlas-thunder-roll.ts';

const path = { space: "open", cutoff: 4960, rolls: [0.015, 0.6, 1.013, 2.475, 3.812], decay: 2.7, width: 0.13 } as const;

export default {
  id: "thunder-over-a-flat-salt-pan-split-peal-crossing-overhead", name: "Thunder over a flat salt pan — split peal crossing overhead", category: "Weather & Ambience",
  tags: ["thunder", "lightning", "storm", "stereo", "open"], loopable: false, durationSec: 7.29,
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
