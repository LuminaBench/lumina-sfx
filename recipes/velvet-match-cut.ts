import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "velvet-match-cut", "Velvet match cut",
  ["transition", "whoosh", "launch", "video", "muted", "felt", "cloth", "short", "edit", "focus", "cut"],
  {"lowHz": 280, "highHz": 1800, "grainHz": 20, "grainDepth": 0.19, "air": 0.008, "body": 4.2},
  {"duration": 0.095, "apex": 0.42, "direction": 0, "travel": 0, "reverse": true, "echo": 0},
);
