import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-response-rocker.ts';

export default editorContact(
  "editing-keypad-press", "Editing keypad single press",
  ["device", "launch", "video", "editing", "controller", "macro", "pad", "single", "click", "down"], 0.096, attack,
  {"bodyHz": 365, "decayMs": 14, "cutoffHz": 5600, "snap": 1.13, "rattle": 0.053},
  [
    {"at": 0, "weight": 1, "pitch": 1}
  ],
);
