import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-key-firm.ts';

export default editorContact(
  "click-jacket-keyboard-backspace-pair", "Click-jacket mechanical keyboard two backspaces",
  ["keyboard", "key", "launch", "video", "mechanical", "clicky", "bright", "delete", "double", "correction"], 0.285, attack,
  {"bodyHz": 760, "decayMs": 8, "cutoffHz": 11500, "snap": 1.8, "rattle": 0.11},
  [
    {"at": 0, "weight": 0.98, "pitch": 0.9},
    {"at": 0.061, "weight": 0.26, "pitch": 1.15, "release": true},
    {"at": 0.162, "weight": 0.86, "pitch": 0.93},
    {"at": 0.218, "weight": 0.24, "pitch": 1.12, "release": true}
  ],
);
