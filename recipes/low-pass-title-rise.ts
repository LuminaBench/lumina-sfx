import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "low-pass-title-rise", "Low pass title rise",
  ["transition", "whoosh", "launch", "video", "bass", "deep", "body", "riser", "typography", "title"],
  {"lowHz": 170, "highHz": 1080, "grainHz": 8, "grainDepth": 0.17, "air": 0.006, "body": 5.0},
  {"duration": 0.72, "apex": 0.82, "direction": 0, "travel": 0, "reverse": false, "echo": 0.08},
);
