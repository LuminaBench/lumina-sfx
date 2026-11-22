import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-response-rocker.ts';

export default editorContact(
  "editing-keypad-press-and-hold", "Editing keypad press, hold and release",
  ["device", "launch", "video", "editing", "controller", "macro", "pad", "hold", "drag", "drop"], 0.586, attack,
  {"bodyHz": 365, "decayMs": 14, "cutoffHz": 5600, "snap": 1.13, "rattle": 0.053},
  [
    {"at": 0, "weight": 1, "pitch": 0.91},
    {"at": 0.49, "weight": 0.55, "pitch": 1.12, "release": true}
  ],
);
