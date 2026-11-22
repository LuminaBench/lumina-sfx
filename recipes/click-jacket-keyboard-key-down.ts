import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-key-firm.ts';

export default editorContact(
  "click-jacket-keyboard-key-down", "Click-jacket mechanical keyboard letter key down",
  ["keyboard", "key", "launch", "video", "mechanical", "clicky", "bright", "single", "tap", "press"], 0.067, attack,
  {"bodyHz": 760, "decayMs": 8, "cutoffHz": 11500, "snap": 1.8, "rattle": 0.11},
  [
    {"at": 0, "weight": 1, "pitch": 1}
  ],
);
