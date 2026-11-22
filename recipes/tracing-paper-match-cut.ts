import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "tracing-paper-match-cut", "Tracing paper match cut",
  ["transition", "whoosh", "launch", "video", "paper", "dry", "thin", "short", "edit", "focus", "cut"],
  {"lowHz": 1450, "highHz": 6400, "grainHz": 132, "grainDepth": 0.63, "air": 0.075, "body": 0.98},
  {"duration": 0.095, "apex": 0.42, "direction": 0, "travel": 0, "reverse": true, "echo": 0},
);
