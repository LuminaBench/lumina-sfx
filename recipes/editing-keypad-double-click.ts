import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-response-rocker.ts';

export default editorContact(
  "editing-keypad-double-click", "Editing keypad double click",
  ["device", "launch", "video", "editing", "controller", "macro", "pad", "double", "selection"], 0.319, attack,
  {"bodyHz": 365, "decayMs": 14, "cutoffHz": 5600, "snap": 1.13, "rattle": 0.053},
  [
    {"at": 0, "weight": 1, "pitch": 1},
    {"at": 0.064, "weight": 0.27, "pitch": 1.1, "release": true},
    {"at": 0.158, "weight": 0.86, "pitch": 1.04},
    {"at": 0.223, "weight": 0.25, "pitch": 1.09, "release": true}
  ],
);
