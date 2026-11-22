import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "glass-edge-match-cut", "Glass edge match cut",
  ["transition", "whoosh", "launch", "video", "glass", "bright", "clean", "short", "edit", "focus", "cut"],
  {"lowHz": 2250, "highHz": 9250, "grainHz": 240, "grainDepth": 0.11, "air": 0.024, "body": 1.23},
  {"duration": 0.095, "apex": 0.42, "direction": 0, "travel": 0, "reverse": true, "echo": 0},
);
