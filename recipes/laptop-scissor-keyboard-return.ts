import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-key-office.ts';

export default editorContact(
  "laptop-scissor-keyboard-return", "Laptop scissor keyboard Return key",
  ["keyboard", "key", "launch", "video", "normal", "notebook", "low-profile", "enter", "submit"], 0.14, attack,
  {"bodyHz": 1050, "decayMs": 5, "cutoffHz": 6700, "snap": 1.25, "rattle": 0.016},
  [
    {"at": 0, "weight": 1, "pitch": 0.78},
    {"at": 0.073, "weight": 0.34, "pitch": 0.94, "release": true}
  ],
);
