import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "brushed-metal-match-cut", "Brushed metal match cut",
  ["transition", "whoosh", "launch", "video", "metal", "foil", "brushed", "short", "edit", "focus", "cut"],
  {"lowHz": 1320, "highHz": 8380, "grainHz": 181, "grainDepth": 0.37, "air": 0.058, "body": 1.9},
  {"duration": 0.095, "apex": 0.42, "direction": 0, "travel": 0, "reverse": true, "echo": 0},
);
