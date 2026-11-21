import { mix } from '../engine/dsp.ts';
import { atmosphere, scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/milestone-smallwater.ts';

export default {
  id: "glass-fiber-hull-idling-against-chop-loop",
  name: "Glass-fiber hull idling against chop loop",
  category: "Water & Fire",
  tags: ["glass", "fiber", "hull", "idling", "against", "chop", "boat", "marine"],
  loopable: true,
  durationSec: 5.2,
  targetRmsDbfs: -32,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "ambience",
  ...sceneCredits(source),
  render(ctx, { params, seed }) {
    const bed = atmosphere(ctx, {
      body: 168, edge: 1720, drift: .29, density: 12, material: "water", texture: .52,
    }, params.intensity);
    const detail = scene(ctx, seed, params.intensity, [
      ['clip', source, 0, 5.32, .71, .24, 4400, 0, 0],
      ["contact", "water", .72, .28, .33, 173, .007],
      ["contact", "water", 3.12, .24, .41, 212, .007],
    ]);
    mix(bed, detail);
    return bed;
  },
} satisfies SoundRecipe;
