import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

export async function selectionProfile(path) {
  if (!path) return {};
  const profile = JSON.parse(await readFile(path, 'utf8'));
  if (!profile || Array.isArray(profile) || typeof profile !== 'object')
    throw Error('Expected a selection profile');
  if (profile.palette !== undefined && !['soft', 'crisp'].includes(profile.palette))
    throw Error('Choose a soft or crisp palette');
  if (profile.useCase !== undefined && typeof profile.useCase !== 'string')
    throw Error('Expected a useCase string');
  if (profile.votes !== undefined && typeof profile.votes !== 'string')
    throw Error('Expected a path to listening votes');
  if (profile.keyboard !== undefined && !['mechanical','laptop'].includes(profile.keyboard)) throw Error('Choose a mechanical or laptop keyboard');
  if (profile.bindings !== undefined && (!profile.bindings || typeof profile.bindings!=='object' || Array.isArray(profile.bindings) ||
      Object.values(profile.bindings).some(v=>typeof v!=='string'))) throw Error('Expected action-to-recipe bindings');
  return { ...profile, votes: profile.votes && resolve(dirname(path), profile.votes) };
}

export async function listeningVotes(file) {
  if (!file) return {};
  const review = JSON.parse(await readFile(file, 'utf8'));
  const votes = review.votes ?? review.reviews;
  if (!votes || typeof votes !== 'object' || Array.isArray(votes))
    throw Error('Expected listening votes or studio reviews');
  return { review, votes };
}
