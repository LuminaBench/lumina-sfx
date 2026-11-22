import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-milestone-key-single.ts';

export default editorContact(
  "gasket-mount-keyboard-shortcut", "Gasket-mounted keyboard modifier and shortcut",
  ["keyboard", "key", "launch", "video", "mechanical", "soft", "thock", "chord", "hotkey", "shortcut"], 0.331, attack,
  {"bodyHz": 240, "decayMs": 18, "cutoffHz": 4600, "snap": 0.86, "rattle": 0.018},
  [
    {"at": 0, "weight": 0.64, "pitch": 0.76},
    {"at": 0.084, "weight": 1, "pitch": 1.12},
    {"at": 0.177, "weight": 0.26, "pitch": 1.1, "release": true},
    {"at": 0.211, "weight": 0.3, "pitch": 0.83, "release": true}
  ],
);
