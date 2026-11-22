import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-response-rocker.ts';

export default editorContact(
  "editing-keypad-release", "Editing keypad release",
  ["device", "launch", "video", "editing", "controller", "macro", "pad", "lift", "up"], 0.096, attack,
  {"bodyHz": 365, "decayMs": 14, "cutoffHz": 5600, "snap": 1.13, "rattle": 0.053},
  [
    {"at": 0, "weight": 0.61, "pitch": 1.16, "release": true}
  ],
);
