import { editorContact } from './_shared/editor-contact.ts';
import attack from './_recordings/isolated-milestone-key-single.ts';

export default editorContact(
  "vintage-spring-keyboard-typed-word", "Buckling-spring keyboard four-letter word",
  ["keyboard", "key", "launch", "video", "mechanical", "vintage", "spring", "typing", "text", "word", "burst"], 0.472, attack,
  {"bodyHz": 455, "decayMs": 22, "cutoffHz": 8500, "snap": 1.45, "rattle": 0.22},
  [
    {"at": 0, "weight": 0.88, "pitch": 1.06},
    {"at": 0.106, "weight": 1, "pitch": 0.93},
    {"at": 0.184, "weight": 0.76, "pitch": 1.14},
    {"at": 0.328, "weight": 0.94, "pitch": 0.97}
  ],
);
