import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-milestone-key-single.ts';

export default editorContact(
  "click-jacket-keyboard-spacebar", "Click-jacket mechanical keyboard spacebar tap",
  ["keyboard", "key", "launch", "video", "mechanical", "clicky", "bright", "space", "bar", "stabilizer"], 0.152, attack,
  {"bodyHz": 760, "decayMs": 8, "cutoffHz": 11500, "snap": 1.8, "rattle": 0.11},
  [
    {"at": 0, "weight": 1, "pitch": 0.6},
    {"at": 0.007, "weight": 0.2, "pitch": 1.36},
    {"at": 0.085, "weight": 0.38, "pitch": 0.74, "release": true}
  ],
);
