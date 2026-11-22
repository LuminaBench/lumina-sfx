import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "soft-air-match-cut", "Soft air match cut",
  ["transition", "whoosh", "launch", "video", "quiet", "airy", "diffuse", "short", "edit", "focus", "cut"],
  {"lowHz": 395, "highHz": 2170, "grainHz": 4, "grainDepth": 0.08, "air": 0.036, "body": 3.55},
  {"duration": 0.095, "apex": 0.42, "direction": 0, "travel": 0, "reverse": true, "echo": 0},
);
