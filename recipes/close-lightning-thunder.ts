import type { SoundRecipe } from '../engine/types.ts';
import { thunderChannel } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-thunder-left.ts';
import wash from './_recordings/atlas-thunder-right.ts';
import detail from './_recordings/atlas-thunder-roll.ts';

const path = { space: "open", cutoff: 7900, rolls: [0.009, 0.23, 0.8, 2.14, 4.2], decay: 3.3, width: 0.19 } as const;

export default {
  id: "close-lightning-thunder", name: "Close Lightning & Thunder", category: "Weather & Ambience",
  tags: ["thunder", "lightning", "storm", "stereo", "open"], loopable: false, durationSec: 8.25,
  mixRole: "impact", targetRmsDbfs: -20,
  params: { distance: { label: "Distance", min: 0, max: 1, default: 0.27 } },
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
