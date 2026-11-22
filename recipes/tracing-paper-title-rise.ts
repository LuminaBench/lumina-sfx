import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "tracing-paper-title-rise", "Tracing paper title rise",
  ["transition", "whoosh", "launch", "video", "paper", "dry", "thin", "riser", "typography", "title"],
  {"lowHz": 1450, "highHz": 6400, "grainHz": 132, "grainDepth": 0.63, "air": 0.075, "body": 0.98},
  {"duration": 0.72, "apex": 0.82, "direction": 0, "travel": 0, "reverse": false, "echo": 0.08},
);
