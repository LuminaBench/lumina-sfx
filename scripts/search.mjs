#!/usr/bin/env node
import { parseArgs } from 'node:util';
import { readFile } from 'node:fs/promises';

const { values, positionals } = parseArgs({
  options: { category: { type: 'string' }, loop: { type: 'boolean' }, json: { type: 'boolean' }, help: { type: 'boolean' } },
  allowPositionals: true,
});

if (values.help) {
  console.log('Usage: node scripts/search.mjs [terms…] [--category <name>] [--loop] [--json]');
} else {
  const catalog = JSON.parse(await readFile(new URL('../catalog.json', import.meta.url), 'utf8'));
  const terms = positionals.join(' ').toLowerCase().split(/\s+/).filter(Boolean);
  const sounds = catalog.sounds.filter((sound) => {
    const text = [sound.id, sound.name, sound.category, ...sound.tags].join(' ').toLowerCase();
    return terms.every((term) => text.includes(term)) &&
      (!values.category || sound.category.toLowerCase().includes(values.category.toLowerCase())) &&
      (!values.loop || sound.loopable);
  });
  if (values.json) console.log(JSON.stringify(sounds, null, 2));
  else if (!sounds.length) console.log('No matching recipes');
  else for (const sound of sounds) {
    console.log(`${sound.id.padEnd(29)} ${sound.name} · ${sound.category} · ${sound.durationSec}s${sound.loopable ? ' · loop' : ''}`);
  }
}
