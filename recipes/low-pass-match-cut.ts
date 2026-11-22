import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "low-pass-match-cut", "Low pass match cut",
  ["transition", "whoosh", "launch", "video", "bass", "deep", "body", "short", "edit", "focus", "cut"],
  {"lowHz": 225, "highHz": 1600, "grainHz": 8, "grainDepth": 0.17, "air": 0.006, "body": 3.6},
  {"duration": 0.095, "apex": 0.42, "direction": 0, "travel": 0, "reverse": true, "echo": 0},
);
