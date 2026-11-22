import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-key-firm.ts';

export default editorContact(
  "vintage-spring-keyboard-shortcut", "Buckling-spring keyboard modifier and shortcut",
  ["keyboard", "key", "launch", "video", "mechanical", "vintage", "spring", "chord", "hotkey", "shortcut"], 0.355, attack,
  {"bodyHz": 455, "decayMs": 22, "cutoffHz": 8500, "snap": 1.45, "rattle": 0.22},
  [
    {"at": 0, "weight": 0.64, "pitch": 0.76},
    {"at": 0.084, "weight": 1, "pitch": 1.12},
    {"at": 0.177, "weight": 0.26, "pitch": 1.1, "release": true},
    {"at": 0.211, "weight": 0.3, "pitch": 0.83, "release": true}
  ],
);
