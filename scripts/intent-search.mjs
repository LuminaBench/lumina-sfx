import { editorialBrief, editorialTerms, listeningOrder } from './editorial-intent.mjs';

// Offline retrieval over the catalog. Keep exact search available for asset IDs and scripts.
const stopWords = new Set('a an the of to for from with that when my me you i want need please sound sounds effect effects sfx something scene setting feeling mood by near make like as and in it is through going really very just feels more only solo alone'.split(' '));
const vocabulary = {
  landing: 'land', lands: 'land', settles: 'settle', settling: 'settle', transitions: 'transition',
  buttons: 'button', trailers: 'trailer', videos: 'video', reveals: 'reveal', logos: 'logo',
  one: 'single', slides: 'slide', notifications: 'notification', selection: 'select', selects: 'select', typed: 'type', turns: 'turn', screens: 'screen', panels: 'panel',
  quick: 'fast', swish: 'whoosh', swooshy: 'whoosh', opens: 'opening',
  closes: 'close', closing: 'close', closed: 'close', appears: 'reveal', appearing: 'reveal',
  confirmation: 'confirm', confirming: 'confirm', titles: 'title', cards: 'card',
  interfaces: 'interface', whipcut: 'whip',
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

export function rankByIntent(sounds, query, exclude = '', explain = false, votes = {}) {
  const directedQuery = query.replace(/\b(left|right)\s+to\s+(left|right)\b/gi, (_, start, end) => end);
  const queryWords = words(directedQuery.replace(/\bsliding (panel|screen|page)/gi, 'slide $1').replace(/\bon (?:a|an|the)\b/gi, ' '));
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
  const exactId = sounds.some(s => s.id === query.trim().toLowerCase());
  const catalogSearch = !exactId && sounds.some(s => s.id && s.kind !== 'design');
  // The game's genre describes the screen on which an interface appears. A named
  // object in the gesture itself (e.g. a portal opening) is still a source.
  const gameContext = /\s+(?:for|in|from)\s+(?:(?:a|an|the|my|our|this|sci-fi|fantasy|racing|jet|space|horror|fighting|mobile|browser)\s+)*(?:game|rpg)(?:\s+trailer)?\s*$/i;
  const actionWords = gameContext.test(query) ? words(query.replace(gameContext, '')) : undefined;
  const editorial = catalogSearch ? editorialBrief(actionWords ? subject.filter(t => actionWords.includes(t)) : subject) : undefined;
  // A delivery phrase describes the edit, even if the requested sound is a real-world source.
  const suffix = /\s+(?:for|in|under|during)\s+(?:(?:a|an|the|my|our|this|professional|clean|product|game|app|software|sci-fi|launch|screen|short|promotional)\s+)*(?:trailer|video|film|demo|teaser)\s*$/i;
  const sourceWords = catalogSearch && !editorial && suffix.test(query) ? words(query.replace(suffix, '')) : undefined;
  const terms = editorial?.terms ?? (sourceWords ? subject.filter(t => sourceWords.includes(t)) : subject.length ? subject : moods);
  const palette = mood === 'calm' ? ['calm', 'gentle', 'soft', 'distant', 'quiet'] :
    mood === 'dramatic' ? ['dramatic', 'surge', 'close', 'heavy', 'sharp'] : [];
  if (!terms.length) return [];
  // Direction and physical input are hard requirements for a picture-synced cue.
  const requirements = editorial?.action ? terms.filter(term =>
    ['left','right','mouse','trackpad','stylus','on','off'].includes(term)) : [];
  const vehicleTrailer = !editorial && terms.includes('trailer') && terms.some(t => ['truck','tractor','tow','hitch','coupling','axle','cargo','flatbed'].includes(t));
  const subjectNoun = terms.includes('portal') ? 'portal' : terms.includes('shield') && terms.includes('energy') ? 'shield' : undefined;
  const excluded = [...words(exclude), ...negated.filter(term => !isMood(term))];
  const documents = sounds.map(sound => {
    const aliases = (sound.soloQueries ?? []).map(q => words(q).filter(w => !stopWords.has(w)));
    const title = new Set([...words(sound.id + ' ' + sound.name), ...aliases.flat()]);
    const tags = new Set(words(sound.tags.join(' ')));
    if (editorial?.action && sound.editorialAction === editorial.action) {
      for (const term of editorialTerms(editorial.action)) tags.add(term);
    }
    const context = new Set(words([sound.category, sound.collection, sound.perspective, ...(sound.contains ?? [])].join(' ')));
    return { sound, title, tags, context, aliases };
  });
  const weights = terms.map(term => {
    const count = documents.filter(d => d.title.has(term) || d.tags.has(term) || d.context.has(term)).length;
    return 1 + Math.log((documents.length + 1) / (count + 1));
  });
  const floorStep = (terms.includes('step') || terms.includes('footstep')) &&
    (terms.includes('floor') || terms.includes('wood'));
  const scored = [];
  for (const { sound, title, tags, context, aliases } of documents) {
    if (editorial?.action && (sound.editorialAction !== editorial.action || sound.cleanHold ||
        sound.auditionNote || sound.isolation !== 'isolated')) continue;
    if (vehicleTrailer && ![...title, ...tags].some(w => ['truck','tractor','tow','hitch','coupling','axle','cargo','flatbed'].includes(w))) continue;
    if (subjectNoun && !title.has(subjectNoun) && !tags.has(subjectNoun)) continue;
    if (requirements.some(t => !title.has(t) && !tags.has(t))) continue;
    if (floorStep) {
      const walking = title.has('footstep') || tags.has('footstep') || tags.has('walk');
      const material = terms.includes('wood') ? 'wood' : 'floor';
      const surface = title.has(material) || tags.has(material);
      if (!walking || !surface) continue;
    }
    // A broad catalog category can contain both tactile UI and fiction. Exclusions
    // describe the audible cue itself when choosing for a screen edit.
    if (excluded.some(word => title.has(word) || tags.has(word) || (!editorial && context.has(word)))) continue;
    let score = 0, hits = 0;
    terms.forEach((term, i) => {
      const relevance = title.has(term) ? 3 : tags.has(term) ? 2 : context.has(term) ? 1 : 0;
      score += relevance * weights[i];
      if (relevance) hits++;
    });
    const affinity = palette.filter(term => tags.has(term) || title.has(term)).length;
    if (!hits || !terms.some(t => title.has(t) || tags.has(t) || words((sound.contains ?? []).join(" ")).includes(t))) continue;
    const solo = aliases.some(a => a.length === terms.length && terms.every(t => a.includes(t)));
    const result = explain ? { ...sound, missing: terms.filter(t => !title.has(t) && !tags.has(t) && !context.has(t)) } : sound;
    const ballot = votes[sound.id];
    const vote = (ballot?.revision ?? 1) === (sound.revision ?? 1) ? ballot?.decision : undefined;
    const preference = vote === 'no' || vote === 'rejected' ? -1 : vote === 'yes' || vote === 'approved' ? 1 : 0;
    const order = editorial ? listeningOrder(sound.id) : 0;
    const character = editorial ? subject.filter(t => ['quiet','soft','warm','crisp','gentle','minimal'].includes(t) && (title.has(t) || tags.has(t))).length : 0;
    scored.push({ sound: result, solo, hits, preference, order, character, score: score * hits / terms.length * (1 + Math.min(2, affinity) * 0.10), exact: query.trim().toLowerCase() === sound.id });
  }
  return scored.sort((a, b) => Number(b.exact) - Number(a.exact) || Number(b.solo) - Number(a.solo) ||
    b.hits - a.hits || Number(a.preference < 0) - Number(b.preference < 0) || b.character - a.character ||
    (editorial ? a.order - b.order : 0) || b.score - a.score || b.preference - a.preference ||
    a.sound.id.localeCompare(b.sound.id)).map(item => mood ? { ...item.sound, suggestedMood: mood } : item.sound);
}
