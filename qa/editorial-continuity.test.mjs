import assert from 'node:assert/strict';
import test from 'node:test';
import { execFileSync } from 'node:child_process';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { planEdit, reviseEdit } from '../scripts/edit-score.mjs';
import { approvedProfile } from '../scripts/edit-family.mjs';
import { reconform } from '../scripts/edit-recut.mjs';
import { contactProbes } from '../scripts/edit-contacts.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
const bank = JSON.parse(await readFile(join(root, 'catalog.json'))).sounds;
const cut = (events, extra = {}) => ({ id: 'continuity', fps: 24, durationFrames: 240, events, ...extra });
const event = (id, action, frame, extra = {}) => ({ id, action, frame, ...extra });
test('one physical control keeps its take across changes of screen and narration', () => {
  const timeline = cut(
    [
      event('a', 'tab', 20, { device: 'trackpad' }),
      event('b', 'confirm', 80, { device: 'trackpad' }),
      event('c', 'press', 110, { device: 'trackpad' }),
      event('phone', 'confirm', 140, { device: 'touch', feedback: 'subtle' }),
    ],
    { speech: [[70, 99]] },
  );
  const [a, b, c, phone] = planEdit(timeline, bank).cues;
  assert.equal(a.soundId, 'glass-trackpad-press');
  assert.equal(a.soundId, b.soundId);
  assert.equal(b.soundId, c.soundId);
  assert.equal(a.seed, c.seed);
  assert.equal(b.gainDb, a.gainDb - 6);
  assert.equal(phone.soundId, 'settings-focus-felt-tick');
});
test('a project profile exported from an approval survives disk, recut and direct search', async () => {
  const tmp = await mkdtemp(join(tmpdir(), 'lumina-profile-test-'));
  try {
    const original = cut([event('one', 'tab', 24, { target: 'preferences' })]);
    const base = planEdit(original, bank);
    const replacement = base.cues[0].alternatives[0];
    const approved = reviseEdit(
      base,
      [{ id: 'one', soundId: replacement, trimDb: -2, shiftFrames: 2, lock: true }],
      bank,
    );
    const profile = approvedProfile(approved);
    assert.equal(profile.signatures.tab.id, replacement);
    const profilePath = join(tmp, 'profile.json');
    await writeFile(join(tmp, 'approved.json'), JSON.stringify(approved));
    execFileSync(
      process.execPath,
      ['scripts/score-edit.mjs', 'profile', join(tmp, 'approved.json'), '--out', profilePath],
      { cwd: root },
    );
    const selected = JSON.parse(
      execFileSync(process.execPath, ['scripts/choose.mjs', 'settings tab', '--profile', profilePath], {
        cwd: root,
      }),
    );
    assert.equal(selected.cues[0].id, replacement);
    const newCut = cut([event('new', 'tab', 104, { target: 'preferences' })], { fps: 48 });
    const next = planEdit(newCut, bank, profile);
    const preserved = reconform(approved, next, newCut, bank);
    assert.deepEqual(preserved.recut.retained, ['new']);
    assert.equal(preserved.cues[0].seed, approved.cues[0].seed);
    assert.equal(preserved.cues[0].syncFrame, 108);
    assert.equal(preserved.cues[0].projectTrimDb, -2);
    const ambiguous = cut([
      event('new', 'tab', 24, { target: 'preferences' }),
      event('other', 'tab', 76, { target: 'preferences' }),
    ]);
    assert.ok(
      reconform(approved, planEdit(ambiguous, bank), ambiguous, bank).cues.every(
        (c) => c.decision === 'review',
      ),
    );
  } finally {
    await rm(tmp, { recursive: true, force: true });
  }
});
test('repeated original taps require a matching device and editor-confirmed reference', () => {
  const events = [
    event('constructor', 'press', 12, { device: 'mouse', sourceContact: true }),
    event('second', 'press', 24, { device: 'mouse' }),
    event('other', 'press', 36, { device: 'trackpad' }),
  ];
  const source = new Float32Array(24000);
  for (const f of [12, 24, 36])
    for (let j = 0; j < 75; j++) source[f * 500 + j] = 0.5 * Math.cos(j * 1.24) * Math.exp(-j / 14);
  const detector = contactProbes(events, 24);
  for (let i = 0; i < source.length; i += 337) detector.write(source.subarray(i, i + 337), i);
  const contacts = detector.finish();
  assert.equal(contacts.second[0].decision, 'reuse');
  assert.equal(contacts.other[0].decision, 'review');
  const p = planEdit(cut(events), bank, {}, {}, { windows: [], contacts });
  assert.deepEqual(
    p.cues.map((c) => c.decision),
    ['reuse', 'reuse', 'review'],
  );
  assert.equal(
    reviseEdit(p, [{ id: 'other', sourceDecision: 'add', lock: true }], bank).cues[2].decision,
    'play',
  );
});
test('plain brief qualifiers survive into the performance, including speech and original contact', () => {
  const p = planEdit(
    cut([
      { id: 'key', frame: 12, brief: 'mechanical keyboard click during a spoken walkthrough' },
      { id: 'reuse', frame: 80, action: 'press', brief: 'keep the original click' },
    ]),
    bank,
  );
  assert.equal(p.cues[0].soundId, 'gasket-mount-keyboard-key-down');
  assert.equal(p.cues[0].context, 'speech');
  assert.equal(p.cues[1].decision, 'reuse');
});
