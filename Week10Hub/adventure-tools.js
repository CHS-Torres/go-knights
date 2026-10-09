'use strict';
/* Interactive practice tools for the Week 10 Learning Adventure.
   These are additive: they never replace or edit the lesson content rendered by scirpt.js. */
window.CKSTools = (() => {
  const h = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const $ = (s, r = document) => r.querySelector(s);
  const card = (title, inner, desc) => `<div class="adv-tool"><h3>${title}</h3>${desc ? `<p class="adv-note">${desc}</p>` : ''}${inner}</div>`;

  function stepper(el, prog, onEnd) {
    let i = -1;
    el.innerHTML = `<div class="adv-split"><div><div class="adv-code">${prog.code.map((l, n) => `<span class="ln" data-l="${n + 1}">${n + 1}  ${h(l)}</span>`).join('')}</div>
      <div class="adv-actions"><button type="button" class="adv-btn sm ghost" data-prev>◀ Back</button><button type="button" class="adv-btn sm" data-next>Step ▶</button><button type="button" class="adv-btn sm ghost" data-reset>Reset</button></div><p class="adv-note" data-note aria-live="polite"></p></div>
      <div><b>Variables</b><table class="adv-table" data-vars></table>${prog.stack ? '<b>Call stack</b><div class="adv-stack" data-stack></div>' : ''}<b>Console</b><div class="adv-out" data-out></div></div></div>`;
    const draw = () => {
      el.querySelectorAll('.ln').forEach(x => x.classList.toggle('hl', i >= 0 && +x.dataset.l === prog.steps[i].line));
      const s = prog.steps[i] || { vars: {}, stack: [], out: [], note: 'Press Step to begin.' };
      $('[data-vars]', el).innerHTML = Object.entries(s.vars).map(([k, v]) => `<tr><td>${h(k)}</td><td><b>${h(v)}</b></td></tr>`).join('') || '<tr><td>(none yet)</td></tr>';
      if (prog.stack) $('[data-stack]', el).innerHTML = (s.stack || []).map(x => `<div>${h(x)}</div>`).join('');
      $('[data-out]', el).textContent = (s.out || []).join('\n');
      $('[data-note]', el).textContent = s.note || '';
    };
    $('[data-next]', el).onclick = () => { if (i < prog.steps.length - 1) i++; draw(); if (i === prog.steps.length - 1 && onEnd) onEnd(); };
    $('[data-prev]', el).onclick = () => { if (i >= 0) i--; draw(); };
    $('[data-reset]', el).onclick = () => { i = -1; draw(); };
    draw();
  }

  const JAVA = [
    { code: ['int sum = 0;', 'for (int i = 1; i <= 3; i++) {', '    sum += i;', '}', 'System.out.println(sum);'], ans: '6',
      steps: [{ line: 1, vars: { sum: 0 }, note: 'sum starts at 0.' }, { line: 2, vars: { sum: 0, i: 1 }, note: 'i = 1; 1 <= 3 is true.' }, { line: 3, vars: { sum: 1, i: 1 }, note: 'sum = 0 + 1.' },
        { line: 2, vars: { sum: 1, i: 2 }, note: 'i++ makes i 2; still <= 3.' }, { line: 3, vars: { sum: 3, i: 2 }, note: 'sum = 1 + 2.' }, { line: 2, vars: { sum: 3, i: 3 }, note: 'i++ makes i 3; still <= 3.' }, { line: 3, vars: { sum: 6, i: 3 }, note: 'sum = 3 + 3.' },
        { line: 2, vars: { sum: 6, i: 4 }, note: 'i++ makes i 4; 4 <= 3 is false, the loop ends.' }, { line: 5, vars: { sum: 6 }, out: ['6'], note: 'Prints sum.' }] },
    { code: ['int score = 72;', 'String grade = "F";', 'if (score >= 90) grade = "A";', 'else if (score >= 70) grade = "C";', 'System.out.println("Grade: " + grade);'], ans: 'Grade: C',
      steps: [{ line: 1, vars: { score: 72 } }, { line: 2, vars: { score: 72, grade: 'F' } }, { line: 3, vars: { score: 72, grade: 'F' }, note: '72 >= 90 is false, so skip.' },
        { line: 4, vars: { score: 72, grade: 'C' }, note: '72 >= 70 is true, so grade = "C".' }, { line: 5, vars: { score: 72, grade: 'C' }, out: ['Grade: C'], note: 'Prints Grade: C' }] },
    { code: ['public static int triple(int n) {', '    return n * 3;', '}', 'int a = 4;', 'int b = triple(a) + 1;', 'System.out.println(b);'], ans: '13', stack: true,
      steps: [{ line: 4, vars: { a: 4 }, stack: ['main'], note: 'a = 4.' }, { line: 5, vars: { a: 4 }, stack: ['main', 'triple(n=4)'], note: 'Calls triple(4). The parameter n gets 4.' }, { line: 2, vars: { a: 4, n: 4 }, stack: ['main', 'triple(n=4)'], note: 'Returns 4 * 3 = 12.' },
        { line: 5, vars: { a: 4, b: 13 }, stack: ['main'], note: '12 + 1 = 13 is stored in b.' }, { line: 6, vars: { a: 4, b: 13 }, stack: ['main'], out: ['13'], note: 'Prints 13.' }] }
  ];
  const METHOD = { code: ['static int add(int x, int y) { return x + y; }', 'static int twice(int n) { return add(n, n); }', 'int r = twice(5);', 'System.out.println(r);'], stack: true,
    steps: [{ line: 3, vars: {}, stack: ['main'], note: 'main begins.' }, { line: 3, vars: {}, stack: ['main', 'twice(n=5)'], note: 'twice is called with 5.' }, { line: 2, vars: { n: 5 }, stack: ['main', 'twice(n=5)', 'add(x=5, y=5)'], note: 'twice calls add(5, 5). The stack grows.' },
      { line: 1, vars: { x: 5, y: 5 }, stack: ['main', 'twice(n=5)', 'add(x=5, y=5)'], note: 'add returns 10.' }, { line: 2, vars: { n: 5 }, stack: ['main', 'twice(n=5)'], note: 'add finished; twice returns 10.' }, { line: 3, vars: { r: 10 }, stack: ['main'], note: 'r = 10.' }, { line: 4, vars: { r: 10 }, stack: ['main'], out: ['10'], note: 'Prints 10.' }] };

  const builders = {
    'ap-csa'(T, ctx) {
      const data = ctx.data;
      T.innerHTML = card('🔮 Java Trace Simulator', '<div id="adv-trace"></div>', 'Predict the output first, then step through the program to check your thinking. Solve all 3 for a bonus challenge.') +
        card('🧭 Method Call Explorer', '<div id="adv-mx"></div>', 'Watch the call stack grow and shrink. Step all the way to the end.') +
        card('📊 Variable Tracker', `<div class="adv-actions"><label>start <input id="adv-vs" type="number" value="1" style="width:70px"></label><label>end <input id="adv-ve" type="number" value="5" style="width:70px"></label><label>step <input id="adv-vk" type="number" value="1" style="width:70px"></label></div><pre class="adv-code">for (int i = start; i &lt;= end; i += step) total += i;</pre>
          <button type="button" class="adv-btn sm" id="adv-vnext">Next iteration ▶</button> <button type="button" class="adv-btn sm ghost" id="adv-vreset">Reset</button><table class="adv-table"><thead><tr><th>iteration</th><th>i</th><th>total</th></tr></thead><tbody id="adv-vrows"></tbody></table><p class="adv-note" id="adv-vnote" aria-live="polite"></p>`, 'Run at least 3 iterations to see how a loop changes variables.');
      let p = 0; const solved = data.solved = data.solved || {};
      const showTrace = () => {
        const pr = JAVA[p];
        $('#adv-trace').innerHTML = `<div class="adv-actions">${JAVA.map((_, n) => `<button type="button" class="adv-btn sm ${n === p ? '' : 'ghost'}" data-p="${n}">Program ${n + 1} ${solved[n] ? '✅' : ''}</button>`).join('')}</div>
          <div class="adv-code">${pr.code.map(h).join('\n')}</div><p><label>What is printed? <input id="adv-pred" placeholder="your prediction"></label> <button type="button" class="adv-btn sm" id="adv-chk">Check</button> <span id="adv-pres" aria-live="polite"></span></p><div id="adv-tst" hidden></div>`;
        $('#adv-trace').querySelectorAll('[data-p]').forEach(b => b.onclick = () => { p = +b.dataset.p; showTrace(); });
        $('#adv-chk').onclick = () => {
          const ok = $('#adv-pred').value.trim().toLowerCase() === pr.ans.toLowerCase();
          $('#adv-pres').innerHTML = ok ? '<span class="adv-ok">Correct! 🎉</span>' : '<span class="adv-bad">Not quite. Step through to see why, then try again.</span>';
          $('#adv-tst').hidden = false; stepper($('#adv-tst'), pr);
          if (ok) { solved[p] = true; ctx.save(); if (JAVA.every((_, n) => solved[n])) ctx.award('trace'); }
        };
      };
      showTrace();
      stepper($('#adv-mx'), METHOD, () => ctx.award('method'));
      let rows = [], shown = 0;
      const draw = () => { $('#adv-vrows').innerHTML = rows.slice(0, shown).map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td><b>${r[2]}</b></td></tr>`).join(''); $('#adv-vnote').textContent = shown ? `i changed to ${rows[shown - 1][1]}; total is now ${rows[shown - 1][2]}.` : ''; };
      const calc = () => { const s = +$('#adv-vs').value, e = +$('#adv-ve').value, k = +$('#adv-vk').value; rows = []; shown = 0; if (!(k > 0)) { $('#adv-vnote').textContent = 'Step must be positive.'; $('#adv-vrows').innerHTML = ''; return; } let t = 0, n = 0; for (let i = s; i <= e && n < 15; i += k, n++) { t += i; rows.push([n + 1, i, t]); } draw(); };
      $('#adv-vnext').onclick = () => { if (shown < rows.length) shown++; draw(); if (shown >= 3) ctx.award('var'); };
      $('#adv-vreset').onclick = calc; ['vs', 've', 'vk'].forEach(x => { $('#adv-' + x).oninput = calc; }); calc();
    },
    'ap-csp'(T, ctx) {
      const data = ctx.data;
      T.innerHTML = card('🔬 Digital Information Lab', `<h4>1. Binary builder <span id="adv-bgoal"></span></h4><div class="adv-bits" id="adv-bits"></div><p>Decimal value: <b id="adv-dec">0</b></p><p class="adv-note" id="adv-bnote"></p>
        <h4>2. Bitmap image (1 = black pixel)</h4><div class="adv-split"><div class="adv-px" id="adv-px"></div><pre class="adv-code" id="adv-pxb"></pre></div><p class="adv-note" id="adv-pnote"></p>`, 'Hit all 3 binary targets and draw an image with at least 10 black pixels.');
      const goals = [5, 42, 200]; let g = data.goal || 0, bin = Array(8).fill(0);
      const lab = () => { if (g >= goals.length && data.img) ctx.award('lab'); };
      const bdraw = () => {
        const v = bin.reduce((a, b) => a * 2 + b, 0); $('#adv-dec').textContent = v;
        $('#adv-bits').innerHTML = bin.map((b, i) => `<button type="button" class="adv-bit ${b ? 'on' : ''}" data-i="${i}" aria-label="bit worth ${2 ** (7 - i)}, currently ${b}">${b}<div style="font-size:.6rem">${2 ** (7 - i)}</div></button>`).join('');
        $('#adv-bits').querySelectorAll('.adv-bit').forEach(x => { x.onclick = () => { bin[+x.dataset.i] ^= 1; bdraw(); }; });
        $('#adv-bgoal').textContent = g < goals.length ? `Target: make ${goals[g]}` : '✅ All targets done';
        if (g < goals.length && v === goals[g]) { g++; data.goal = g; $('#adv-bnote').textContent = '🎯 Target hit!'; ctx.save(); lab(); setTimeout(() => { bin = Array(8).fill(0); bdraw(); }, 600); }
      };
      bdraw();
      const px = data.px && data.px.length === 64 ? data.px : Array(64).fill(0);
      const pxd = () => {
        $('#adv-px').innerHTML = px.map((v, i) => `<button type="button" class="${v ? 'on' : ''}" data-i="${i}" aria-label="pixel ${i + 1}"></button>`).join('');
        $('#adv-px').querySelectorAll('button').forEach(b => { b.onclick = () => { px[+b.dataset.i] ^= 1; data.px = px; ctx.save(); pxd(); }; });
        $('#adv-pxb').textContent = Array.from({ length: 8 }, (_, r) => px.slice(r * 8, r * 8 + 8).join('')).join('\n');
        const n = px.reduce((a, b) => a + b, 0); $('#adv-pnote').textContent = `${n} black pixels · 64 pixels × 1 bit = 8 bytes. Need 10+ black pixels.`;
        if (n >= 10 && !data.img) { data.img = true; ctx.save(); lab(); }
      };
      pxd();
    },
    'ist-csp'(T, ctx) {
      const data = ctx.data;
      T.innerHTML = card('🧪 HTML Sandbox', `<div class="adv-split"><textarea id="adv-hs" style="min-height:220px;font-family:monospace" aria-label="HTML sandbox code"></textarea><iframe class="adv-prev" id="adv-hp" sandbox title="HTML preview"></iframe></div><p class="adv-note" id="adv-hn">Goal: include h1, p, and a link.</p>`) +
        card('🌈 CSS Color Playground', `<div class="adv-actions"><label>Background <input type="color" id="adv-cb" value="#10213d"></label><label>Text <input type="color" id="adv-ct" value="#ffffff"></label><label>Accent <input type="color" id="adv-ca" value="#f2b705"></label></div><div id="adv-cprev" style="padding:20px;border-radius:12px;margin-top:8px"><h3 id="adv-ch">Centennial Knights</h3><p>Readable text matters.</p><button type="button" id="adv-cbtn" style="border:0;padding:8px 14px;border-radius:8px">Button</button></div><p class="adv-note" id="adv-cn"></p>`, 'Change all three colors to complete the challenge.') +
        card('📐 Layout Challenge Builder', `<div class="adv-actions"><label>Direction <select id="adv-lsel"><option value="row">Side by side (row)</option><option value="column">Stacked (column)</option><option value="row-reverse">Reverse row</option></select></label><label>Justify <select id="adv-ljc"><option>flex-start</option><option>center</option><option>space-between</option><option>space-around</option></select></label><button type="button" class="adv-btn sm" id="adv-llock">🔒 Lock layout</button></div>
        <pre class="adv-code" id="adv-lcss"></pre><div id="adv-lprev" style="display:flex;gap:8px;background:#fff;padding:10px;border-radius:10px;margin-top:6px"><div style="background:#5ab0ff;padding:16px;color:#000">Header</div><div style="background:#f2b705;padding:16px;color:#000">Main</div><div style="background:#3ddc97;padding:16px;color:#000">Sidebar</div></div>`, 'Try at least 2 different directions, then lock your layout.') +
        card('🏙️ Career Exploration Website Builder', `<div class="adv-split"><div id="adv-bf"></div><div><iframe class="adv-prev" id="adv-bp" sandbox title="Career exploration website preview"></iframe></div></div><ul class="adv-check" id="adv-bc"></ul>`, 'Build a career research preview and check its core website elements. Complete the full nine-section project in CodeHS.');
      const hs = $('#adv-hs'); hs.value = data.html || '<h1>My Page</h1>\n<p>Edit me!</p>';
      const hr = () => { $('#adv-hp').srcdoc = hs.value; data.html = hs.value; ctx.save(); const v = hs.value.toLowerCase(); const ok = /<h1[\s>]/.test(v) && /<p[\s>]/.test(v) && /<a\s[^>]*href/.test(v); $('#adv-hn').textContent = ok ? '✅ h1, p, and link found!' : 'Goal: include <h1>, <p>, and an <a href="..."> link.'; if (ok) ctx.award('sandbox'); };
      hs.oninput = hr; hr();
      const touched = new Set();
      const cr = () => { const p = $('#adv-cprev'); p.style.background = $('#adv-cb').value; p.style.color = $('#adv-ct').value; $('#adv-ch').style.color = $('#adv-ca').value; $('#adv-cbtn').style.background = $('#adv-ca').value; $('#adv-cbtn').style.color = $('#adv-cb').value;
        const lum = c => { const n = parseInt(c.slice(1), 16), f = v => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }; return .2126 * f(n >> 16) + .7152 * f((n >> 8) & 255) + .0722 * f(n & 255); };
        const a = lum($('#adv-cb').value), b = lum($('#adv-ct').value), r = (Math.max(a, b) + .05) / (Math.min(a, b) + .05); $('#adv-cn').textContent = `Text contrast ${r.toFixed(1)}:1 ${r >= 4.5 ? '✅ readable (4.5+ recommended)' : '⚠️ hard to read'}`; };
      ['cb', 'ct', 'ca'].forEach(x => { $('#adv-' + x).oninput = () => { touched.add(x); cr(); if (touched.size === 3) ctx.award('color'); }; }); cr();
      const lr = () => { const d = $('#adv-lprev'); d.style.flexDirection = $('#adv-lsel').value; d.style.justifyContent = $('#adv-ljc').value; $('#adv-lcss').textContent = `display: flex;\nflex-direction: ${$('#adv-lsel').value};\njustify-content: ${$('#adv-ljc').value};`; };
      const lt = new Set(); $('#adv-lsel').onchange = () => { lt.add($('#adv-lsel').value); lr(); }; $('#adv-ljc').onchange = lr;
      $('#adv-llock').onclick = () => { if (lt.size >= 2) { ctx.award('layout'); ctx.toast('Layout locked 🔒'); } else ctx.toast('Try at least 2 different layouts first'); }; lr();
      const F = [['title', 'Website title', 'Technology Career Exploration'], ['h1', 'Career heading', 'Explore a Technology Career'], ['para', 'Career introduction', 'Learn about this career, its skills, and its future.'], ['img', 'Career-related image URL', ''], ['link', 'Credible career source URL', 'https://www.bls.gov/ooh/'], ['list', 'Career skills (comma separated)', 'problem solving, communication, technical skills'], ['table', 'Career details (one per line: section, detail)', 'Career Overview, Research this career\nEducation, Research qualifications\nSalary Information, Add a cited salary range'], ['color', 'CSS accent color', '#5ab0ff', 'color'], ['career', 'Future outlook and related careers', 'Summarize a cited outlook and name related careers.']];
      if (data.builderVersion !== 2) {
        data.b = {};
        data.builderVersion = 2;
        ctx.save();
      }
      const b = data.b = data.b || {};
      $('#adv-bf').innerHTML = F.map(f => `<label>${f[1]}${['table', 'career', 'para'].includes(f[0]) ? `<textarea data-f="${f[0]}" style="min-height:60px"></textarea>` : `<input data-f="${f[0]}" ${f[3] ? 'type="color"' : ''} style="width:100%">`}</label>`).join('');
      const safeUrl = u => (/^(https?:\/\/|[\w\-./]+$)/i.test(u) ? u : '');
      function br() {
        const v = {}; $('#adv-bf').querySelectorAll('[data-f]').forEach(x => { v[x.dataset.f] = x.value.trim(); b[x.dataset.f] = x.value; }); ctx.save();
        const items = v.list.split(',').map(s => s.trim()).filter(Boolean), rows = v.table.split('\n').map(r => r.split(',').map(s => s.trim())).filter(r => r[0]);
        $('#adv-bp').srcdoc = `<!doctype html><title>${h(v.title)}</title><style>body{font-family:sans-serif;line-height:1.6;margin:20px;color:#222}main{max-width:760px;margin:auto}h1,h2,th{color:${/^#[0-9a-f]{6}$/i.test(v.color) ? v.color : '#333'}}img{max-width:100%;height:auto}table{border-collapse:collapse}td,th{border:1px solid #999;padding:4px 8px;text-align:left}</style>
          <main><h1>${h(v.h1)}</h1><p>${h(v.para)}</p>${safeUrl(v.img) ? `<img src="${h(safeUrl(v.img))}" alt="Image related to the selected technology career">` : ''}${safeUrl(v.link) ? `<p><a href="${h(safeUrl(v.link))}">View career research source</a></p>` : ''}<h2>Skills Needed</h2><ul>${items.map(i => `<li>${h(i)}</li>`).join('')}</ul>
          <h2>Career Research</h2><table>${rows.map(r => `<tr>${r.map(c => `<td>${h(c)}</td>`).join('')}</tr>`).join('')}</table><h2>Future Outlook and Related Careers</h2><p>${h(v.career)}</p><h2>Sources</h2><p>Add complete citations and working source links.</p></main>`;
        const chk = [['Website title', v.title], ['Career heading', v.h1], ['Career introduction', v.para], ['Career image', safeUrl(v.img)], ['Credible source link', safeUrl(v.link)], ['Skills list', items.length], ['Career details', rows.length], ['CSS styling', v.color], ['Career outlook', v.career]];
        $('#adv-bc').innerHTML = chk.map(c => `<li class="${c[1] ? 'ok' : ''}">${c[0]}</li>`).join('');
        if (chk.every(c => c[1])) ctx.award('builder');
      }
      $('#adv-bf').querySelectorAll('[data-f]').forEach(x => { const k = x.dataset.f; x.value = b[k] ?? (F.find(f => f[0] === k)[3] ? '#5ab0ff' : ''); x.oninput = br; });
      br();
    },
    'game-design'(T, ctx) {
      const data = ctx.data, B = data.bugs = data.bugs || [], SP = data.sprint = data.sprint || [], G = data.gdd = data.gdd || {};
      T.innerHTML = card('🛤️ Student Path', `<label><input type="radio" name="adv-path" value="unity"> 🎮 Unity Development</label><label><input type="radio" name="adv-path" value="alt"> 🧰 Alternative path (if Unity has hardware limits): Pygame, HTML/CSS game demo, design documentation, flowchart design, or sprite production</label><p class="adv-note" id="adv-pn"></p>`, 'Your lesson pathways above (Path A and Path B) are unchanged; this just remembers your choice.') +
        card('📊 Game Development Pipeline Dashboard', '<div id="adv-pipe"></div><p id="adv-release" class="adv-note"></p>', 'Six studio departments, tracked from your progress on this page.') +
        card('🐛 Bug Tracker Simulator', `<div class="adv-actions"><input id="adv-bt" placeholder="Describe the bug" aria-label="Bug description" style="flex:1;min-width:180px"><select id="adv-bsev" aria-label="Severity"><option>Low</option><option>Medium</option><option>High</option><option>Critical</option></select><button type="button" class="adv-btn sm" id="adv-badd">Log bug</button></div><table class="adv-table"><tbody id="adv-blist"></tbody></table><p class="adv-note" id="adv-bn"></p>`, 'Log 3 bugs to complete the challenge.') +
        card('📄 Design Document Builder', `<div id="adv-gdd"></div><p class="adv-note" id="adv-gn"></p><button type="button" class="adv-btn sm ghost" id="adv-gcopy">Copy document</button>`, 'Fill in 4 sections (10+ characters each).') +
        card('🗂️ Sprint Planning Board', `<div class="adv-actions"><input id="adv-st" placeholder="New sprint task" aria-label="New sprint task" style="flex:1;min-width:180px"><button type="button" class="adv-btn sm" id="adv-sadd">Add card</button></div><div class="adv-board" id="adv-sb"></div>`, 'Add 3 cards and move one to Done.');
      const pr = document.querySelector(`[name=adv-path][value=${data.path || 'unity'}]`); if (pr) pr.checked = true;
      const pn = () => { $('#adv-pn').textContent = data.path === 'alt' ? 'Alternative path selected. Keep following Path B below.' : 'Unity path selected. Keep following Path A below.'; };
      document.querySelectorAll('[name=adv-path]').forEach(r => { r.onchange = () => { data.path = r.value; ctx.save(); pn(); }; }); pn();
      const DEPT = ['Game Concept', 'Programming', 'Art and Assets', 'Testing', 'Documentation', 'Publishing'];
      ctx.onRefresh = zones => {
        const first = zones.findIndex(z => z.pct < 100);
        $('#adv-pipe').innerHTML = zones.map((z, i) => `<div style="margin:8px 0">${z.pct === 100 ? '✅' : i === first ? '🔨' : '⏳'} Department ${i + 1}: ${h(DEPT[i])} <span class="adv-note">${z.pct === 100 ? 'Complete' : i === first ? 'In progress' : 'Queued'} · ${z.pct}%</span><div class="adv-bar"><i style="width:${z.pct}%"></i></div></div>`).join('');
        const left = (5 - new Date().getDay() + 7) % 7; $('#adv-release').textContent = left === 0 ? '🚀 Release day is today (Friday)!' : `⏱️ Release countdown: ${left} day${left > 1 ? 's' : ''} until Friday.`;
      };
      const bd = () => {
        $('#adv-blist').innerHTML = B.map((x, i) => `<tr><td>${h(x.t)}</td><td>${h(x.s)}</td><td><button type="button" class="adv-btn sm ghost" data-b="${i}">${x.fixed ? '✅ Fixed' : 'Mark fixed'}</button></td></tr>`).join('') || '<tr><td>No bugs logged yet.</td></tr>';
        $('#adv-blist').querySelectorAll('[data-b]').forEach(b => { b.onclick = () => { B[+b.dataset.b].fixed = !B[+b.dataset.b].fixed; ctx.save(); bd(); }; });
        $('#adv-bn').textContent = `${B.length}/3 bugs logged`; if (B.length >= 3) ctx.award('bugs');
      };
      $('#adv-badd').onclick = () => { const t = $('#adv-bt').value.trim(); if (!t) return; B.push({ t, s: $('#adv-bsev').value }); $('#adv-bt').value = ''; ctx.save(); bd(); }; bd();
      const SEC = ['Game concept', 'Target audience', 'Core mechanics', 'Characters / art style', 'Levels / goals', 'Controls', 'Win / lose conditions'];
      $('#adv-gdd').innerHTML = SEC.map((s, i) => `<label>${s}<textarea data-g="${i}" style="min-height:50px"></textarea></label>`).join('');
      const gn = () => { const n = SEC.filter((_, i) => (G[i] || '').trim().length >= 10).length; $('#adv-gn').textContent = `${Math.min(n, 4)}/4 required sections complete`; if (n >= 4) ctx.award('gdd'); };
      $('#adv-gdd').querySelectorAll('[data-g]').forEach(x => { x.value = G[x.dataset.g] || ''; x.oninput = () => { G[x.dataset.g] = x.value; ctx.save(); gn(); }; }); gn();
      $('#adv-gcopy').onclick = () => { const txt = SEC.map((s, i) => `${s}:\n${G[i] || ''}`).join('\n\n'); (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(() => ctx.toast('Copied!'), () => ctx.toast('Copy not available here')); };
      const COLS = ['To Do', 'Doing', 'Done'];
      const sd = () => {
        $('#adv-sb').innerHTML = COLS.map((c, ci) => `<div class="col"><h4>${c}</h4>${SP.map((x, i) => x.c === ci ? `<div class="sticky"><span>${h(x.t)}</span><span>${ci > 0 ? `<button type="button" data-m="${i},-1" aria-label="move back">◀</button>` : ''}${ci < 2 ? `<button type="button" data-m="${i},1" aria-label="move forward">▶</button>` : `<button type="button" data-x="${i}" aria-label="remove">✕</button>`}</span></div>` : '').join('')}</div>`).join('');
        $('#adv-sb').querySelectorAll('[data-m]').forEach(b => { b.onclick = () => { const [i, d] = b.dataset.m.split(',').map(Number); SP[i].c += d; ctx.save(); sd(); }; });
        $('#adv-sb').querySelectorAll('[data-x]').forEach(b => { b.onclick = () => { SP.splice(+b.dataset.x, 1); ctx.save(); sd(); }; });
        if (SP.length >= 3 && SP.some(x => x.c === 2)) ctx.award('sprint');
      };
      $('#adv-sadd').onclick = () => { const t = $('#adv-st').value.trim(); if (!t) return; SP.push({ t, c: 0 }); $('#adv-st').value = ''; ctx.save(); sd(); }; sd();
    }
  };
  return { mount: (id, el, ctx) => builders[id](el, ctx) };
})();
