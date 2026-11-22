import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "glass-edge-pull-away", "Glass edge pull away",
  ["transition", "whoosh", "launch", "video", "glass", "bright", "clean", "zoom", "out", "retreat"],
  {"lowHz": 1580, "highHz": 6600, "grainHz": 240, "grainDepth": 0.11, "air": 0.024, "body": 1.23},
  {"duration": 0.48, "apex": 0.12, "direction": 0, "travel": 0, "reverse": true, "echo": 0.12},
);
