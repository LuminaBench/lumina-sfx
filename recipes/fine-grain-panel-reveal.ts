import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "fine-grain-panel-reveal", "Fine grain panel reveal",
  ["transition", "whoosh", "launch", "video", "sand", "textured", "grit", "reveal", "panel", "entrance"],
  {"lowHz": 1150, "highHz": 6700, "grainHz": 323, "grainDepth": 0.78, "air": 0.11, "body": 1.22},
  {"duration": 0.38, "apex": 0.48, "direction": 0, "travel": 0, "reverse": false, "echo": 0.04},
);
