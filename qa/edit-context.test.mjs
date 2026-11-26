import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { planEdit, reviseEdit } from '../scripts/edit-score.mjs';
import { geometryConflict } from '../scripts/source-perspective.mjs';
import { resolveListeningBrief } from '../scripts/listening-brief.mjs';
import { rankByIntent } from '../scripts/intent-search.mjs';
import { cuePlacement } from '../scripts/cue-placement.mjs';
import { silentGesture } from '../scripts/editorial-intent.mjs';
const bank = JSON.parse(readFileSync(new URL('../catalog.json', import.meta.url))).sounds;
const src = (id) => bank.find((s) => s.id === id);
const timeline = (events, extra = {}) => ({ id: 'spotting', fps: 30, durationFrames: 150, events, ...extra });
const mark = (id, action, frame, extra = {}) => ({ id, action, frame, ...extra });
const plan = (events, extra = {}, track) => planEdit(timeline(events, extra), bank, {}, {}, track);
test('physical, glass and software inputs retain the observed mechanism', () => {
  const marks = [
    mark('finger', 'press', 2, { device: 'tablet' }),
    mark('type', 'type', 8, { device: 'on-screen keyboard', keyFrames: [8, 12] }),
    mark('subtle', 'press', 20, { feedback: 'subtle', device: 'phone' }),
    mark('tip', 'press', 40, { device: 'stylus' }),
    mark('barrel', 'press', 52, { device: 'pen side button' }),
    mark('physical', 'press', 75, { device: 'stylus', physicalContact: true }),
    mark('glass', 'press', 81, { device: 'touchscreen', physicalContact: true }),
  ];
  assert.deepEqual(
    plan(marks).cues.map((c) => c.soundId ?? c.decision),
    [
      'silence',
      'silence',
      'settings-focus-felt-tick',
      'review',
      'stylus-barrel-press',
      'stylus-tip-on-tablet-glass',
      'fingertip-on-display-glass',
    ],
  );
  const shot = plan([
    mark('pen', 'press', 50, { device: 'stylus', physicalContact: true, gesture: 'ink' }),
    mark('chip', 'tab', 51, { gesture: 'ink' }),
  ]).cues;
  assert.equal(shot[0].soundId, 'stylus-tip-on-tablet-glass');
  assert.equal(shot[1].decision, 'silence');
  assert.ok(silentGesture('tap the button labelled “Engine on fire” on a phone'));
  assert.equal(
    rankByIntent(bank, 'one discreet notification without a chime')[0].id,
    'menu-confirm-spring-detent',
  );
  assert.equal(rankByIntent(bank, 'a tap on a phone with subtle feedback')[0].id, 'settings-focus-felt-tick');
  assert.equal(rankByIntent(bank, 'stylus tip tapping glass')[0].id, 'stylus-tip-on-tablet-glass');
});
test('gesture grouping respects the device, soundtrack and whole-edit contact limit', () => {
  const events = [
    mark('raw', 'press', 10, { gesture: 'nav', device: 'touchscreen' }),
    mark('tab', 'tab', 11, { gesture: 'nav' }),
    mark('original', 'press', 30, { sourceContact: true }),
    mark('loader', 'spinner', 55),
    mark('result', 'confirm', 90, { priority: 9 }),
  ];
  const cues = plan(events).cues;
  assert.equal(cues.find((c) => c.id === 'tab').device, 'touch');
  assert.deepEqual(
    plan(events, { maxAddedContacts: 1 }).cues.map((c) => c.decision),
    ['silence', 'silence', 'reuse', 'silence', 'play'],
  );
  assert.deepEqual(
    plan(events, { feedback: 'none' }).cues.map((c) => c.decision),
    ['silence', 'silence', 'reuse', 'silence', 'silence'],
  );
  assert.ok(
    plan([mark('x', 'notice', 10)], { avoid: ['chime'] }).cues[0].soundId === 'menu-confirm-spring-detent',
  );
  assert.throws(() => plan(events, { maxAddedContacts: -1 }));
});
test('palette ranking fits rate and feature, with gain tied to the marked soundtrack window', () => {
  const solo = plan([mark('a', 'press', 30, { device: 'mouse' })]).cues[0];
  const rapid = plan([
    mark('a', 'press', 30, { device: 'mouse' }),
    mark('b', 'press', 38, { device: 'mouse' }),
  ]).cues[0];
  assert.equal(solo.soundId, 'desktop-mouse-press');
  assert.equal(rapid.soundId, 'quiet-mouse-press');
  assert.ok(rapid.gainDb < solo.gainDb);
  const source = {
    windowSec: 0.05,
    windows: Array.from({ length: 100 }, (_, i) => ({
      energy: i < 35 ? 0.0001 : 0.02,
      peak: i < 35 ? 0.04 : 0.22,
    })),
  };
  const keys = plan([mark('keys', 'type', 30, { keyFrames: [30, 60] })], { speech: [[28, 65]] }, source)
    .cues[0];
  assert.ok(keys.keyGainOffsets[1] > keys.keyGainOffsets[0] + 2);
  const quiet = plan([mark('a', 'confirm', 30)], { context: 'speech' }).cues[0];
  const hero = plan([mark('a', 'confirm', 30)], { context: 'hero' }).cues[0];
  assert.notEqual(quiet.soundId, hero.soundId);
});
test('only the requested unlocked performance changes and audition alternatives have matched active level', () => {
  const p = plan([mark('one', 'tab', 15), mark('two', 'tab', 75)]);
  const locked = reviseEdit(p, [{ id: 'one', lock: true }], bank);
  const adjusted = reviseEdit(locked, [{ action: 'tab', trimDb: -4 }], bank);
  assert.deepEqual(adjusted.cues[0], locked.cues[0]);
  assert.equal(adjusted.cues[1].gainDb, p.cues[1].gainDb - 4);
  assert.throws(() => reviseEdit(locked, [{ id: 'one', mute: true }], bank), /Unlock/);
  const softened = reviseEdit(locked, [{ id: 'two', character: 'less-bright' }], bank);
  assert.deepEqual(softened.cues[0], locked.cues[0]);
  assert.equal(softened.cues[1].edgeDb, -4);
  const a = p.cues[0],
    alt = reviseEdit(p, [{ id: 'one', soundId: a.alternatives[0] }], bank);
  assert.notEqual(alt.cues[0].gainDb, a.gainDb);
  assert.deepEqual(alt.cues[1], p.cues[1]);
});
test('the scene resolver recognizes listener UI, an explicitly located keyboard, and already authored acoustics', () => {
  const tab = src('settings-tab-walnut-detent');
  assert.equal(cuePlacement(tab, 'tab traveling past listener', true).motion, 'listener-fixed');
  assert.equal(
    cuePlacement(src('propeller-flyby'), 'propeller flying past listener', true).motion,
    'in-source',
  );
  assert.ok(geometryConflict(src('distant-thunder-across-a-lake'), { acoustics: { distanceM: 900 } }));
  assert.ok(geometryConflict(src('arcade-marksman-long-canyon-echo'), { placement: { room: 'hangar' } }));
  const key = src('laptop-scissor-keyboard-key-down');
  const layer = { query: key.id, label: 'desk', placement: { kind: 'point', position: [2, 0, -1] } };
  const brief = { id: 'desk', schemaVersion: 2, scope: 'world', layers: [layer] };
  assert.equal(resolveListeningBrief(brief, bank).design?.layers[0].placement.kind, 'point');
  assert.equal(
    resolveListeningBrief({ ...brief, layers: [{ ...layer, query: tab.id }] }, bank).decision,
    'review',
  );
});
