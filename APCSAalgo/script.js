/* =========================================================
   AP CSA Algorithm Survival Camp
   Each algorithm is written as a JavaScript *generator*:
   every `yield` is one visual step, so the same Visualizer
   class can step/auto-play/reset any algorithm.
   ========================================================= */

/* ---------- Helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/* ---------- Progress tracking (saved in localStorage) ---------- */
const sections = $$('main section[data-title]');
const completed = new Set(JSON.parse(localStorage.getItem('apcsaDone') || '[]'));

function markComplete(id) {
  completed.add(id);
  updateProgress();
}
function updateProgress() {
  localStorage.setItem('apcsaDone', JSON.stringify([...completed]));
  const total = sections.length;
  $('#progText').textContent = `${completed.size} / ${total} complete`;
  $('#progBar').style.width = (completed.size / total * 100) + '%';
  $$('#navLinks a').forEach(a => a.classList.toggle('done', completed.has(a.dataset.id)));
  $$('button.complete').forEach(b => {
    const done = completed.has(b.dataset.id);
    b.classList.toggle('on', done);
    b.textContent = done ? '✓ Completed' : 'Mark section complete';
  });
}

/* Build nav links and a "mark complete" button per section */
sections.forEach(sec => {
  const a = document.createElement('a');
  a.href = '#' + sec.id; a.textContent = sec.dataset.title; a.dataset.id = sec.id;
  $('#navLinks').appendChild(a);
  const foot = $('.foot', sec);
  if (foot && sec.id !== 'takeaway') {
    const b = document.createElement('button');
    b.className = 'complete ghost'; b.dataset.id = sec.id;
    b.onclick = () => completed.has(sec.id) ? (completed.delete(sec.id), updateProgress()) : markComplete(sec.id);
    foot.appendChild(b);
  }
});
// The banner counts as complete when the student scrolls to it
new IntersectionObserver((es, ob) => es.forEach(e => {
  if (e.isIntersecting) { markComplete('takeaway'); ob.disconnect(); }
}), { threshold: .6 }).observe($('#takeaway'));

/* Fade sections in on scroll + highlight active nav link */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) {
    e.target.classList.add('show');
    $$('#navLinks a').forEach(a => a.classList.toggle('active', a.dataset.id === e.target.id));
  }
}), { threshold: .15 });
sections.forEach(s => io.observe(s));

/* ---------- Syntax highlighting (single-pass tokenizer) ---------- */
const TOKEN = new RegExp([
  '(\\/\\/.*)',                                   // 1 comment
  '("(?:[^"\\\\]|\\\\.)*"|`(?:[^`\\\\]|\\\\.)*`)', // 2 string
  '\\b(int|double|boolean|void|public|static|String|let|const|function|new|class)\\b', // 3 type/decl
  '\\b(for|while|if|else|return)\\b',             // 4 keyword
  '\\b(\\d+)\\b',                                 // 5 number
  '\\b([A-Za-z_]\\w*)(?=\\()'                     // 6 function call
].join('|'), 'g');

function highlight(code) {
  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  let out = '', last = 0, m;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(code))) {
    out += esc(code.slice(last, m.index));
    const cls = m[1] ? 'c' : m[2] ? 's' : m[3] ? 't' : m[4] ? 'k' : m[5] ? 'n' : 'f';
    out += `<span class="${cls}">${esc(m[0])}</span>`;
    last = m.index + m[0].length;
  }
  return out + esc(code.slice(last));
}
$$('pre[data-lang]').forEach(p => { p.innerHTML = highlight(p.textContent); });

/* Java / JavaScript tabs */
$$('.tabs').forEach(tabs => {
  const pres = $$('pre', document.getElementById(tabs.dataset.for));
  pres.forEach((p, i) => {
    const b = document.createElement('button');
    b.textContent = p.dataset.lang;
    b.onclick = () => {
      pres.forEach((q, j) => q.classList.toggle('hidden', j !== i));
      $$('button', tabs).forEach((x, j) => x.classList.toggle('on', j === i));
    };
    tabs.appendChild(b);
  });
  $('button', tabs).click();
});

/* Reflection answers: reveal after clicking */
$$('.reflect').forEach(d => {
  const ans = $('.ans', d);
  const btn = document.createElement('button');
  btn.className = 'ghost'; btn.style.marginTop = '8px'; btn.textContent = 'Reveal answer';
  btn.onclick = () => ans.classList.add('open');
  d.insertBefore(btn, ans);
});

/* =========================================================
   Visualizer: renders an array + stats and steps a generator
   ========================================================= */
