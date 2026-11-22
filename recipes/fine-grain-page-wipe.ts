import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "fine-grain-page-wipe", "Fine grain page wipe",
  ["transition", "whoosh", "launch", "video", "sand", "textured", "grit", "wipe", "page", "unfold"],
  {"lowHz": 1150, "highHz": 6700, "grainHz": 323, "grainDepth": 0.78, "air": 0.11, "body": 1.22},
  {"duration": 0.42, "apex": 0.59, "direction": -1, "travel": 0.55, "reverse": true, "echo": 0.045},
);
