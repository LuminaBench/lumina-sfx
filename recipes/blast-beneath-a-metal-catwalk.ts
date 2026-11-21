import { mix } from '../engine/dsp.ts';
import { destruction } from './_shared/destruction-effects.ts';
import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/chain-rattle-short.ts';

export default {
  id: "blast-beneath-a-metal-catwalk",
  name: "Blast Beneath a Metal Catwalk",
  category: "Impacts",
  tags: ["blast", "beneath", "catwalk"],
  loopable: false,
  durationSec: 1.89,
  targetRmsDbfs: -20,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = destruction(ctx, {
      cracks: [
        { at: 0, width: .019, weight: .92, bite: .63, bloom: .125 },
        { at: .14, width: .008, weight: .43, bite: .69, bloom: .083 },
      ], debris: "steel", debrisAt: .103, debrisSpan: 1.55, fragments: 25, space: "room", color: 5400,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, .095, .65, .32, .055, 8500],
      ["grains", "iron", .17, 1.49, .28, 890, 17],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
