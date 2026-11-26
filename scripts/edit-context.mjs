import acoustics from '../references/edits/palette-acoustics.json' with { type: 'json' };

const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));
export function levelMatch(from, to) {
  if (!acoustics[from] || !acoustics[to]) throw Error('Compare measured palette candidates');
  return acoustics[from].activeDb - acoustics[to].activeDb;
}

export function softerEdge(id, alternatives) {
  const current = acoustics[id];
  if (!current) return;
  return alternatives
    .filter((alt) => acoustics[alt]?.bright < current.bright * 0.85)
    .sort((a, b) => acoustics[a].bright - acoustics[b].bright)[0];
}

export function unpackContext(query) {
  const phrases = [
    [
      'speech',
      /\b(?:under|beneath|behind|during) (?:the |a )?(?:voice[ -]?over|narration|dialogue|speech)\b/gi,
    ],
    [
      'rapid',
      /\b(?:in (?:rapid|quick) succession|(?:rapid(?:ly)?|repeatedly)(?= (?:switch|tab|click|press|navigat))|during rapid navigation)\b/gi,
    ],
    ['hero', /\b(?:in |for )?(?:a |the )?(?:hero (?:shot|close[ -]?up)|featured close[ -]?up)\b/gi],
  ];
  let context;
  for (const [name, pattern] of phrases)
    query = query.replace(pattern, () => {
      context ??= name;
      return ' ';
    });
  return { query: query.trim(), context };
}

export function contextOrder(ids, mode) {
  if (!mode || !ids.every((id) => acoustics[id])) return ids;
  // Same-action alternatives only. Short and dark wears better across rapid changes;
  // a featured beat can carry a longer body, within its own action family.
  const cost = (id) => {
    const { bright, tailMs } = acoustics[id];
    return mode === 'hero'
      ? -Math.min(tailMs, 180) / 180 - bright * 0.3
      : (mode === 'speech' ? 3 : 1.5) * bright + Math.min(tailMs, 500) / (mode === 'rapid' ? 160 : 350);
  };
  return [...ids].sort((a, b) => cost(a) - cost(b));
}

export function scoreGain(actionDb, cue, frame, fps, mode, underSpeech, track) {
  const distance = mode === 'rapid' ? -2 : 0;
  const base = actionDb + distance;
  if (!track?.windows.length) return base - (underSpeech ? 6 : 0);
  const sec = frame / fps;
  const lo = Math.max(0, Math.floor((sec - 0.05) / track.windowSec));
  const hi = Math.ceil((sec + 0.12) / track.windowSec);
  const local = track.windows.slice(lo, hi);
  if (!local.length) return base - (underSpeech ? 6 : 0);
  const rms = 10 * Math.log10(Math.max(1e-12, local.reduce((v, x) => v + x.energy, 0) / local.length));
  const peak = Math.max(...local.map((x) => x.peak));
  const { activeDb, peakDb } = acoustics[cue] ?? { activeDb: -24, peakDb: -8 };
  const adjustment = underSpeech
    ? clamp(rms - 8 - (activeDb + base), -13, -3)
    : rms > -32
      ? clamp(rms - 5 - (activeDb + base), -2, 3)
      : 0;
  // Reserve headroom for the original on local peaks. Never turn down the source stream.
  const room = 20 * Math.log10(Math.max(0.015, 0.97 - peak)) - peakDb;
  return Number(Math.min(base + adjustment, room).toFixed(2));
}
