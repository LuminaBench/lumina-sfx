#!/usr/bin/env node
import { rankByIntent } from './intent-search.mjs';
import { parseArgs } from 'node:util';
import { readFile } from 'node:fs/promises';

const { values, positionals } = parseArgs({
  options: { designs: { type: 'boolean' }, intent: { type: 'string' }, exclude: { type: 'string' }, limit: { type: 'string' }, 'background-checked': { type: 'boolean' }, clean: { type: 'boolean' }, isolated: { type: 'boolean' }, votes: { type: 'string' }, category: { type: 'string' }, collection: { type: 'string' }, loop: { type: 'boolean' }, json: { type: 'boolean' }, help: { type: 'boolean' } },
  allowPositionals: true,
});

if (values.help) {
  console.log('Usage: node scripts/search.mjs [terms… | --intent "game event"] [--exclude "tags or words" (intent mode)] [--designs] [--limit N] [--category <name>] [--collection <name>] [--loop] [--clean] [--isolated] [--background-checked] [--votes listening-export.json] [--json]');
} else {
  const candidates = values.designs
    ? JSON.parse(await readFile(new URL('../references/scenes/index.json', import.meta.url), 'utf8'))
    : JSON.parse(await readFile(new URL('../catalog.json', import.meta.url), 'utf8')).sounds;
  const terms = positionals.join(' ').toLowerCase().split(/\s+/).filter(Boolean);
  if (values.intent !== undefined && positionals.length) throw Error('Use search terms or --intent');
  if (values.exclude !== undefined && values.intent === undefined) throw Error('--exclude requires --intent');
  const limit = values.limit === undefined ? undefined : Number(values.limit);
  if (limit !== undefined && (!Number.isSafeInteger(limit) || limit < 1)) throw Error('--limit requires a positive integer');
  let sounds = candidates.filter((sound) => {
    const text = [sound.id, sound.name, sound.category, sound.collection, ...sound.tags, ...(sound.contains ?? []), sound.perspective, sound.recording?.title, ...(sound.additionalRecordings ?? []).map(credit => credit.title), ...Object.keys(sound.markers ?? {})].join(' ').toLowerCase();
    return (!values.clean || (sound.isolation === 'isolated' && !sound.cleanHold && !sound.auditionNote)) && terms.every((term) => text.includes(term)) &&
      (!values.category || sound.category.toLowerCase().includes(values.category.toLowerCase())) &&
      (!values.collection || sound.collection?.toLowerCase().includes(values.collection.toLowerCase())) &&
      (!values['background-checked'] || sound.backgroundChecked === true) &&
      (!values.loop || sound.loopable) && (!values.isolated || sound.isolation === 'isolated');
  });
  if (values.intent !== undefined) sounds = rankByIntent(sounds, values.intent, values.exclude);
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
  if (limit !== undefined) sounds = sounds.slice(0, limit);
  if (values.json) console.log(JSON.stringify(sounds, null, 2));
  else if (!sounds.length) console.log('No matching recipes');
  else for (const sound of sounds) {
    const mood = sound.suggestedMood ? ' · mood ' + sound.suggestedMood : '';
    if (sound.kind === 'design') {
      console.log(`${sound.id.padEnd(29)} ${sound.name} · ${sound.file}${mood}`);
      continue;
    }
    console.log(`${sound.id.padEnd(29)} ${sound.name} · ${sound.category} · ${sound.durationSec}s${sound.loopable ? ' · loop' : ''}${mood}`);
  }
}
