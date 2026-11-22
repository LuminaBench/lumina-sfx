import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-key-office.ts';

export default editorContact(
  "laptop-scissor-keyboard-backspace-pair", "Laptop scissor keyboard two backspaces",
  ["keyboard", "key", "launch", "video", "normal", "notebook", "low-profile", "delete", "double", "correction"], 0.285, attack,
  {"bodyHz": 1050, "decayMs": 5, "cutoffHz": 6700, "snap": 1.25, "rattle": 0.016},
  [
    {"at": 0, "weight": 0.98, "pitch": 0.9},
    {"at": 0.061, "weight": 0.26, "pitch": 1.15, "release": true},
    {"at": 0.162, "weight": 0.86, "pitch": 0.93},
    {"at": 0.218, "weight": 0.24, "pitch": 1.12, "release": true}
  ],
);
