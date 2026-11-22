import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "low-pass-pull-away", "Low pass pull away",
  ["transition", "whoosh", "launch", "video", "bass", "deep", "body", "zoom", "out", "retreat"],
  {"lowHz": 170, "highHz": 1080, "grainHz": 8, "grainDepth": 0.17, "air": 0.006, "body": 5.0},
  {"duration": 0.48, "apex": 0.12, "direction": 0, "travel": 0, "reverse": true, "echo": 0.12},
);
