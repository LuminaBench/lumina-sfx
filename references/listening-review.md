# Listening review

The [catalog](../catalog.json) describes the full library. [Queue tickets](../tasks/queue.json) marked `ready` describe sounds to build. A ticket marked `review` has a local recipe and a `collection` such as Weather or Animals. Quick review prioritizes higher revisions, then uses file order.

## Prepare a collection

- Start with the user's recent review decisions. Run `npm run --silent review:summary` for accepted references, pending cues, and yes/no results by collection. Check the sample size before interpreting an approval rate.
- Weather is a proven family in this studio. Start from `light-rain-loop`, `heavy-storm-rain-loop`, `howling-wind-loop`, and `close-lightning-thunder`. Vary surface, drop density, gust pacing, distance, and perspective. Keep beds irregular and protect the loop seam.
- Preserve the difference between a quiet texture and a loud event. Use `targetRmsDbfs` when a cue needs a deliberate level relative to its peers. Keep playback and export at the same target.
- Make each new candidate recognizable by its timing or material in an audio-only audition. Give gun reports a clear transient, give crashes separate impact and material phases, and give animal calls species-specific phrasing. For futuristic devices and energy weapons, author original timbres and cues.
- Prioritize one clear game event per cue. For Wakefall start with quiet seed handling, planting, watering, picking, crop prep, livestock care, and farm habitats. Use nearby accepted recordings as references. Keep the [roadmap](../tasks/ROADMAP.md) and collection sizes in view.
- Run per-sound QA and test parameter limits before marking a candidate `review`. Generate the catalog after adding or changing recipes.

## Use recorded audio

For a sound that needs instant real-world recognition, prefer an isolated field recording when a trustworthy source labels the exact item CC0 1.0 or public domain. Confirm the license on the asset page and check that the uploader created or can release the recording. Record its title, author, original URL, license, and verification date. Use original synthesis for fictional or stylized cues.

Trim human voices, handling noise, and competing sounds. Keep a natural onset and enough tail for the material or call to read. Keep edits reversible until the cue passes technical and listening checks. For alternate takes, preserve the differences in the source performance. Finish in mono 16-bit PCM and run `node scripts/pack-recording.mjs` with the source credit and the edited takes. Store its output at `recipes/_recordings/<cue-id>.ts`. Import that file, use `renderRecording` from `engine/recording.ts`, and expose the credit with `recording: recording.credit`. For loops, include the renderer's continuation frames in the packed file.

For a composite with more than one credited source, list each supplemental credit in `additionalRecordings`. For quiet hand actions, preserve the naturally spaced individual contacts and use only enough layering to clarify the material.

Use Gemini 4 Neon via Antigravity alongside the work. Ask for an edit or reference review using public recordings and measurements. When its interface only accepts text or images, use waveforms and spectrograms and describe the feedback as inferred. Verify licenses and sound outputs independently.

## Run a listening pass

Open Quick review in the local studio. Start listening if the browser requires a gesture. Each Yes or No saves the decision and automatically plays the next unheard cue. Y and N match the buttons, and Space replays. Use the Soundboard when a rejection needs a written note.

When revising a reviewed sound, advance its ticket `revision` after QA so the new version returns to Quick review. Unversioned votes count as revision 1. The older decision stays in the feedback history. Use accepted sounds as the next batch's references. A No with no note identifies a result to revisit. Compare the cue to accepted examples before deciding what to change. Use listening results from several batches to identify repeatable families and bring uncertain sounds forward. User decisions in `tasks/feedback.json` are the source of truth for listening approval.
