import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-milestone-key-single.ts';

export default editorContact(
  "click-jacket-keyboard-typed-word", "Click-jacket mechanical keyboard four-letter word",
  ["keyboard", "key", "launch", "video", "mechanical", "clicky", "bright", "typing", "text", "word", "burst"], 0.395, attack,
  {"bodyHz": 760, "decayMs": 8, "cutoffHz": 11500, "snap": 1.8, "rattle": 0.11},
  [
    {"at": 0, "weight": 0.88, "pitch": 1.06},
    {"at": 0.106, "weight": 1, "pitch": 0.93},
    {"at": 0.184, "weight": 0.76, "pitch": 1.14},
    {"at": 0.328, "weight": 0.94, "pitch": 0.97}
  ],
);