class Visualizer {
  /**
   * opts: { id, section, arr, stats:[labels], makeGen(ctx), legend:[[color,label]],
   *         input:{placeholder,default}, finishText }
   */
  constructor(opts) {
    this.o = opts;
    this.root = document.getElementById(opts.id);
    this.timer = null;
    this.build();
    this.reset();
  }
  build() {
    const o = this.o;
    this.root.innerHTML = `
      <div class="array"></div>
      <div class="msg"></div>
      <div class="stats">${o.stats.map(s => `<div class="stat"><span>${s}</span><strong>–</strong></div>`).join('')}</div>
      <div class="legend">${o.legend.map(([c, l]) => `<span><i style="background:${c}"></i>${l}</span>`).join('')}</div>
      <div class="controls">
        ${o.input ? `<input type="number" placeholder="${o.input.placeholder}" value="${o.input.default}">` : ''}
        <button class="step">${o.stepLabel || 'Step Forward'}</button>
        <button class="auto ghost">▶ Auto Play</button>
        <button class="rst ghost">↺ Reset</button>
      </div>`;
    this.arrayEl = $('.array', this.root);
    this.msgEl = $('.msg', this.root);
    this.statEls = $$('.stat strong', this.root);
    this.input = $('input', this.root);
    $('.step', this.root).onclick = () => { this.stop(); this.step(); };
    $('.auto', this.root).onclick = () => this.toggleAuto();
    $('.rst', this.root).onclick = () => this.reset();
    if (this.input) this.input.onchange = () => this.reset();
  }
  reset() {
    this.stop();
    this.finished = false;
    const target = this.input ? Number(this.input.value) : null;
    this.gen = this.o.makeGen({ arr: [...this.o.arr], target });
    this.render({ arr: this.o.arr, cls: {}, stats: this.o.stats.map(() => '–'), msg: 'Press the button to begin.' });
  }
  step() {
    if (this.finished) return false;
    const { value, done } = this.gen.next();
    if (done) { this.finished = true; return false; }
    this.render(value);
    if (value.done) {
      this.finished = true;
      this.stop();
      markComplete(this.o.section); // finishing a visualization completes the section
    }
    return true;
  }
  toggleAuto() {
    if (this.timer) return this.stop();
    if (this.finished) this.reset();
    $('.auto', this.root).textContent = '⏸ Pause';
    this.timer = setInterval(() => { if (!this.step()) this.stop(); }, 900);
  }
  stop() {
    clearInterval(this.timer); this.timer = null;
    const a = $('.auto', this.root); if (a) a.textContent = '▶ Auto Play';
  }
  /* Draw one frame: cls maps index -> css classes, ptr maps index -> pointer label */
  render({ arr, cls = {}, ptr = {}, stats, msg }) {
    this.arrayEl.innerHTML = arr.map((v, i) => `
      <div class="cell ${cls[i] || ''}">
        <div class="ptr">${ptr[i] || ''}</div>
        <div class="box">${v}</div>
        <div class="idx">[${i}]</div>
      </div>`).join('');
    stats.forEach((s, i) => this.statEls[i].textContent = s);
    this.msgEl.textContent = msg;
  }
}

/* ---------- Algorithm generators ---------- */

/* Traversal: visit index 0 .. length-1 (like for i = 0; i < length; i++) */
function* traversalGen({ arr }) {
  for (let i = 0; i < arr.length; i++) {
    yield { arr, cls: { [i]: 'compare' }, stats: [i, arr[i], i + 1],
            msg: `Visiting student ${i}: value ${arr[i]}` };
  }
  yield { arr, cls: Object.fromEntries(arr.map((_, i) => [i, 'sorted'])), stats: ['done', '–', arr.length],
          msg: `Loop ended: i = ${arr.length} fails i < arr.length. Every item was visited!`, done: true };
}

/* Max/Min selection: keep a "best so far", compare each new element.
   better(a,b) decides whether a beats b. */
function selectionGen(better, word, finalWord) {
  return function* ({ arr }) {
    let best = 0, comps = 0;
    yield { arr, cls: { 0: 'best' }, stats: [arr[0], arr[0], 0],
            msg: `Start by assuming the first value (${arr[0]}) is the ${word}.` };
    for (let i = 1; i < arr.length; i++) {
      comps++;
      yield { arr, cls: { [best]: 'best', [i]: 'compare' }, stats: [arr[i], arr[best], comps],
              msg: `Is ${arr[i]} ${finalWord} than ${arr[best]}?` };
      if (better(arr[i], arr[best])) {
        best = i;
        yield { arr, cls: { [best]: 'best' }, stats: [arr[i], arr[best], comps],
                msg: `Yes! New best choice: ${arr[best]}` };
      }
    }
    yield { arr, cls: { [best]: 'best' }, stats: ['done', arr[best], comps],
            msg: `Final answer: ${arr[best]} (index ${best}) after ${comps} comparisons.`, done: true };
  };
}

