#!/usr/bin/env node
import { listeningVotes, selectionProfile } from './selection-profile.mjs';
import { distinctChoices } from './related-takes.mjs';
import { leafIds } from './scene-leaves.mjs';
import { rankByIntent } from './intent-search.mjs';
import { parseArgs } from 'node:util';
import { readFile } from 'node:fs/promises';

const { values, positionals } = parseArgs({
  options: { parts: { type: 'string' }, 'all-takes':{type:'boolean'}, profile:{type:'string'}, 'use-case':{type:'string'}, palette:{type:'string'}, designs: { type: 'boolean' }, intent: { type: 'string' }, exclude: { type: 'string' }, limit: { type: 'string' }, 'background-checked': { type: 'boolean' }, clean: { type: 'boolean' }, isolated: { type: 'boolean' }, votes: { type: 'string' }, category: { type: 'string' }, collection: { type: 'string' }, loop: { type: 'boolean' }, json: { type: 'boolean' }, help: { type: 'boolean' } },
  allowPositionals: true,
});

if (values.help) {
  console.log('Usage: node scripts/search.mjs [terms… | --intent "game event"] [--exclude "tags or words" (intent mode)] [--designs | --parts source-id] [--limit N] [--category <name>] [--collection <name>] [--loop] [--clean] [--isolated] [--background-checked] [--votes listening-export.json] [--json]');
} else {
  if (values.parts && values.designs) throw Error('Use --parts with a catalog recipe ID');
  let candidates = values.designs
    ? JSON.parse(await readFile(new URL('../references/scenes/index.json', import.meta.url), 'utf8'))
    : JSON.parse(await readFile(new URL('../catalog.json', import.meta.url), 'utf8')).sounds;
  if (values.parts !== undefined) {
    const parent = candidates.find(sound => sound.id === values.parts);
    if (!parent) throw Error('Unknown source recipe: ' + values.parts);
    const recordings = sound => [sound.recording, ...(sound.additionalRecordings ?? [])].filter(Boolean);
    const sourceUrls = new Set(recordings(parent).map(credit => credit.url));
    candidates = candidates.flatMap(sound => {
      if (sound.isolation !== 'isolated' || sound.cleanHold || sound.auditionNote ||
          sound.components?.length !== 1) return [];
      const clips = recordings(sound);
      if (!clips.length || !clips.every(credit => sourceUrls.has(credit.url))) return [];
      return [{ ...sound, sharedRecordings: [...new Set(clips.map(credit => credit.title))] }];
    });
  }
  const terms = positionals.join(' ').toLowerCase().split(/\s+/).filter(Boolean);
  if (values.intent !== undefined && positionals.length) throw Error('Use search terms or --intent');
  if (values.exclude !== undefined && values.intent === undefined) throw Error('--exclude requires --intent');
  const limit = values.limit === undefined ? undefined : Number(values.limit);
  if (limit !== undefined && (!Number.isSafeInteger(limit) || limit < 1)) throw Error('--limit requires a positive integer');
  let sounds = candidates.filter((sound) => {
    const text = [sound.id, sound.name, sound.category, sound.collection, ...sound.tags, ...(sound.fieldContents??[]), ...(sound.soloQueries ?? []), ...(sound.contains ?? []), ...(sound.components ?? []), sound.perspective, sound.recording?.title, ...(sound.additionalRecordings ?? []).map(credit => credit.title), ...Object.keys(sound.markers ?? {})].join(' ').toLowerCase();
    return (!values.clean || (sound.isolation === 'isolated' && !sound.cleanHold && !sound.auditionNote)) && terms.every((term) => text.includes(term)) &&
      (!values.category || sound.category.toLowerCase().includes(values.category.toLowerCase())) &&
      (!values.collection || sound.collection?.toLowerCase().includes(values.collection.toLowerCase())) &&
      (!values['background-checked'] || sound.backgroundChecked === true) &&
      (!values.loop || sound.loopable) && (!values.isolated || sound.isolation === 'isolated');
  });
  if (values.designs && values.clean) {
    const bank = JSON.parse(await readFile(new URL('../catalog.json', import.meta.url))).sounds;
    const eligible = new Set(bank.filter(s => s.isolation === 'isolated' && !s.cleanHold && !s.auditionNote).map(s => s.id));
    const checked = [];
    for (const design of sounds) {
      const url = new URL('../' + design.file, import.meta.url);
      const leaves = await leafIds(JSON.parse(await readFile(url, 'utf8')), url);
      if (leaves.every(id => eligible.has(id))) checked.push(design);
    }
    sounds = checked;
  }
  const profile=await selectionProfile(values.profile);
  const useCase=values['use-case']??profile.useCase, palette=values.palette??profile.palette;
  if(palette && !['soft','crisp'].includes(palette)) throw Error('Choose a soft or crisp palette');
  const {votes,review}=await listeningVotes(values.votes??profile.votes);
  if(votes){
    const rank = { yes: 0, approved: 0, no: 2, rejected: 2 };
    const matchesRevision = sound => (votes[sound.id]?.revision ?? 1) === (sound.revision ?? 1);
    const score = sound => matchesRevision(sound) && (!votes[sound.id]?.useCase || votes[sound.id].useCase===useCase) ? rank[votes[sound.id]?.decision] ?? 1 : 1;
    if (values.parts !== undefined) sounds = sounds.filter(sound => score(sound) !== 2);
    if (values.intent === undefined) sounds.sort((a, b) => score(a) - score(b));
    for (const sound of sounds) if (Object.hasOwn(votes, sound.id)) {
      const v = votes[sound.id];
      sound.review = { useCase:v.useCase, currentRevision: matchesRevision(sound), decision: v.decision, reason: v.reason ?? v.note, heard: v.heard, phone: v.phone,
        background: v.background ? review.bed : undefined };
    }
  }
  if (values.intent !== undefined) sounds = rankByIntent(sounds, values.intent, values.exclude, false, votes, {palette,useCase,signatures:profile.signatures});
  if(values.intent && !values.designs && !values['all-takes']) sounds=distinctChoices(sounds);
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
