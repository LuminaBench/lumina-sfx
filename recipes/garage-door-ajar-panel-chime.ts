import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-appliance-double.ts';
import source2 from './_recordings/response-button.ts';

export default {
  id: "garage-door-ajar-panel-chime",
  name: "Garage door ajar panel chime",
  category: "Sci-Fi & UI",
  tags: ["garage", "door", "ajar", "panel", "chime", "warning", "alert", "alarm"],
  loopable: false,
  durationSec: 0.85,
  targetRmsDbfs: -29,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .61, .78, .003, 2200, .002, .056],
      ['clip', source2, 0, .091, .34, 0, 5200, .001, .018],
      ["contact", "rubber", .62, .112, .38, 324, .0015],
    ]);
  },
} satisfies SoundRecipe;
