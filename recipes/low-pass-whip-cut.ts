import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "low-pass-whip-cut", "Low pass whip cut",
  ["transition", "whoosh", "launch", "video", "bass", "deep", "body", "fast", "cut", "whip", "pan"],
  {"lowHz": 170, "highHz": 1080, "grainHz": 8, "grainDepth": 0.17, "air": 0.006, "body": 5.0},
  {"duration": 0.12, "apex": 0.16, "direction": 1, "travel": 0.9, "reverse": true, "echo": 0},
);
