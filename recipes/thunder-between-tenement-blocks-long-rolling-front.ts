import type { SoundRecipe } from '../engine/types.ts';
import { thunderChannel } from './_shared/weather-field.ts';
import { sceneCredits } from './_shared/material-scenes.ts';
import source from './_recordings/atlas-thunder-left.ts';
import wash from './_recordings/atlas-thunder-right.ts';
import detail from './_recordings/atlas-thunder-roll.ts';

const path = { space: "passage", cutoff: 2016, rolls: [0.011, 0.621, 1.469, 2.78, 4.317], decay: 3.21, width: 0.14 } as const;

export default {
  id: "thunder-between-tenement-blocks-long-rolling-front", name: "Thunder between tenement blocks — long rolling front", category: "Weather & Ambience",
  tags: ["thunder", "lightning", "storm", "stereo", "passage"], loopable: false, durationSec: 8.31,
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
