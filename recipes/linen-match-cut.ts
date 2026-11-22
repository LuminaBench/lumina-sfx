import friction from './_recordings/isolated-cloth-pass.ts';
import { editorSweep } from './_shared/editor-sweep.ts';

export default editorSweep(
  "linen-match-cut", "Linen match cut",
  ["transition", "whoosh", "launch", "video", "textile", "woven", "dry", "short", "edit", "focus", "cut"],
  {"lowHz": 740, "highHz": 4460, "grainHz": 88, "grainDepth": 0.58, "air": 0.025, "body": 2.35},
  {"duration": 0.095, "apex": 0.42, "direction": 0, "travel": 0, "reverse": true, "echo": 0},
  friction,
);
