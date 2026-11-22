import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-key-firm.ts';

export default editorContact(
  "aluminum-plate-keyboard-shortcut", "Aluminum-plate keyboard modifier and shortcut",
  ["keyboard", "key", "launch", "video", "mechanical", "metal", "clack", "chord", "hotkey", "shortcut"], 0.325, attack,
  {"bodyHz": 680, "decayMs": 17, "cutoffHz": 8600, "snap": 1.05, "rattle": 0.15, "plateHz": 6300},
  [
    {"at": 0, "weight": 0.64, "pitch": 0.76},
    {"at": 0.084, "weight": 1, "pitch": 1.12},
    {"at": 0.177, "weight": 0.26, "pitch": 1.1, "release": true},
    {"at": 0.211, "weight": 0.3, "pitch": 0.83, "release": true}
  ],
);
