import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "brushed-metal-pull-away", "Brushed metal pull away",
  ["transition", "whoosh", "launch", "video", "metal", "foil", "brushed", "zoom", "out", "retreat"],
  {"lowHz": 1320, "highHz": 8380, "grainHz": 181, "grainDepth": 0.37, "air": 0.058, "body": 1.9},
  {"duration": 0.48, "apex": 0.12, "direction": 0, "travel": 0, "reverse": true, "echo": 0.12},
);
