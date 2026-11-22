import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-milestone-key-single.ts';

export default editorContact(
  "office-membrane-keyboard-backspace-pair", "Office membrane keyboard two backspaces",
  ["keyboard", "key", "launch", "video", "normal", "desktop", "rubber", "dome", "delete", "double", "correction"], 0.285, attack,
  {"bodyHz": 325, "decayMs": 8, "cutoffHz": 3100, "snap": 0.7, "rattle": 0.01},
  [
    {"at": 0, "weight": 0.98, "pitch": 0.9},
    {"at": 0.061, "weight": 0.26, "pitch": 1.15, "release": true},
    {"at": 0.162, "weight": 0.86, "pitch": 0.93},
    {"at": 0.218, "weight": 0.24, "pitch": 1.12, "release": true}
  ],
);
