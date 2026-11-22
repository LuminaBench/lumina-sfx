import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "silk-match-cut", "Silk match cut",
  ["transition", "whoosh", "launch", "video", "soft", "fabric", "satin", "short", "edit", "focus", "cut"],
  {"lowHz": 490, "highHz": 3650, "grainHz": 14, "grainDepth": 0.11, "air": 0.016, "body": 2.55},
  {"duration": 0.095, "apex": 0.42, "direction": 0, "travel": 0, "reverse": true, "echo": 0},
);
