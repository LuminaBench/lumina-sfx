import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-milestone-key-single.ts';

export default editorContact(
  "office-membrane-keyboard-typed-word", "Office membrane keyboard four-letter word",
  ["keyboard", "key", "launch", "video", "normal", "desktop", "rubber", "dome", "typing", "text", "word", "burst"], 0.395, attack,
  {"bodyHz": 325, "decayMs": 8, "cutoffHz": 3100, "snap": 0.7, "rattle": 0.01},
  [
    {"at": 0, "weight": 0.88, "pitch": 1.06},
    {"at": 0.106, "weight": 1, "pitch": 0.93},
    {"at": 0.184, "weight": 0.76, "pitch": 1.14},
    {"at": 0.328, "weight": 0.94, "pitch": 0.97}
  ],
);
