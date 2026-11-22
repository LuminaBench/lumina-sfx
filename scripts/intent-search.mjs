// Offline retrieval over the catalog. Keep exact search available for asset IDs and scripts.
const stopWords = new Set('a an the of to for from with that when my me you i want need please sound sounds effect effects sfx something make like as and in it is through going really very just feels more'.split(' '));
const vocabulary = {
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

export function rankByIntent(sounds, query, exclude = '') {
  const terms = [...new Set(words(query).filter(term => !stopWords.has(term)))];
  if (!terms.length) return [];
  const excluded = words(exclude);
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
  const scored = [];
  for (const { sound, title, tags, context } of documents) {
    if (excluded.some(word => title.has(word) || tags.has(word) || context.has(word))) continue;
    let score = 0, hits = 0;
    terms.forEach((term, i) => {
      const relevance = title.has(term) ? 3 : tags.has(term) ? 2 : context.has(term) ? 1 : 0;
      score += relevance * weights[i];
      if (relevance) hits++;
    });
    if (hits) scored.push({ sound, score: score * hits / terms.length, exact: query.trim().toLowerCase() === sound.id });
  }
  return scored.sort((a, b) => Number(b.exact) - Number(a.exact) || b.score - a.score ||
    a.sound.id.localeCompare(b.sound.id)).map(item => item.sound);
}
