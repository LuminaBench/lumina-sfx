import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "soft-air-title-rise", "Soft air title rise",
  ["transition", "whoosh", "launch", "video", "quiet", "airy", "diffuse", "riser", "typography", "title"],
  {"lowHz": 395, "highHz": 2170, "grainHz": 4, "grainDepth": 0.08, "air": 0.036, "body": 3.55},
  {"duration": 0.72, "apex": 0.82, "direction": 0, "travel": 0, "reverse": false, "echo": 0.08},
);
