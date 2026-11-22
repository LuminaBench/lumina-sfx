import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "fine-grain-match-cut", "Fine grain match cut",
  ["transition", "whoosh", "launch", "video", "sand", "textured", "grit", "short", "edit", "focus", "cut"],
  {"lowHz": 1150, "highHz": 6700, "grainHz": 323, "grainDepth": 0.78, "air": 0.11, "body": 1.22},
  {"duration": 0.095, "apex": 0.42, "direction": 0, "travel": 0, "reverse": true, "echo": 0},
);
