import { scene, sceneCredits } from './_shared/material-scenes.ts';
import type { SoundRecipe } from '../engine/types.ts';
import source from './_recordings/response-rocker.ts';
import source2 from './_recordings/response-button.ts';

export default {
  id: "arcade-kill-confirm-ratchet-double-click",
  name: "Arcade kill confirm ratchet double click",
  category: "Footsteps & UI",
  tags: ["arcade", "kill", "confirm", "ratchet", "double", "click", "event", "combat", "feedback", "kill-confirm", "elimination"],
  loopable: false,
  durationSec: 0.259,
  targetRmsDbfs: -23.5,
  params: { intensity: { label: 'Intensity', min: 0, max: 1, default: 0.55 } },
  mixRole: "interface",
  ...sceneCredits(source, source2),
  render(ctx, { params, seed }) {
    return scene(ctx, seed, params.intensity, [
      ['clip', source, 0, .095, .65, 0, 7900, .001, .024],
      ["contact", "iron", 0, .078, .62, 1350, .00065],
      ["contact", "rubber", .037, .10, .71, 218, .0012],
      ['clip', source2, .085, .091, .57, 0, 10700, .001, .022],
      ["contact", "iron", .112, .077, .39, 950, .0008],
    ]);
  },
} satisfies SoundRecipe;
