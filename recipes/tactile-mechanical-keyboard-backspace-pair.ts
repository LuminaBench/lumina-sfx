import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-milestone-key-single.ts';

export default editorContact(
  "tactile-mechanical-keyboard-backspace-pair", "Tactile mechanical keyboard two backspaces",
  ["keyboard", "key", "launch", "video", "mechanical", "bump", "delete", "double", "correction"], 0.29, attack,
  {"bodyHz": 530, "decayMs": 10, "cutoffHz": 7500, "snap": 1.25, "rattle": 0.04},
  [
    {"at": 0, "weight": 0.98, "pitch": 0.9},
    {"at": 0.061, "weight": 0.26, "pitch": 1.15, "release": true},
    {"at": 0.162, "weight": 0.86, "pitch": 0.93},
    {"at": 0.218, "weight": 0.24, "pitch": 1.12, "release": true}
  ],
);
