# AP CSA Unit 2 Bootcamp

A focused, offline AP Computer Science A Unit 2 bootcamp for selection, iteration, Boolean logic, Strings, debugging, and AP-style free response. The site uses plain HTML, CSS, and JavaScript with no build step, external libraries, APIs, or account system.

## Run locally

Open [`U2bootcamp.html`](./U2bootcamp.html) in a browser. Keep `style.css` and `script.js` beside the HTML file. Progress is saved in this browser's local storage and is not shared with a teacher or other devices.

## Student areas

- **Home dashboard** — XP, badges, mission progress, FRQ entry, and the final challenge.
- **Missions** — eleven lessons, each following Lesson Content → Guided Examples → Guided Practice → Independent Practice → one fixed Mission Challenge → Mission Reflection. The challenge is a mission-specific scenario, not randomized.
- **FRQ Commander Center** — five increasingly demanding levels from guided algorithm analysis through a final String-parser simulation. Students may access every level; difficulty is communicated by the ordered progression, not unlock requirements.
- **Final Challenge** — a 50-question bank with 15 Easy, 15 Moderate, 10 Advanced, and 10 AP Style questions. Each attempt draws 8, 8, 6, and 3 questions from those groups, respectively. The 25 selected questions remain fixed for that attempt.
- **Teacher Dashboard** — a local-only summary of this browser's mission, FRQ, final-challenge, XP, and practice progress.

Final Challenge results include percent correct, score, difficulty and topic breakdowns, strongest and weakest topics, and a suggested mission review. The review provides the correct answer, explanation, related mission, FRQ skill, and step-by-step reasoning for every question.

After each FRQ submission, the Canonical Solution Center shows the student's self-assessed rubric score, rubric breakdown, side-by-side student/model solutions, common mistakes, walkthrough, AP Reader Notes, and a reflection. Color indicators describe the student's rubric self-assessment; the site does not semantically grade or compile Java.

## Implementation notes

- [`script.js`](./script.js) contains the curriculum, question banks, scoring, rendering, local-storage state, FRQ activities, and teacher summary.
- [`style.css`](./style.css) contains the responsive design and component styles.
- [`U2bootcamp.html`](./U2bootcamp.html) provides the page structure and loads the stylesheet and script.
- The local-storage key is `centennial-apcsa-unit2-xp-academy-v1`. Clearing this site's browser storage resets saved progress.
- Mission and final-challenge results are readiness indicators only. Teachers make PBIS and grade-recovery decisions.

For a JavaScript syntax check, run `node --check APCSA/Unit2/script.js` from the repository root.
