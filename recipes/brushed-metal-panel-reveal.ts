import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "brushed-metal-panel-reveal", "Brushed metal panel reveal",
  ["transition", "whoosh", "launch", "video", "metal", "foil", "brushed", "reveal", "panel", "entrance"],
  {"lowHz": 1320, "highHz": 8380, "grainHz": 181, "grainDepth": 0.37, "air": 0.058, "body": 1.9},
  {"duration": 0.38, "apex": 0.48, "direction": 0, "travel": 0, "reverse": false, "echo": 0.04},
);
