import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "glass-edge-whip-cut", "Glass edge whip cut",
  ["transition", "whoosh", "launch", "video", "glass", "bright", "clean", "fast", "cut", "whip", "pan"],
  {"lowHz": 1580, "highHz": 6600, "grainHz": 240, "grainDepth": 0.11, "air": 0.024, "body": 1.23},
  {"duration": 0.12, "apex": 0.16, "direction": 1, "travel": 0.9, "reverse": true, "echo": 0},
);
