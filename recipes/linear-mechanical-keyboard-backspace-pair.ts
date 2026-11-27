import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-linear-key-travel.ts';

export default editorContact(
  "linear-mechanical-keyboard-backspace-pair", "Linear mechanical keyboard two backspaces",
  ["keyboard", "key", "launch", "video", "mechanical", "smooth", "delete", "double", "correction"], 0.302, attack,
  { captured: true, pairedTakes: true, cutoffHz: 11500 },
  [
    {"at": 0, "weight": 0.98, "pitch": 0.9},
    {"at": 0.061, "weight": 0.26, "pitch": 1.15, "release": true},
    {"at": 0.162, "weight": 0.86, "pitch": 0.93},
    {"at": 0.218, "weight": 0.24, "pitch": 1.12, "release": true}
  ],
);
