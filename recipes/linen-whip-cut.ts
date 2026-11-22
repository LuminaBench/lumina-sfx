import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "linen-whip-cut", "Linen whip cut",
  ["transition", "whoosh", "launch", "video", "textile", "woven", "dry", "fast", "cut", "whip", "pan"],
  {"lowHz": 740, "highHz": 4460, "grainHz": 88, "grainDepth": 0.58, "air": 0.025, "body": 2.35},
  {"duration": 0.12, "apex": 0.16, "direction": 1, "travel": 0.9, "reverse": true, "echo": 0},
);
