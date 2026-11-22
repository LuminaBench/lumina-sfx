import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "brushed-metal-whip-cut", "Brushed metal whip cut",
  ["transition", "whoosh", "launch", "video", "metal", "foil", "brushed", "fast", "cut", "whip", "pan"],
  {"lowHz": 1320, "highHz": 8380, "grainHz": 181, "grainDepth": 0.37, "air": 0.058, "body": 1.9},
  {"duration": 0.12, "apex": 0.16, "direction": 1, "travel": 0.9, "reverse": true, "echo": 0},
);
