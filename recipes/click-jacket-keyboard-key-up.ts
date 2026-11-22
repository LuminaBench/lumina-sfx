import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-milestone-key-single.ts';

export default editorContact(
  "click-jacket-keyboard-key-up", "Click-jacket mechanical keyboard letter key release",
  ["keyboard", "key", "launch", "video", "mechanical", "clicky", "bright", "single", "lift", "release"], 0.067, attack,
  {"bodyHz": 760, "decayMs": 8, "cutoffHz": 11500, "snap": 1.8, "rattle": 0.11},
  [
    {"at": 0, "weight": 0.63, "pitch": 1.14, "release": true}
  ],
);
