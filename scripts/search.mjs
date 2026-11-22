#!/usr/bin/env node
import { parseArgs } from 'node:util';
import { readFile } from 'node:fs/promises';

const { values, positionals } = parseArgs({
  options: { 'background-checked': { type: 'boolean' }, isolated: { type: 'boolean' }, votes: { type: 'string' }, category: { type: 'string' }, collection: { type: 'string' }, loop: { type: 'boolean' }, json: { type: 'boolean' }, help: { type: 'boolean' } },
  allowPositionals: true,
});

if (values.help) {
  console.log('Usage: node scripts/search.mjs [terms…] [--category <name>] [--collection <name>] [--loop] [--isolated] [--background-checked] [--votes listening-export.json] [--json]');
} else {
  const catalog = JSON.parse(await readFile(new URL('../catalog.json', import.meta.url), 'utf8'));
  const terms = positionals.join(' ').toLowerCase().split(/\s+/).filter(Boolean);
  const sounds = catalog.sounds.filter((sound) => {
    const text = [sound.id, sound.name, sound.category, sound.collection, ...sound.tags, ...(sound.contains ?? []), sound.perspective, sound.recording?.title, ...(sound.additionalRecordings ?? []).map(credit => credit.title), ...Object.keys(sound.markers ?? {})].join(' ').toLowerCase();
    return terms.every((term) => text.includes(term)) &&
      (!values.category || sound.category.toLowerCase().includes(values.category.toLowerCase())) &&
      (!values.collection || sound.collection?.toLowerCase().includes(values.collection.toLowerCase())) &&
      (!values['background-checked'] || sound.backgroundChecked === true) &&
      (!values.loop || sound.loopable) && (!values.isolated || sound.isolation === 'isolated');
  });
  if (values.votes) {
    const review = JSON.parse(await readFile(values.votes, 'utf8'));
    const votes = review.votes ?? review.reviews;
    if (!votes || typeof votes !== 'object' || Array.isArray(votes)) throw Error('Expected listening votes or studio reviews');
    const rank = { yes: 0, approved: 0, no: 2, rejected: 2 };
    const score = sound => rank[votes[sound.id]?.decision] ?? 1;
    sounds.sort((a, b) => score(a) - score(b));
    for (const sound of sounds) if (Object.hasOwn(votes, sound.id)) {
      const v = votes[sound.id];
      sound.review = { decision: v.decision, reason: v.reason ?? v.note, heard: v.heard, phone: v.phone,
        background: v.background ? review.bed : undefined };
    }
  }
  if (values.json) console.log(JSON.stringify(sounds, null, 2));
  else if (!sounds.length) console.log('No matching recipes');
  else for (const sound of sounds) {
    console.log(`${sound.id.padEnd(29)} ${sound.name} · ${sound.category} · ${sound.durationSec}s${sound.loopable ? ' · loop' : ''}`);
  }
}
