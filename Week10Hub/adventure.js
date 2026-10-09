'use strict';
/* Centennial Knights CS · Week 10 Learning Adventure (enhancement layer).
   Loads AFTER scirpt.js. It only ADDS elements (HQ, missions, XP, badges, tools, certificate) and
   derives progress from the existing lesson checkboxes, quick checks and journals.
   No curriculum text, link, checklist, or example is created, edited, or removed here. */
(() => {
  const LKEY = 'centennial-week10-adventure-layer-v1';
  const h = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const load = () => { try { return JSON.parse(localStorage.getItem(LKEY)) || {}; } catch { return {}; } };
  let L = load();
  const persist = () => { try { localStorage.setItem(LKEY, JSON.stringify(L)); } catch { /* storage unavailable */ } };
  const cl = id => { L.c = L.c || {}; const c = (L.c[id] = L.c[id] || {}); c.tools = c.tools || {}; c.data = c.data || {}; c.opened = c.opened || {}; c.badges = c.badges || {}; return c; };

  const CFG = {
    'ap-csa': {
      icon: '⚔️', short: 'AP CSA Knight Academy', file: 'week10APCSA.html', accent: '#f2b705', accent2: '#9b2335', scene: '🏰 🛡️ ⚔️ 📜',
      academy: 'Knight Academy', homeLine: 'Train as a Java Knight in the castle training grounds.',
      quest: 'Train as a Java Knight: work through your Unit 2 lessons, CodeHS and CodingBat practice, AP Classroom questions, the Space Station FRQ boss battle, and your journal.',
      why: 'Tracing code and writing Java methods are exactly the skills tested on the AP exam.',
      ranks: ['Apprentice', 'Squire', 'Knight', 'Champion Knight', 'Java Master'],
      boardName: 'Mission Board',
      zones: [{ name: '🏰 Training Grounds', items: [0, 1, 2, 3] }, { name: '🐉 Boss Battle: Space Station FRQ', items: ['frq'] }, { name: '🔮 Code Scroll Workshop (bonus)', items: ['tool:trace', 'tool:method', 'tool:var'] }, { name: '📜 Scribe’s Tower', items: ['checklist', 'journal'] }],
      tools: { trace: 'Java Output Prediction: solve all 3 programs', method: 'Method Call Explorer: step to the end', var: 'Variable Tracker: run 3 iterations' },
      ach: [['First Program', '🖥️', 'Finish Unit 2.1', { l: [0] }], ['Loop Master', '🔁', 'Complete the Variable Tracker', { t: ['var'] }], ['Method Warrior', '⚔️', 'Explore a method call', { t: ['method'] }], ['Java Strategist', '♟️', 'Finish Units 2.2–2.4', { l: [1, 2, 3] }], ['Knight Academy Graduate', '🎓', 'Complete every task', 'all']],
      done: ['Congratulations Knight', 'You have completed this week’s Java training.']
    },
    'ap-csp': {
      icon: '🐍', short: 'AP CSP Python Expedition', file: 'week10APCSP.html', accent: '#4fd1a5', accent2: '#2b8a6e', scene: '🗺️ 🧭 ⛰️ 🌲',
      academy: 'Python Expedition', homeLine: 'Explore Python territory from Base Camp to the summit.',
      quest: 'Travel the Python trail: CodeHS Unit 5 functions and parameters, Big Idea 2 digital information, CodingBat Python practice, MCQ review, and your reflection.',
      why: 'Functions, parameters, and data representation are core AP CSP ideas.',
      ranks: ['Explorer', 'Analyst', 'Researcher', 'Innovator', 'Python Pathfinder'],
      boardName: 'Mission Map',
      zones: [{ name: '⛺ Base Camp', items: [0] }, { name: '🌲 Function Forest', items: [1, 2, 3, 'tool:funcsim'] }, { name: '🎒 Parameter Pass', items: [4, 5, 6, 'tool:param'] }, { name: '🕳️ Digital Information Cavern', items: [7, 8, 9, 10, 11, 12, 'tool:lab'] }, { name: '🏔️ Assessment Summit', items: ['checklist', 'journal'] }],
      tools: { funcsim: 'Function Simulator: run it 3 times', param: 'Parameter Explorer: swap the arguments', lab: 'Digital Information Lab: binary targets and a bitmap' },
      ach: [['Function Finder', '🔎', 'Finish the first function lesson', { l: [0] }], ['Parameter Pro', '🎛️', 'Explore parameters', { l: [1], t: ['param'] }], ['Data Explorer', '🧭', 'Finish the Digital Information Lab', { t: ['lab'] }], ['Information Analyst', '📈', 'Finish all Big Idea 2 lessons', { l: [7, 8, 9, 10, 11, 12] }], ['Python Expedition Graduate', '🎓', 'Complete every task', 'all']],
      done: ['Expedition Complete', 'You successfully reached the summit.']
    },
    'ist-csp': {
      icon: '🌐', short: 'IST Web Architect Studio', file: 'week10IST.html', accent: '#5ab0ff', accent2: '#1f6fd1', scene: '🏙️ 📐 🏗️ 💡',
      academy: 'Web Architect Studio', homeLine: 'Build a digital city while constructing a professional website.',
      quest: 'Build your complete website one district at a time: structure, styling, images, tables, career research, references, and your journal.',
      why: 'A real website shows colleges and employers what you can build.',
      ranks: ['Builder', 'Designer', 'Developer', 'Architect', 'Chief Technology Officer'],
      boardName: 'City Districts',
      zones: [{ name: '🧱 District 1: HTML Foundations', items: [0, 1, 3, 'tool:sandbox'] }, { name: '🖼️ District 2: Images and Multimedia', items: [2] }, { name: '📋 District 3: Lists and Tables', items: [4] }, { name: '🎨 District 4: CSS Design', items: [6, 'tool:color', 'tool:layout'] }, { name: '🔍 District 5: Career Research', items: [5] }, { name: '🏆 District 6: Portfolio Showcase', items: [7, 'tool:builder', 'checklist', 'journal'] }],
      tools: { sandbox: 'HTML Sandbox: add an h1, p, and link', color: 'CSS Color Playground: change all 3 colors', layout: 'Layout Challenge Builder: try 2 layouts and lock', builder: 'Live Website Builder: all 9 elements' },
      ach: [['HTML Builder', '🧱', 'Finish the HTML foundations', { l: [0, 1] }], ['Table Master', '📋', 'Finish the Learning Journey table', { l: [4] }], ['CSS Artist', '🎨', 'Finish the styling lesson', { l: [2] }], ['Career Explorer', '🔍', 'Finish Career Exploration', { l: [5] }], ['Portfolio Creator', '🏆', 'Complete every task', 'all']],
      done: ['Digital City Completed', 'Your website is ready for launch.']
    },
    'game-design': {
      icon: '🎮', short: 'Game Design Indie Studio', file: 'week10GD.html', accent: '#c77dff', accent2: '#7b2cbf', scene: '🎮 👾 🕹️ 🚀',
      academy: 'Indie Studio', homeLine: 'Run your own game studio and ship your project.',
      quest: 'Run your studio: pick your Unity or alternative pathway, complete the 7-Day C# activities if needed, explore game careers, keep your development journal, and test.',
      why: 'Shipping a game means planning, building, testing, and documenting, just like real studios.',
      ranks: ['Intern', 'Junior Developer', 'Developer', 'Senior Developer', 'Studio Director'],
      boardName: 'Studio Departments',
      zones: [{ name: '💡 Department 1: Game Concept', items: [0, 1, 'tool:sprint'] }, { name: '⌨️ Department 2: Programming', items: [2, 3, 4, 5, 6, 7, 8] }, { name: '🎨 Department 3: Art and Assets', items: ['tool:gdd'] }, { name: '🧪 Department 4: Testing', items: ['tool:bugs'] }, { name: '📝 Department 5: Documentation', items: ['journal'] }, { name: '🚀 Department 6: Publishing', items: [9, 'checklist'] }],
      tools: { sprint: 'Sprint Planning Board: add 3 cards, finish 1', gdd: 'Design Document Builder: fill 4 sections', bugs: 'Bug Tracker: log 3 bugs' },
      ach: [['First Prototype', '🧩', 'Finish Days 1–2', { l: [2, 3] }], ['Bug Hunter', '🐛', 'Log 3 bugs', { t: ['bugs'] }], ['Creative Designer', '🎨', 'Build your design document', { t: ['gdd'] }], ['Lead Tester', '🧪', 'Finish the sprint and Day 7', { t: ['sprint'], l: [8] }], ['Studio Director', '👑', 'Complete every task', 'all']],
      done: ['Game Studio Milestone Reached', 'Your project has advanced to the next stage.']
    }
  };
  const ORDER = ['ap-csa', 'ap-csp', 'ist-csp', 'game-design'];
  const TIERS = [['Bronze', '🥉', 20], ['Silver', '🥈', 40], ['Gold', '🥇', 60], ['Platinum', '💎', 80], ['Master', '👑', 100]];
  const RANK_AT = [0, .2, .4, .65, .9];
  const TOOL_XP = 150;
  const courseId = document.body.dataset.coursePage || null;

  const page = id => document.getElementById(`${id}-page`);
  const lessons = id => $$('details.lesson', page(id));
  const panelByHeading = (id, re) => $$('.panel', page(id)).find(p => { const hd = $('h2', p); return hd && re.test(hd.textContent); });

  /* Each lesson/panel gets a stable anchor id (additive attribute only). */
  function tagAnchors(id) {
    lessons(id).forEach(d => { if (!d.id) d.id = d.dataset.open || `${id}-lesson-${lessons(id).indexOf(d)}`; });
    const f = $('.frq-panel', page(id)); if (f && !f.id) f.id = `${id}-frq`;
    const c = panelByHeading(id, /weekly completion checklist/i); if (c && !c.id) c.id = `${id}-checklist`;
    const j = panelByHeading(id, /journal/i); if (j && !j.id) j.id = `${id}-journal`;
  }

  /* ---------- progress model ---------- */
  function resolveItem(id, ref) {
    const pg = page(id), cfg = CFG[id], st = cl(id);
    if (typeof ref === 'number') {
      const d = lessons(id)[ref]; if (!d) return null;
      const checks = $$('input[data-check]', d);
      return { ref, kind: 'lesson', el: d, title: $('summary', d).textContent.trim(), total: checks.length, done: checks.filter(c => c.checked).length, ico: '📘', complete: checks.length ? checks.every(c => c.checked) : !!st.opened[d.id] };
    }
    if (ref === 'frq') {
      const el = $('.frq-panel', pg); if (!el) return null;
      const checks = $$('input[data-check]', el), main = checks.find(c => /frq-complete$/.test(c.dataset.check));
      return { ref, kind: 'frq', el, title: 'AP-style practice FRQ: Space Station Supply System', total: checks.length, done: checks.filter(c => c.checked).length, ico: '🐉', complete: main ? main.checked : checks.every(c => c.checked), boss: true };
    }
    if (ref === 'checklist') {
      const el = panelByHeading(id, /weekly completion checklist/i); if (!el) return null;
      const checks = $$('input[data-check]', el);
      return { ref, kind: 'checklist', el, title: 'Weekly completion checklist', total: checks.length, done: checks.filter(c => c.checked).length, ico: '✅', complete: checks.length > 0 && checks.every(c => c.checked) };
    }
    if (ref === 'journal') {
      const el = panelByHeading(id, /journal/i); if (!el) return null;
      const tas = $$('.journal-field textarea', el), filled = tas.filter(t => t.value.trim().length >= 20).length;
      return { ref, kind: 'journal', el, title: $('h2', el).textContent.trim(), total: tas.length, done: filled, ico: '✍️', complete: tas.length > 0 && filled === tas.length };
    }
    if (typeof ref === 'string' && ref.startsWith('tool:')) {
      const key = ref.slice(5), done = !!st.tools[key];
      return { ref, kind: 'tool', el: $('#adv-tools'), title: cfg.tools[key], total: 1, done: done ? 1 : 0, ico: '🧰', complete: done, bonus: true, xp: TOOL_XP };
    }
    return null;
  }

  function xpEntries(id) {
    const pg = page(id), st = cl(id), out = [];
    $$('input[data-check]', pg).forEach(c => {
      const inFrq = c.closest('.frq-panel'), inCheck = c.closest('ul.checklist'), inLesson = c.closest('details.lesson');
      let xp = 50;
      if (inFrq) xp = /frq-complete$/.test(c.dataset.check) ? 100 : 25;
      else if (inCheck) xp = 25;
      else if (inLesson && $('.exercise-list', inLesson)) xp = 75;
      out.push({ xp, earned: c.checked });
    });
    lessons(id).forEach(d => out.push({ xp: 10, earned: !!st.opened[d.id] || $$('input[data-check]', d).some(c => c.checked) }));
    $$('.quick-check', pg).forEach(q => out.push({ xp: 25, earned: !!$('.quick-check-feedback.correct', q) }));
    $$('.journal-field textarea', pg).forEach(t => out.push({ xp: 25, earned: t.value.trim().length >= 20 }));
    const radios = $$('.journal-field input[type=radio]', pg); if (radios.length) out.push({ xp: 10, earned: radios.some(r => r.checked) });
    Object.keys(CFG[id].tools).forEach(k => out.push({ xp: TOOL_XP, earned: !!st.tools[k] }));
    return out;
  }

  function compute(id) {
    const cfg = CFG[id], st = cl(id), e = xpEntries(id);
    const total = e.reduce((a, x) => a + x.xp, 0), xp = e.reduce((a, x) => a + (x.earned ? x.xp : 0), 0);
    const checks = $$('input[data-check]', page(id)), done = checks.filter(c => c.checked).length;
    const pct = checks.length ? Math.round(done / checks.length * 100) : 0;
    const frac = total ? xp / total : 0;
    let rank = 0; RANK_AT.forEach((f, i) => { if (frac >= f - 1e-9) rank = i; });
    if (xp === 0) rank = 0;
    const cuts = RANK_AT.map(f => Math.round(total * f));
    const zones = cfg.zones.map(z => {
      const items = z.items.map(r => resolveItem(id, r)).filter(Boolean);
      const t = items.reduce((a, i) => a + (i.total || 1), 0), d = items.reduce((a, i) => a + Math.min(i.done, i.total || 1), 0);
      const core = items.filter(i => !i.bonus);
      return { name: z.name, items, pct: t ? Math.round(d / t * 100) : 0, complete: core.length ? core.every(i => i.complete) : items.every(i => i.complete) };
    });
    const lessonDone = n => { const i = resolveItem(id, n); return !i || i.complete; };
    const ach = cfg.ach.map(a => {
      const rule = a[3];
      if (rule === 'all') return pct === 100;
      return (rule.l || []).every(lessonDone) && (rule.t || []).every(k => st.tools[k]);
    });
    const tiers = TIERS.map(t => Math.round(frac * 100) >= t[2]);
    return { id, xp, total, pct, done, checkTotal: checks.length, rank, rankName: cfg.ranks[rank], toNext: rank < 4 ? cuts[rank + 1] - xp : 0, nextRank: cfg.ranks[rank + 1], zones, ach, tiers, frac };
  }

  /* ---------- celebration ---------- */
  function toast(msg, big) {
    const t = document.createElement('div'); t.className = 'adv-toast' + (big ? ' big' : ''); t.textContent = msg; t.setAttribute('role', 'status');
    document.body.append(t); setTimeout(() => t.remove(), 2200);
  }
  function confetti() {
    if ((window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
    const cols = ['#f2b705', '#ffffff', '#5ab0ff', '#3ddc97', '#ff6b6b', '#c77dff'];
    for (let i = 0; i < 70; i++) {
      const e = document.createElement('i'); e.className = 'adv-confetti'; e.setAttribute('aria-hidden', 'true');
      e.style.left = Math.random() * 100 + 'vw'; e.style.background = cols[i % cols.length];
      e.style.animationDuration = 2 + Math.random() * 2 + 's'; e.style.animationDelay = Math.random() * .6 + 's';
      document.body.append(e); setTimeout(() => e.remove(), 5000);
    }
  }
  const motive = p => p === 100 ? '🏆 Legendary! You finished everything.' : p >= 75 ? '🔥 Almost there. Finish strong!' : p >= 50 ? '🚀 Halfway! Keep the momentum.' : p >= 25 ? '💪 Great start. Keep going.' : p > 0 ? '🌱 Every task counts. Nice start!' : '👋 Ready? Start with the first mission.';

  /* ---------- navigation helper ---------- */
  function jump(el) {
    if (!el) return;
    const d = el.matches('details') ? el : null;
    if (d) d.open = true;
    el.scrollIntoView({ behavior: (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) ? 'auto' : 'smooth', block: 'start' });
    const f = d ? $('summary', d) : $('h2', el) || el;
    if (f) { if (!f.hasAttribute('tabindex') && f.tagName !== 'SUMMARY') f.setAttribute('tabindex', '-1'); f.focus({ preventScroll: true }); }
  }
  document.addEventListener('click', ev => {
    const a = ev.target.closest('[data-adv-jump]'); if (!a) return;
    ev.preventDefault();
    const t = document.getElementById(a.dataset.advJump);
    if (t && t.matches('details')) t.open = true;
    if (t && t.id === 'adv-tools') t.open = true;
    jump(t);
    const sb = $('#sidebar'); if (sb) sb.classList.remove('open');
  });

  /* ---------- HOME ---------- */
  function enhanceHome() {
    document.body.classList.add('adv', 'adv-home');
    const home = $('#home-page'); if (!home || $('.adv-banner', home)) return;
    home.insertAdjacentHTML('afterbegin', `<div class="adv-banner"><p class="adv-kicker">Centennial Knights Computer Science</p><p class="adv-title">Week 10 Learning Adventure</p><p class="adv-sub">Choose Your Learning Pathway</p><p class="adv-hint">Pick only <strong>your</strong> course. Earn XP, climb the ranks, and unlock badges. Progress saves automatically in this browser.</p></div>`);
    $$('.course-card', home).forEach(card => {
      const id = ORDER.find(k => card.getAttribute('href') === CFG[k].file); if (!id) return;
      const c = CFG[id];
      card.classList.add('adv-card', `theme-${id}`); card.style.setProperty('--ac', c.accent);
      card.insertAdjacentHTML('afterbegin', `<span class="adv-card-icon" aria-hidden="true">${c.icon}</span>`);
      $('p', card).insertAdjacentHTML('afterend', `<span class="adv-card-adv"><strong>${h(c.short)}</strong> · ${h(c.homeLine)}</span><span class="adv-card-stats" data-adv-card="${id}"></span>`);
      $('.card-bottom', card).insertAdjacentHTML('beforeend', '<span class="adv-cta" data-adv-cta></span>');
    });
    $$('.dashboard-card', home).forEach(card => {
      const bar = $('[data-dashboard-bar]', card); if (!bar) return;
      card.insertAdjacentHTML('beforeend', `<p class="adv-dash-xp" data-adv-dash="${bar.dataset.dashboardBar}"></p>`);
    });
    document.addEventListener('click', e => {
      const a = e.target.closest('a.adv-card'); if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
      if ((window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
      e.preventDefault(); document.body.classList.add('adv-leaving'); setTimeout(() => { location.href = a.href; }, 260);
    });
  }
  function updateHome() {
    ORDER.forEach(id => {
      const s = compute(id);
      const line = `⭐ ${s.xp} XP · 🎖️ ${s.rankName}`;
      const c = $(`[data-adv-card="${id}"]`); if (c) c.textContent = line;
      const d = $(`[data-adv-dash="${id}"]`); if (d) d.textContent = line;
      const card = $(`a.adv-card.theme-${id}`); const cta = card && $('[data-adv-cta]', card); if (cta) cta.textContent = s.xp || s.done ? 'Continue' : 'Start';
    });
  }

  /* ---------- COURSE PAGE ---------- */
  function enhanceCourse(id) {
    document.body.classList.add('adv', `theme-${id}`);
    const c = CFG[id], pg = page(id);
    document.body.style.setProperty('--ac', c.accent); document.body.style.setProperty('--ac2', c.accent2);
    tagAnchors(id);
    const hero = $('.course-hero', pg);
    hero.insertAdjacentHTML('beforeend', `<span class="adv-scene" aria-hidden="true">${c.scene}</span>`);
    $('.hero-meta', hero).insertAdjacentHTML('beforeend', `<span class="pill adv-pill-rank" data-adv-pill-rank></span><span class="pill adv-pill-xp" data-adv-pill-xp></span>`);
    hero.insertAdjacentHTML('afterend', `<section class="panel adv-hq" id="adv-hq" aria-labelledby="adv-hq-title"><div id="adv-hq-body"></div></section>`);

    const tools = document.createElement('details'); tools.className = 'panel adv-tools-panel'; tools.id = 'adv-tools';
    tools.innerHTML = `<summary>🧰 Interactive Training Tools <span class="adv-xp">+${TOOL_XP} XP bonus challenges</span></summary><div id="adv-tools-body"></div>`;
    const cList = panelByHeading(id, /weekly completion checklist/i);
    (cList || $('.course-main', pg).lastElementChild).before(tools);

    const cert = document.createElement('section'); cert.className = 'panel adv-cert-panel'; cert.id = 'adv-cert-panel'; cert.setAttribute('aria-labelledby', 'adv-cert-title');
    $('.course-main', pg).append(cert);

    const sb = $('#primary-nav');
    if (sb) sb.insertAdjacentHTML('afterend', `<nav class="adv-sidenav" aria-label="${h(c.boardName)}" id="adv-sidenav"></nav>`);

    const ctx = { data: cl(id).data, save: persist, toast, award: key => award(id, key), onRefresh: null };
    window.CKSTools.mount(id, $('#adv-tools-body'), ctx); ctxRef = ctx;

    $$('details.lesson', pg).forEach(d => d.addEventListener('toggle', () => { if (d.open && !cl(id).opened[d.id]) { cl(id).opened[d.id] = true; persist(); schedule(); } }));
    $('#reset-button').addEventListener('click', () => setTimeout(() => {
      if ($$('input[data-check]:checked', pg).length) return;
      L.c[id] = { tools: {}, data: {}, opened: {}, badges: {} }; persist(); location.reload();
    }, 60));
  }
  let ctxRef = null, last = null, silent = true, timer = null;

  function award(id, key) {
    const st = cl(id); if (st.tools[key]) return;
    st.tools[key] = true; persist(); toast(`🧰 Challenge complete! +${TOOL_XP} XP`); update(id);
  }
  const schedule = () => { clearTimeout(timer); timer = setTimeout(() => update(courseId), 250); };

  function renderCourse(id, s) {
    const c = CFG[id], st = cl(id);
    const next = s.zones.flatMap(z => z.items).find(i => !i.complete && !i.bonus) || s.zones.flatMap(z => z.items).find(i => !i.complete);
    const nextId = i => (i.kind === 'tool' ? 'adv-tools' : i.el.id);
    $('#adv-hq-body').innerHTML = `
      <div class="adv-hq-head"><div><h2 id="adv-hq-title">${c.icon} ${h(c.short)}: Mission HQ</h2><p class="adv-note">${motive(s.pct)}</p></div>
        <div class="adv-rankbox"><span class="adv-rank-label">Current rank</span><strong>${h(s.rankName)}</strong></div></div>
      <div class="adv-q">
        <div><b>📌 What am I doing?</b><span>${h(c.quest)}</span></div>
        <div><b>💡 Why am I doing it?</b><span>${h(c.why)}</span></div>
        <div><b>📈 How much have I done?</b><span>${s.done} of ${s.checkTotal} tasks (${s.pct}%)</span></div>
        <div class="adv-next"><b>👉 What should I do next?</b><span>${next ? `${next.ico} ${h(next.title)}` : '🎉 Everything is complete. Print your certificate below!'}</span>${next ? `<button type="button" class="adv-btn sm" data-adv-jump="${h(nextId(next))}">Go to next mission</button>` : ''}</div>
      </div>
      <div class="adv-stats">
        <div class="adv-stat"><span>Course completion</span><strong>${s.pct}%</strong><div class="adv-bar"><i style="width:${s.pct}%"></i></div></div>
        <div class="adv-stat"><span>XP earned</span><strong>⭐ ${s.xp} <small>/ ${s.total}</small></strong><div class="adv-bar"><i style="width:${Math.round(s.frac * 100)}%"></i></div><em>${s.rank < 4 ? `${s.toNext} XP to ${h(s.nextRank)}` : 'Top rank reached!'}</em></div>
      </div>
      <ol class="adv-ranks" aria-label="Rank ladder">${c.ranks.map((r, i) => `<li class="${i <= s.rank ? 'on' : ''} ${i === s.rank ? 'cur' : ''}" ${i === s.rank ? 'aria-current="true"' : ''}>${h(r)}</li>`).join('')}</ol>
      <h3>🗺️ ${h(c.boardName)}</h3>
      <div class="adv-map" role="list">${s.zones.map((z, i) => `<a href="#" role="listitem" class="adv-node ${z.complete ? 'done' : z.pct > 0 ? 'cur' : ''}" data-adv-jump="${h(nextId(z.items.find(x => !x.complete) || z.items[0]))}"><span class="adv-node-n">${z.complete ? '✔' : i + 1}</span><span class="adv-node-t">${h(z.name)}</span><span class="adv-node-p">${z.pct}%</span></a>`).join('<span class="adv-arrow" aria-hidden="true">↓</span>')}</div>
      <div class="adv-board">${s.zones.map(z => `<div class="adv-zone"><h4>${h(z.name)} <span class="adv-zone-p">${z.pct}%</span></h4>${z.items.map(i => `<a href="#" class="adv-mission ${i.complete ? 'done' : i.done ? 'cur' : ''}" data-adv-jump="${h(nextId(i))}"><span class="adv-m-ico" aria-hidden="true">${i.complete ? '✅' : i.ico}</span><span class="adv-m-t">${i.boss ? '<b>Boss Battle</b> · ' : ''}${i.bonus ? '<b>Bonus</b> · ' : ''}${h(i.title)}</span><span class="adv-m-s">${i.bonus ? `+${TOOL_XP} XP` : `${Math.min(i.done, i.total)}/${i.total}`}</span></a>`).join('')}</div>`).join('')}</div>
      <h3>🏅 Achievements &amp; Badges</h3>
      <div class="adv-badges">${TIERS.map((t, i) => `<div class="adv-badge ${st.badges['tier' + i] ? 'on' : ''}"><span class="e">${t[1]}</span><b>${t[0]}</b><small>${t[2]}% of XP</small></div>`).join('')}${c.ach.map((a, i) => `<div class="adv-badge ${st.badges['ach' + i] ? 'on' : ''}"><span class="e">${a[1]}</span><b>${h(a[0])}</b><small>${h(a[2])}</small></div>`).join('')}</div>`;
    const sn = $('#adv-sidenav');
    if (sn) sn.innerHTML = `<div class="sidebar-label">${h(c.boardName)}</div>` + s.zones.map(z => `<a class="nav-link adv-sn ${z.complete ? 'done' : ''}" href="#" data-adv-jump="${h(nextId(z.items.find(x => !x.complete) || z.items[0]))}"><span aria-hidden="true">${z.complete ? '✔' : '•'}</span> ${h(z.name)}</a>`).join('') + `<p class="adv-side-xp">⭐ ${s.xp} XP · ${h(s.rankName)}</p>`;
    const pr = $('[data-adv-pill-rank]'); if (pr) pr.textContent = `🎖️ ${s.rankName}`;
    const px = $('[data-adv-pill-xp]'); if (px) px.textContent = `⭐ ${s.xp} XP`;
    if (ctxRef && ctxRef.onRefresh) ctxRef.onRefresh(s.zones);
    renderCert(id, s);
  }

  function renderCert(id, s) {
    const c = CFG[id], el = $('#adv-cert-panel'); if (!el) return;
    const had = $('#adv-name', el), name = had ? had.value : (L.name || '');
    if (s.pct < 100) {
      el.innerHTML = `<h2 id="adv-cert-title">🎓 Weekly Completion Certificate</h2><p>Complete 100% of the tasks in this pathway (${s.done} of ${s.checkTotal} so far) to unlock your printable certificate.</p><div class="adv-bar"><i style="width:${s.pct}%"></i></div>`;
      return;
    }
    if (had && el.dataset.unlocked === '1') { drawCert(id); return; }
    el.dataset.unlocked = '1';
    el.innerHTML = `<div class="adv-done"><h2 id="adv-cert-title">🏆 ${h(c.done[0])}</h2><p class="adv-done-sub">${h(c.done[1])}</p>
      <p><label for="adv-name">Student name for your certificate</label><input id="adv-name" maxlength="60" autocomplete="name" value="${h(name)}" placeholder="Your full name"></p>
      <div id="adv-cert"></div><p class="adv-noprint"><button type="button" class="adv-btn" id="adv-print">🖨️ Print certificate</button></p></div>`;
    $('#adv-name').oninput = () => { L.name = $('#adv-name').value.trim(); persist(); drawCert(id); };
    $('#adv-print').onclick = () => {
      let root = $('#adv-print-root'); if (!root) { root = document.createElement('div'); root.id = 'adv-print-root'; document.body.append(root); }
      root.innerHTML = $('#adv-cert').innerHTML; document.body.classList.add('adv-printing');
      const clear = () => { document.body.classList.remove('adv-printing'); window.removeEventListener('afterprint', clear); };
      window.addEventListener('afterprint', clear); window.print();
    };
    drawCert(id);
  }
  function drawCert(id) {
    const date = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    const cl2 = L.c[id].certDate || (L.c[id].certDate = date); persist();
    const n = ($('#adv-name').value || '').trim();
    $('#adv-cert').innerHTML = `<div class="adv-cert"><div class="adv-cert-school">Centennial High School</div><h2>Certificate of Completion</h2><p>This certifies that</p><div class="adv-cert-name">${h(n || '______________')}</div><p>has successfully completed</p><h3>${h($('.course-hero h1').textContent)}</h3><p>Week 10 · ${h(CFG[id].short)}</p><p>Completion date: ${h(cl2)}</p><p class="adv-cert-sign"><strong>Instructor: Mr. Torres</strong><br>Centennial High School</p></div>`;
  }

  /* ---------- update loop ---------- */
  function update(id) {
    if (!id) { updateHome(); return; }
    const s = compute(id), st = cl(id);
    let newBadges = 0, rankUp = false;
    s.tiers.forEach((v, i) => { if (v && !st.badges['tier' + i]) { st.badges['tier' + i] = true; newBadges++; } });
    s.ach.forEach((v, i) => { if (v && !st.badges['ach' + i]) { st.badges['ach' + i] = true; newBadges++; } });
    if (s.rank > (st.maxRank || 0)) { st.maxRank = s.rank; rankUp = true; }
    if (newBadges || rankUp) persist();
    if (!silent && last) {
      if (s.xp > last.xp) toast(`+${s.xp - last.xp} XP`);
      if (s.pct === 100 && last.pct < 100) { toast(`🎉 ${CFG[id].done[0]}`, true); confetti(); }
      else if (rankUp) { toast(`⬆️ Rank up: ${s.rankName}`, true); confetti(); }
      else if (newBadges) { toast('🏅 New badge unlocked!', true); confetti(); }
    }
    silent = false; last = s;
    renderCourse(id, s);
  }

  /* ---------- boot ---------- */
  function boot() {
    if (!window.CKSTools) return;
    if (!courseId) { enhanceHome(); updateHome(); ['change', 'input'].forEach(e => document.addEventListener(e, () => setTimeout(updateHome, 0))); return; }
    if (!CFG[courseId] || !page(courseId)) return;
    enhanceCourse(courseId);
    const st = cl(courseId);
    $$('details.lesson[open]', page(courseId)).forEach(d => { st.opened[d.id] = true; });
    update(courseId);
    ['change', 'input', 'toggle'].forEach(e => document.addEventListener(e, e2 => { if (!e2.target.closest || !e2.target.closest('#adv-tools')) schedule(); }, true));
    document.addEventListener('click', e => { if (e.target.closest('#reset-button, [data-frq-action]')) schedule(); });
  }
  boot();
})();
