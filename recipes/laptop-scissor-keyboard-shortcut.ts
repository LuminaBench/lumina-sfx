import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-milestone-key-single.ts';

export default editorContact(
  "laptop-scissor-keyboard-shortcut", "Laptop scissor keyboard modifier and shortcut",
  ["keyboard", "key", "launch", "video", "normal", "notebook", "low-profile", "chord", "hotkey", "shortcut"], 0.278, attack,
  {"bodyHz": 1050, "decayMs": 5, "cutoffHz": 6700, "snap": 1.25, "rattle": 0.016},
  [
    {"at": 0, "weight": 0.64, "pitch": 0.76},
    {"at": 0.084, "weight": 1, "pitch": 1.12},
    {"at": 0.177, "weight": 0.26, "pitch": 1.1, "release": true},
    {"at": 0.211, "weight": 0.3, "pitch": 0.83, "release": true}
  ],
);