/* Linear search: check each element until target found */
function* linearGen({ arr, target }) {
  let checks = 0;
  for (let i = 0; i < arr.length; i++) {
    checks++;
    yield { arr, cls: { [i]: 'compare' }, stats: [target, i, 'Searching…', checks],
            msg: `Is arr[${i}] (${arr[i]}) == ${target}?` };
    if (arr[i] === target) {
      yield { arr, cls: { [i]: 'found' }, stats: [target, i, 'Found ✅', checks],
              msg: `Found ${target} at index ${i} after ${checks} checks.`, done: true };
      return;
    }
  }
  yield { arr, cls: {}, stats: [target, -1, 'Not Found ❌', checks],
          msg: `Checked all ${checks} items. Return -1.`, done: true };
}

/* Binary search: low/high/mid pointers, array must be sorted */
function* binaryGen({ arr, target }) {
  let low = 0, high = arr.length - 1, steps = 0;
  // everything outside [low, high] is eliminated (gray)
  const frame = (mid, extra = {}) => {
    const cls = {};
    arr.forEach((_, i) => { if (i < low || i > high) cls[i] = 'elim'; });
    if (mid !== null) cls[mid] = extra.found ? 'found' : 'mid';
    const ptr = {};
    if (low <= high) { ptr[low] = 'LOW'; ptr[high] = ptr[high] ? 'L/H' : 'HIGH'; }
    if (mid !== null) ptr[mid] = (ptr[mid] ? ptr[mid] + '+' : '') + 'MID';
    return { cls, ptr };
  };
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    steps++;
    const f = frame(mid);
    yield { arr, ...f, stats: [low, mid, high, steps],
            msg: `mid = (${low}+${high})/2 = ${mid}. Is arr[${mid}] (${arr[mid]}) == ${target}?` };
    if (arr[mid] === target) {
      yield { arr, ...frame(mid, { found: true }), stats: [low, mid, high, steps],
              msg: `Found ${target} at index ${mid} in ${steps} steps!`, done: true };
      return;
    }
    if (arr[mid] < target) {
      low = mid + 1;
      yield { arr, ...frame(null), stats: [low, mid, high, steps],
              msg: `${arr[mid]} < ${target}: eliminate the left half. low = ${low}` };
    } else {
      high = mid - 1;
      yield { arr, ...frame(null), stats: [low, mid, high, steps],
              msg: `${arr[mid]} > ${target}: eliminate the right half. high = ${high}` };
    }
  }
  const cls = Object.fromEntries(arr.map((_, i) => [i, 'elim']));
  yield { arr, cls, stats: [low, '–', high, steps], msg: `low > high: ${target} is not in the array. Return -1.`, done: true };
}

/* Selection sort: nested loops. Outer = pass, inner = find minimum. */
function* sortGen({ arr }) {
  const a = [...arr];
  let comps = 0, swaps = 0;
  const sortedCls = n => Object.fromEntries(Array.from({ length: n }, (_, k) => [k, 'sorted']));
  const stats = pass => [pass, comps, swaps, 'O(n²)'];
  for (let i = 0; i < a.length - 1; i++) {
    let min = i;
    yield { arr: [...a], cls: { ...sortedCls(i), [min]: 'best' }, stats: stats(i + 1),
            msg: `Pass ${i + 1}: assume index ${i} (${a[i]}) is the minimum.` };
    for (let j = i + 1; j < a.length; j++) {
      comps++;
      yield { arr: [...a], cls: { ...sortedCls(i), [min]: 'best', [j]: 'compare' }, stats: stats(i + 1),
              msg: `Is ${a[j]} < current min ${a[min]}?` };
      if (a[j] < a[min]) {
        min = j;
        yield { arr: [...a], cls: { ...sortedCls(i), [min]: 'best' }, stats: stats(i + 1),
                msg: `New minimum: ${a[min]} at index ${min}.` };
      }
    }
    if (min !== i) {
      swaps++;
      yield { arr: [...a], cls: { ...sortedCls(i), [i]: 'swap', [min]: 'swap' }, stats: stats(i + 1),
              msg: `Swap ${a[i]} and ${a[min]}.` };
      [a[i], a[min]] = [a[min], a[i]];
    }
    yield { arr: [...a], cls: sortedCls(i + 1), stats: stats(i + 1),
            msg: `${a[i]} is now in its final place (sorted portion grows).` };
  }
  yield { arr: [...a], cls: sortedCls(a.length), stats: ['done', comps, swaps, 'O(n²)'],
          msg: `Sorted! ${comps} comparisons, ${swaps} swaps.`, done: true };
}

/* ---------- Create all visualizations ---------- */
const L = {
  cmp: ['var(--compare)', 'Comparing'], best: ['var(--select)', 'Best / Found'],
  sorted: ['var(--sorted)', 'Sorted / Visited'], swap: ['var(--swap)', 'Swapping'],
  mid: ['var(--accent2)', 'Middle'], elim: ['var(--elim)', 'Eliminated']
};

