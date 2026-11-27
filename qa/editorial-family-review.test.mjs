import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { approvedProfile } from '../scripts/edit-family.mjs';
import { planEdit, reviseEdit } from '../scripts/edit-score.mjs';
import { familyPassage } from '../scripts/edit-audition.mjs';
import { applicableVote, listeningVotes, selectionProfile } from '../scripts/selection-profile.mjs';

const {sounds} = JSON.parse(await readFile(new URL('../catalog.json', import.meta.url)));
const timeline = {id:'options', fps:24, durationFrames:360, format:'product',
  events:[10,170,190,209,233].map((frame,i)=>({id:'button-'+i,action:'tab',frame,device:'trackpad'}))};
test('a family ballot compares its densest passage, preserves a recorded tap and carries family silence into a later edit', () => {
  const events = [...timeline.events, {id:'original',action:'tab',device:'trackpad',frame:214,sourceContact:true}];
  const plan = planEdit({...timeline,events}, sounds);
  const signature = plan.cues[0].signature;
  const passage = familyPassage(plan, signature);
  assert.equal(passage.contacts,4);
  assert.ok(passage.start <= 170/24 && passage.end > 233/24);
  const quiet = reviseEdit(plan, [{signature,mute:true,lock:true}],sounds);
  assert.equal(quiet.cues.find(c=>c.id==='original').decision,'reuse');
  const profile = approvedProfile(quiet);
  assert.deepEqual(profile.quietSignatures,[signature]);
  const next = planEdit({...timeline,events},sounds,profile);
  assert.ok(next.cues.every(c=>c.decision === (c.id==='original'?'reuse':'silence')));
  const single = reviseEdit(plan,[{id:'button-0',mute:true,lock:true}],sounds);
  assert.throws(()=>approvedProfile(single));
});

test('compatible listening sessions retain contrary opinions about the same take in different settings', async () => {
  const d = await mkdtemp(join(tmpdir(),'lumina-votes-'));
  try {
    const sound = sounds.find(s=>s.id==='desktop-mouse-press');
    for (const [file,useCase,context,decision] of [
      ['general','game',undefined,'yes'], ['demo','product','speech','no'], ['newer','product','speech','yes'],
    ]) await writeFile(join(d,file),JSON.stringify({votes:{[sound.id]:{revision:sound.revision, useCase,context,decision}}}));
    await writeFile(join(d,'profile'),JSON.stringify({votes:['general','demo']}));
    const profile = await selectionProfile(join(d,'profile'));
    const { votes } = await listeningVotes(profile.votes);
    assert.equal(applicableVote(votes,sound,'product','speech').decision,'no');
    assert.equal(applicableVote(votes,sound,'game','speech').decision,'yes');
    assert.equal(applicableVote(votes,sound,'product','rapid'),undefined);
    assert.equal(applicableVote(votes,{...sound,revision:sound.revision+1},'product','speech'),undefined);
    const press = {id:'p',action:'press',device:'mouse',frame:40};
    const score = speech => planEdit({...timeline, events:[press],speech},sounds,{},votes).cues[0];
    assert.equal(score([]).soundId,sound.id);
    assert.notEqual(score([[36,60]]).soundId,sound.id);
    const revised = (await listeningVotes([...profile.votes,join(d,'newer')])).votes;
    assert.equal(applicableVote(revised,sound,'product','speech').decision,'yes');
  } finally {await rm(d,{recursive:true,force:true});}
});
