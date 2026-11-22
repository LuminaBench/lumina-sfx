import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "low-pass-match-cut", "Low pass match cut",
  ["transition", "whoosh", "launch", "video", "bass", "deep", "body", "short", "edit", "focus", "cut"],
  {"lowHz": 170, "highHz": 1080, "grainHz": 8, "grainDepth": 0.17, "air": 0.006, "body": 5.0},
  {"duration": 0.095, "apex": 0.42, "direction": 0, "travel": 0, "reverse": true, "echo": 0},
);
