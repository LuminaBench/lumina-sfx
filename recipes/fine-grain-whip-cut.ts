import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "fine-grain-whip-cut", "Fine grain whip cut",
  ["transition", "whoosh", "launch", "video", "sand", "textured", "grit", "fast", "cut", "whip", "pan"],
  {"lowHz": 1150, "highHz": 6700, "grainHz": 323, "grainDepth": 0.78, "air": 0.11, "body": 1.22},
  {"duration": 0.12, "apex": 0.16, "direction": 1, "travel": 0.9, "reverse": true, "echo": 0},
);
