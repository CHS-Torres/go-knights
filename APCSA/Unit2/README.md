# AP CSA Unit 2 XP Academy

An offline practice quest for AP Computer Science A Unit 2: Selection and Iteration. The site uses plain HTML, CSS, and JavaScript; it has no build step, external libraries, APIs, or account system.

## Run locally

Open [`U2bootcamp.html`](./U2bootcamp.html) in a browser. Keep `style.css` and `script.js` beside the HTML file so its linked styles and behavior load correctly. Progress is stored in this browser's local storage and is not shared with a teacher or other devices.

## What's included

- Eleven guided missions covering prerequisites, Boolean logic, selection, loops, Strings, debugging, and algorithm design.
- XP, ranks, mission completion, badges, FRQ unlocks, and a 25-question final challenge.
- An open practice arena with five modes: predict output, trace variables, complete code, fix a bug, and build an algorithm.
- An offline question bank of 164 questions: 40 multiple choice, 40 output prediction, 20 variable tracing, 20 Boolean evaluation, 15 loop algorithms, 15 String algorithms, 10 algorithm-completion questions, and 4 String-method matching questions.
- Progressive hints, explanations, responsive layouts, and a local-only teacher dashboard.

Question choices and question sets are randomized. XP awards are capped at 300 and use increments divisible by 12. FRQ rubrics are self-assessed practice, not official AP scoring or automatic Java compilation.

## Implementation notes

- [`script.js`](./script.js) contains the curriculum, question bank, scoring, rendering, local-storage state, FRQ activities, and teacher summary.
- [`style.css`](./style.css) contains the dark responsive visual design and component styles.
- [`U2bootcamp.html`](./U2bootcamp.html) provides the page structure and loads the stylesheet and script.
- The local-storage key is `centennial-apcsa-unit2-xp-academy-v1`. Clearing this site's browser storage resets saved progress.
- Mission and final-challenge results are readiness indicators only; teachers make PBIS and grade-recovery decisions.

## Validation and review log

- **2026-11-02** — Added the Unit 2 quest page and interactive learning features. Verified the script with `node --check APCSA/Unit2/script.js`.
- **2026-11-02** — Added prerequisite String-method matching and a dedicated algorithm-building question set; formatted escaped code newlines for display and saved practice answers during entry.
- **2026-11-02** — Validated the 164-question bank and required category counts, all five arena modes, matching grading, the final challenge flow, and local-storage persistence using a temporary mocked browser runtime.
- **2026-11-02** — Fixed navigation buttons rendered after page initialization by delegating screen navigation clicks from the document. This includes mission completion and final-result return buttons.
- **2026-11-02** — Added this README to support future review and maintenance.

For a quick syntax check after editing JavaScript, run `node --check APCSA/Unit2/script.js` from the repository root.
