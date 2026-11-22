// Offline retrieval over the catalog. Keep exact search available for asset IDs and scripts.
const stopWords = new Set('a an the of to for from with that when my me you i want need please sound sounds effect effects sfx something scene setting feeling mood by near make like as and in it is through going really very just feels more'.split(' '));
const vocabulary = {
  thocky: 'thock', thocking: 'thock', leftward: 'left', rightward: 'right',
  keystrokes: 'key', keycap: 'key', keycaps: 'key', keydown: 'press', keyup: 'release', enter: 'return',
  crackling: 'crackle', crackles: 'crackle', thunderstorm: 'storm', presses: 'press', pressing: 'press',
  footsteps: 'footstep', steps: 'step', wooden: 'wood', hardwood: 'wood', floors: 'floor',
  ordinary: 'normal', standard: 'normal', regular: 'normal',
  keyboards: 'keyboard', keystroke: 'key', keypress: 'key', swipes: 'swipe', swiping: 'swipe', swoosh: 'whoosh', swooshes: 'whoosh', whooshes: 'whoosh',
  relaxing: 'calm', relaxed: 'calm', tranquil: 'calm', soothing: 'calm', peaceful: 'calm', chilled: 'calm',
  intense: 'dramatic', suspenseful: 'dramatic', tense: 'dramatic',
  seaside: 'beach', shoreline: 'shore', waves: 'surf',
  tabs: 'tab', tabbed: 'tab', switching: 'switch', changing: 'switch', switched: 'switch',
  clicks: 'click', clicky: 'click', clicking: 'click', clicked: 'click', selecting: 'select',
  settings: 'settings', options: 'settings', preferences: 'settings', menus: 'menu',
  hovering: 'focus', hover: 'focus', scrolling: 'scroll', quieter: 'quiet', subtle: 'quiet',
  softer: 'soft', muted: 'soft', backing: 'back', returning: 'return',
  knobs: 'dial', knob: 'dial', sliding: 'slider', applying: 'apply',
  kills: 'elimination', kill: 'elimination', eliminated: 'elimination', credited: 'confirm',
  missiles: 'missile', phew: 'whistle', whistling: 'whistle', receding: 'departure',
  outgoing: 'departure', away: 'departure', flyaway: 'departure',
};
function words(value) {
  return (value.toLowerCase().match(/[a-z0-9]+/g) ?? []).map(word => vocabulary[word] ?? word);
}

export function rankByIntent(sounds, query, exclude = '', explain = false) {
  const queryWords = words(query.replace(/\bon (?:a|an|the)\b/gi, ' '));
  const isMood = term => term === 'calm' || term === 'dramatic';
  const negators = new Set(['not', 'never', 'without', 'no']);
  const moods = [...new Set(queryWords.filter((term, i) => isMood(term) && !negators.has(queryWords[i-1])))];
  // A trailing exclusion describes unwanted layers, not another search subject.
  const negated = [...query.toLowerCase().matchAll(/\b(?:without|no|not|never)\s+([^,.;!?]+)/g)]
    .flatMap(match => words(match[1].split(/\b(?:with|but|then)\b/i)[0]).filter(term => !stopWords.has(term)));
  const tokens = [...new Set(queryWords.filter(term => !stopWords.has(term) && !negators.has(term) && !negated.includes(term)))];
  const wantedMoods = moods.filter(term => !negated.includes(term));
  const mood = wantedMoods.length === 1 ? wantedMoods[0] : undefined;
  // In editing briefs an unspecified keyboard or mouse click denotes one press.
  const device = tokens.includes('keyboard') || tokens.includes('mouse');
  const specificGesture = ['typing','word','double','triple','pair','hold','release','up','spacebar','return','backspace','shortcut','command','chord'].some(term => tokens.includes(term));
  if (device && tokens.includes('click') && !specificGesture) tokens.splice(tokens.indexOf('click'), 1, 'single', 'press');
  const subject = [...new Set(tokens.filter(term => !isMood(term)))];
  const terms = subject.length ? subject : moods;
  const palette = mood === 'calm' ? ['calm', 'gentle', 'soft', 'distant', 'quiet'] :
    mood === 'dramatic' ? ['dramatic', 'surge', 'close', 'heavy', 'sharp'] : [];
  if (!terms.length) return [];
  const excluded = [...words(exclude), ...negated.filter(term => !isMood(term))];
  const documents = sounds.map(sound => {
    const title = new Set(words(sound.id + ' ' + sound.name));
    const tags = new Set(words(sound.tags.join(' ')));
    const context = new Set(words([sound.category, sound.collection, sound.perspective, ...(sound.contains ?? [])].join(' ')));
    return { sound, title, tags, context };
  });
  const weights = terms.map(term => {
    const count = documents.filter(d => d.title.has(term) || d.tags.has(term) || d.context.has(term)).length;
    return 1 + Math.log((documents.length + 1) / (count + 1));
  });
  const floorStep = (terms.includes('step') || terms.includes('footstep')) &&
    (terms.includes('floor') || terms.includes('wood'));
  const scored = [];
  for (const { sound, title, tags, context } of documents) {
    if (floorStep) {
      const walking = title.has('footstep') || tags.has('footstep') || tags.has('walk');
      const material = terms.includes('wood') ? 'wood' : 'floor';
      const surface = title.has(material) || tags.has(material);
      if (!walking || !surface) continue;
    }
    if (excluded.some(word => title.has(word) || tags.has(word) || context.has(word))) continue;
    let score = 0, hits = 0;
    terms.forEach((term, i) => {
      const relevance = title.has(term) ? 3 : tags.has(term) ? 2 : context.has(term) ? 1 : 0;
      score += relevance * weights[i];
      if (relevance) hits++;
    });
    const affinity = palette.filter(term => tags.has(term) || title.has(term)).length;
    if (!hits) continue;
    const result = explain ? { ...sound, missing: terms.filter(t => !title.has(t) && !tags.has(t) && !context.has(t)) } : sound;
    scored.push({ sound: result, score: score * hits / terms.length * (1 + Math.min(2, affinity) * 0.10), exact: query.trim().toLowerCase() === sound.id });
  }
  return scored.sort((a, b) => Number(b.exact) - Number(a.exact) || b.score - a.score ||
    a.sound.id.localeCompare(b.sound.id)).map(item => mood ? { ...item.sound, suggestedMood: mood } : item.sound);
}
