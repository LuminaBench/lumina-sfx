import { readFile } from 'node:fs/promises';

const read = async (path) => JSON.parse(await readFile(new URL(path, import.meta.url), 'utf8'));
const [{ tickets }, { reviews }] = await Promise.all([
  read('../tasks/queue.json'),
  read('../tasks/feedback.json').catch((error) => {
    if (error.code === 'ENOENT') return { reviews: {} };
    throw error;
  }),
]);

const batches = new Map();
for (const ticket of tickets.filter((item) => item.status === 'review')) {
  const collection = batches.get(ticket.collection) ?? {
    collection: ticket.collection, candidates: 0, approved: [], rejected: [], pending: [], earlierVotes: [],
  };
  batches.set(ticket.collection, collection);
  collection.candidates++;
  const previous = reviews[ticket.id];
  const earlier = previous?.history ?? [];
  const review = (previous?.revision ?? 1) === (ticket.revision ?? 1) ? previous : undefined;
  if (previous && !review) {
    const { decision, note, revision = 1, updatedAt } = previous;
    collection.earlierVotes.push({ id: ticket.id, decision, note, revision, updatedAt });
  }
  for (const vote of earlier) collection.earlierVotes.push({ id: ticket.id, ...vote });
  if (review?.decision === 'approved') collection.approved.push(ticket.id);
  else if (review?.decision === 'rejected') {
    collection.rejected.push({ id: ticket.id, ...(review.note ? { note: review.note } : {}) });
  } else collection.pending.push(ticket.id);
}

const collections = [...batches.values()].map((batch) => {
  const reviewed = batch.approved.length + batch.rejected.length;
  const approvalRate = reviewed ? batch.approved.length / reviewed : null;
  return { ...batch, reviewed, approvalRate };
});
const current = new Set(tickets.filter((ticket) => ticket.status === 'review').map((ticket) => ticket.id));
const acceptedReferences = Object.entries(reviews)
  .filter(([id, decision]) => !current.has(id) && decision.decision === 'approved')
  .map(([id]) => id);
console.log(JSON.stringify({ collections, acceptedReferences }, null, 2));
