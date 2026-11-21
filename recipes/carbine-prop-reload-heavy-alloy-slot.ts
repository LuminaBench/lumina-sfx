import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/motion-clank-close.ts';
import source2 from './_recordings/response-rocker.ts';

export default {
  id: "carbine-prop-reload-heavy-alloy-slot",
  name: "Carbine prop reload heavy alloy slot",
  category: "Weapons",
  tags: ["carbine", "prop", "reload", "heavy", "alloy", "slot", "mechanical", "weapon"],
  loopable: false,
  durationSec: 0.85,
  targetRmsDbfs: -26.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "detail",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .29, .60, .008, 6100, .001, .078],
      ["brush", "iron", .092, .34, .68, 1450, .006],
      ["contact", "iron", .37, .23, .74, 331, .0016],
      ["contact", "iron", .599, .12, .68, 1390, .0009],
      ['clip', source2, .58, .10, .50, 0, 9200, .001, .025],
    ]);
  },
} satisfies SoundRecipe;
