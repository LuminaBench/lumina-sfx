import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-milestone-key-single.ts';

export default editorContact(
  "laptop-scissor-keyboard-typed-word", "Laptop scissor keyboard four-letter word",
  ["keyboard", "key", "launch", "video", "normal", "notebook", "low-profile", "typing", "text", "word", "burst"], 0.395, attack,
  {"bodyHz": 1050, "decayMs": 5, "cutoffHz": 6700, "snap": 1.25, "rattle": 0.016},
  [
    {"at": 0, "weight": 0.88, "pitch": 1.06},
    {"at": 0.106, "weight": 1, "pitch": 0.93},
    {"at": 0.184, "weight": 0.76, "pitch": 1.14},
    {"at": 0.328, "weight": 0.94, "pitch": 0.97}
  ],
);
