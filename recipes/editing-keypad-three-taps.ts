import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-response-rocker.ts';

export default editorContact(
  "editing-keypad-three-taps", "Editing keypad three deliberate taps",
  ["device", "launch", "video", "editing", "controller", "macro", "pad", "triple", "repeat"], 0.419, attack,
  {"bodyHz": 365, "decayMs": 14, "cutoffHz": 5600, "snap": 1.13, "rattle": 0.053},
  [
    {"at": 0, "weight": 0.8, "pitch": 1.03},
    {"at": 0.137, "weight": 1, "pitch": 0.96},
    {"at": 0.323, "weight": 0.89, "pitch": 1.06}
  ],
);
