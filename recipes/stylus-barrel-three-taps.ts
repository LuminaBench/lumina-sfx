import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-response-button.ts';

export default editorContact(
  "stylus-barrel-three-taps", "Stylus barrel button three deliberate taps",
  ["device", "launch", "video", "pen", "tablet", "stylus", "triple", "repeat"], 0.39, attack,
  {"bodyHz": 1120, "decayMs": 5, "cutoffHz": 7800, "snap": 0.89, "rattle": 0.033},
  [
    {"at": 0, "weight": 0.8, "pitch": 1.03},
    {"at": 0.137, "weight": 1, "pitch": 0.96},
    {"at": 0.323, "weight": 0.89, "pitch": 1.06}
  ],
);
