import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "low-pass-page-wipe", "Low pass page wipe",
  ["transition", "whoosh", "launch", "video", "bass", "deep", "body", "wipe", "page", "unfold"],
  {"lowHz": 170, "highHz": 1080, "grainHz": 8, "grainDepth": 0.17, "air": 0.006, "body": 5.0},
  {"duration": 0.42, "apex": 0.59, "direction": -1, "travel": 0.55, "reverse": true, "echo": 0.045},
);
