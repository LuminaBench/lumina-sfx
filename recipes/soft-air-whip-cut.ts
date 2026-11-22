import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "soft-air-whip-cut", "Soft air whip cut",
  ["transition", "whoosh", "launch", "video", "quiet", "airy", "diffuse", "fast", "cut", "whip", "pan"],
  {"lowHz": 395, "highHz": 2170, "grainHz": 4, "grainDepth": 0.08, "air": 0.036, "body": 3.55},
  {"duration": 0.12, "apex": 0.16, "direction": 1, "travel": 0.9, "reverse": true, "echo": 0},
);
