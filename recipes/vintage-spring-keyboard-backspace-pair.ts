import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-milestone-key-single.ts';

export default editorContact(
  "vintage-spring-keyboard-backspace-pair", "Buckling-spring keyboard two backspaces",
  ["keyboard", "key", "launch", "video", "mechanical", "vintage", "spring", "delete", "double", "correction"], 0.362, attack,
  {"bodyHz": 455, "decayMs": 22, "cutoffHz": 8500, "snap": 1.45, "rattle": 0.22},
  [
    {"at": 0, "weight": 0.98, "pitch": 0.9},
    {"at": 0.061, "weight": 0.26, "pitch": 1.15, "release": true},
    {"at": 0.162, "weight": 0.86, "pitch": 0.93},
    {"at": 0.218, "weight": 0.24, "pitch": 1.12, "release": true}
  ],
);