new Visualizer({ id: 'viz-traversal', section: 'traversal', arr: [88, 92, 75, 98, 84],
  stats: ['Current Index', 'Current Value', 'Total Iterations'], stepLabel: 'Next Student',
  makeGen: traversalGen, legend: [L.cmp, L.sorted] });

new Visualizer({ id: 'viz-selection', section: 'selection', arr: [5, 8, 6, 10, 7],
  stats: ['Current Value', 'Current Best Choice', 'Comparison Counter'],
  makeGen: selectionGen((a, b) => a > b, 'tallest', 'taller'), legend: [L.cmp, L.best] });

new Visualizer({ id: 'viz-max', section: 'max', arr: [88, 92, 75, 98, 84],
  stats: ['Checking', 'Current Maximum', 'Comparisons'],
  makeGen: selectionGen((a, b) => a > b, 'maximum', 'greater'), legend: [L.cmp, L.best] });

new Visualizer({ id: 'viz-min', section: 'min', arr: [12, 7, 15, 4, 9],
  stats: ['Checking', 'Current Minimum', 'Comparisons'],
  makeGen: selectionGen((a, b) => a < b, 'minimum (cheapest)', 'cheaper'), legend: [L.cmp, L.best] });

new Visualizer({ id: 'viz-linear', section: 'linear', arr: [12, 8, 22, 14, 30],
  stats: ['Target', 'Current Index', 'Result', 'Total Checks'],
  input: { placeholder: 'Target', default: 14 }, makeGen: linearGen, legend: [L.cmp, L.best] });

new Visualizer({ id: 'viz-binary', section: 'binary', arr: [10, 20, 30, 40, 50, 60, 70, 80, 90],
  stats: ['Low', 'Mid', 'High', 'Steps Taken'],
  input: { placeholder: 'Target', default: 70 }, makeGen: binaryGen, legend: [L.mid, L.best, L.elim] });

new Visualizer({ id: 'viz-sort', section: 'sort', arr: [64, 25, 12, 22, 11],
  stats: ['Current Pass', 'Comparisons', 'Swaps', 'Time Complexity'],
  makeGen: sortGen, legend: [L.cmp, L.best, L.swap, L.sorted] });

/* =========================================================
   Ultimate Challenge: Student Data Analyzer
   ========================================================= */
let grades = [88, 92, 75, 98, 84, 71, 95];
$('#gradesCode').textContent = `let grades = [${grades.join(', ')}];`;

/* Each task is a small reusable function returning a [label, value] pair */
const tasks = {
  display: () => ['All grades', grades.join(', ')],
  max: () => {                       // selection: highest
    let m = grades[0];
    for (const g of grades) if (g > m) m = g;
    return ['Highest grade', m];
  },
  min: () => {                       // selection: lowest
    let m = grades[0];
    for (const g of grades) if (g < m) m = g;
    return ['Lowest grade', m];
  },
  avg: () => {                       // traversal with accumulator
    let sum = 0;
    for (const g of grades) sum += g;
    return ['Average', (sum / grades.length).toFixed(2)];
  },
  above90: () => {                   // traversal with counter
    let c = 0;
    for (const g of grades) if (g > 90) c++;
    return ['Grades above 90', c];
  },
  search: () => {                    // linear search
    const raw = $('#anTarget').value;
    if (raw === '') return ['Search', 'Enter a grade first'];
    const t = Number(raw);
    let idx = -1;
    for (let i = 0; i < grades.length; i++) if (grades[i] === t) { idx = i; break; }
    return [`Search for ${t}`, idx >= 0 ? `Found at index ${idx}` : 'Not found (-1)'];
  },
  sort: () => {                      // selection sort on a copy
    const a = [...grades];
    for (let i = 0; i < a.length - 1; i++) {
      let m = i;
      for (let j = i + 1; j < a.length; j++) if (a[j] < a[m]) m = j;
      [a[i], a[m]] = [a[m], a[i]];
    }
    return ['Sorted (ascending)', a.join(', ')];
  }
};
const shownTasks = new Set();
function runTask(name) {
  const [label, value] = tasks[name]();
  const box = $('#results');
  let card = $(`[data-r="${name}"]`, box);
  if (!card) { card = document.createElement('div'); card.className = 'res'; card.dataset.r = name; box.appendChild(card); }
  card.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
  shownTasks.add(name);
  if (['display','max','min','avg','above90','sort'].every(t => shownTasks.has(t)) && shownTasks.has('search')) markComplete('challenge');
}
$$('[data-task]').forEach(b => b.onclick = () => runTask(b.dataset.task));
$('#runAll').onclick = () => Object.keys(tasks).forEach(runTask);
$('#clearAll').onclick = () => { $('#results').innerHTML = ''; shownTasks.clear(); };

updateProgress();
