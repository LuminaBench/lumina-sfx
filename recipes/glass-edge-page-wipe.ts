import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "glass-edge-page-wipe", "Glass edge page wipe",
  ["transition", "whoosh", "launch", "video", "glass", "bright", "clean", "wipe", "page", "unfold"],
  {"lowHz": 2250, "highHz": 9250, "grainHz": 240, "grainDepth": 0.11, "air": 0.024, "body": 1.23},
  {"duration": 0.42, "apex": 0.59, "direction": -1, "travel": 0.55, "reverse": true, "echo": 0.045},
);
