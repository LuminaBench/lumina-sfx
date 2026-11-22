import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "fine-grain-pull-away", "Fine grain pull away",
  ["transition", "whoosh", "launch", "video", "sand", "textured", "grit", "zoom", "out", "retreat"],
  {"lowHz": 1150, "highHz": 6700, "grainHz": 323, "grainDepth": 0.78, "air": 0.11, "body": 1.22},
  {"duration": 0.48, "apex": 0.12, "direction": 0, "travel": 0, "reverse": true, "echo": 0.12},
);
