import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-milestone-key-single.ts';

export default editorContact(
  "chiclet-keyboard-backspace-pair", "Compact chiclet keyboard two backspaces",
  ["keyboard", "key", "launch", "video", "normal", "slim", "low-profile", "delete", "double", "correction"], 0.285, attack,
  {"bodyHz": 860, "decayMs": 6, "cutoffHz": 5400, "snap": 1.12, "rattle": 0.012},
  [
    {"at": 0, "weight": 0.98, "pitch": 0.9},
    {"at": 0.061, "weight": 0.26, "pitch": 1.15, "release": true},
    {"at": 0.162, "weight": 0.86, "pitch": 0.93},
    {"at": 0.218, "weight": 0.24, "pitch": 1.12, "release": true}
  ],
);
