'use strict';
/* =====================================================================
   AP CSP Python Survival Camp
   Part 1: a tiny Python engine (expressions + simple programs)
   ===================================================================== */
class PyError extends Error { constructor(type, msg) { super(msg); this.pyType = type; } }

const mk = { int: v => ({ t: 'int', v }), float: v => ({ t: 'float', v }), bool: v => ({ t: 'bool', v }), str: v => ({ t: 'str', v }) };
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function fmt(x) {
  switch (x.t) {
    case 'int': return String(x.v);
    case 'float': return Number.isInteger(x.v) ? x.v.toFixed(1) : String(x.v);
    case 'bool': return x.v ? 'True' : 'False';
    default: return '"' + x.v + '"';
  }
}
const show = x => (x.t === 'str' ? x.v : fmt(x));
const isNum = x => x.t === 'int' || x.t === 'float' || x.t === 'bool';
const numOf = x => (x.t === 'bool' ? (x.v ? 1 : 0) : x.v);
const truthy = x => (x.t === 'str' ? x.v.length > 0 : !!x.v);
const tname = x => ({ int: 'an int', float: 'a float', bool: 'a bool', str: 'a string' }[x.t]);
let UID = 100000;

const CMP = ['==', '!=', '<', '>', '<=', '>='];
const LEVEL_NAMES = { 1: 'Parentheses ( )', 2: 'Exponents **', 3: 'Multiply / divide: * / // %', 4: 'Add / subtract: + -', 5: 'Comparisons: == != < > <= >=', 6: 'not', 7: 'and', 8: 'or' };

function tokenize(src) {
  const toks = [];
  const re = /\s*(?:(\d+\.\d*|\.\d+|\d+)|("[^"]*"|'[^']*')|([A-Za-z_]\w*)|(\*\*|\/\/|==|!=|<=|>=|[-+*\/%<>()]))/y;
  let i = 0;
  while (i < src.length) {
    if (/^\s*$/.test(src.slice(i))) break;
    re.lastIndex = i;
    const m = re.exec(src);
    if (!m) {
      const ch = src.slice(i).trim()[0];
      throw new PyError('SyntaxError', ch === '=' ? 'A single = means "store in a variable". To compare two values, Python uses == .' : 'The machine does not understand the symbol "' + ch + '".');
    }
    i = re.lastIndex;
    if (m[1] !== undefined) toks.push({ t: 'num', v: m[1] });
    else if (m[2] !== undefined) toks.push({ t: 'str', v: m[2].slice(1, -1) });
    else if (m[3] !== undefined) toks.push({ t: ['and', 'or', 'not', 'True', 'False'].includes(m[3]) ? 'kw' : 'name', v: m[3] });
    else toks.push({ t: 'op', v: m[4] });
  }
  return toks;
}

function parse(src, naive = false) {
  const toks = tokenize(src);
  if (!toks.length) throw new PyError('SyntaxError', 'Type an expression first.');
  let p = 0, id = 0;
  const N = o => ({ id: ++id, ...o });
  const isOp = (...ops) => toks[p] && toks[p].t === 'op' && ops.includes(toks[p].v);
  const isKw = k => toks[p] && toks[p].t === 'kw' && toks[p].v === k;
  function or_() { let l = and_(); while (isKw('or')) { p++; l = N({ k: 'bin', op: 'or', a: l, b: and_() }); } return l; }
  function and_() { let l = not_(); while (isKw('and')) { p++; l = N({ k: 'bin', op: 'and', a: l, b: not_() }); } return l; }
  function not_() { if (isKw('not')) { p++; return N({ k: 'un', op: 'not', a: not_() }); } return cmp(); }
  function cmp() {
    let l = arith();
    if (isOp(...CMP)) {
      const op = toks[p++].v;
      l = N({ k: 'bin', op, a: l, b: arith() });
      if (isOp(...CMP)) throw new PyError('SyntaxError', 'This machine does not chain comparisons. Write a < b and b < c instead of a < b < c.');
    }
    return l;
  }
  function arith() {
    if (naive) {
      const f = () => (isOp('-') ? (p++, N({ k: 'un', op: '-', a: f() })) : atom());
      let l = f();
      while (isOp('+', '-', '*', '/', '//', '%', '**')) { const op = toks[p++].v; l = N({ k: 'bin', op, a: l, b: f() }); }
      return l;
    }
    let l = term();
    while (isOp('+', '-')) { const op = toks[p++].v; l = N({ k: 'bin', op, a: l, b: term() }); }
    return l;
  }
  function term() {
    let l = factor();
    while (isOp('*', '/', '//', '%')) { const op = toks[p++].v; l = N({ k: 'bin', op, a: l, b: factor() }); }
    return l;
  }
  function factor() { if (isOp('-', '+')) { const op = toks[p++].v; return N({ k: 'un', op, a: factor() }); } return power(); }
  function power() { const b = atom(); if (isOp('**')) { p++; return N({ k: 'bin', op: '**', a: b, b: factor() }); } return b; }
  function atom() {
    const t = toks[p++];
    if (!t) throw new PyError('SyntaxError', 'The expression ends too early. Something is missing after the last operator.');
    if (t.t === 'num') return N({ k: 'val', val: t.v.includes('.') ? mk.float(parseFloat(t.v)) : mk.int(parseInt(t.v, 10)) });
    if (t.t === 'str') return N({ k: 'val', val: mk.str(t.v) });
    if (t.t === 'kw' && (t.v === 'True' || t.v === 'False')) return N({ k: 'val', val: mk.bool(t.v === 'True') });
    if (t.t === 'kw') throw new PyError('SyntaxError', '"' + t.v + '" is in a spot where Python expects a value.');
    if (t.t === 'name') return N({ k: 'name', name: t.v });
    if (t.v === '(') {
      const e = or_();
      if (!isOp(')')) throw new PyError('SyntaxError', 'Missing a closing parenthesis ")".');
      p++;
      if (e.k === 'bin' || e.k === 'un') e.paren = true;
      return e;
    }
    throw new PyError('SyntaxError', 'Unexpected "' + t.v + '" here.');
  }
  const root = or_();
  if (p < toks.length) throw new PyError('SyntaxError', 'Unexpected "' + toks[p].v + '". Did you forget an operator between two values?');
  return root;
}

function applyBin(op, a, b) {
  if (CMP.includes(op)) {
    let x, y;
    if (isNum(a) && isNum(b)) { x = numOf(a); y = numOf(b); }
    else if (a.t === 'str' && b.t === 'str') { x = a.v; y = b.v; }
    else if (op === '==' || op === '!=') { const r = op === '!='; return { val: mk.bool(r), why: 'A number and a string are never equal, so ' + op + ' gives ' + fmt(mk.bool(r)) + '.' }; }
    else throw new PyError('TypeError', "'" + op + "' can't compare " + tname(a) + ' with ' + tname(b) + '.');
    const r = { '==': x === y, '!=': x !== y, '<': x < y, '>': x > y, '<=': x <= y, '>=': x >= y }[op];
    return { val: mk.bool(r), why: 'A comparison asks a yes/no question: is ' + fmt(a) + ' ' + op + ' ' + fmt(b) + '? ' + (r ? 'Yes' : 'No') + ', so the answer is ' + fmt(mk.bool(r)) + '.' };
  }
  if (op === '+' && a.t === 'str' && b.t === 'str') return { val: mk.str(a.v + b.v), why: 'Adding two strings glues them together.' };
  if (op === '*' && a.t === 'str' && b.t === 'int') return { val: mk.str(a.v.repeat(Math.max(0, b.v))), why: 'A string times a number repeats the string.' };
  if (!isNum(a) || !isNum(b)) throw new PyError('TypeError', "Python can't use '" + op + "' between " + tname(a) + ' and ' + tname(b) + '.');
  const x = numOf(a), y = numOf(b), floaty = a.t === 'float' || b.t === 'float';
  const num = (v, f) => (f ? mk.float(v) : mk.int(v));
  const whole = Number.isInteger(x) && Number.isInteger(y) && x >= 0 && y > 0;
  switch (op) {
    case '+': return { val: num(x + y, floaty), why: 'Add ' + x + ' and ' + y + '.' };
    case '-': return { val: num(x - y, floaty), why: 'Subtract: ' + x + ' minus ' + y + '.' };
    case '*': return { val: num(x * y, floaty), why: 'Multiply ' + x + ' by ' + y + '.' };
    case '/':
      if (y === 0) throw new PyError('ZeroDivisionError', 'Python cannot divide by zero, so the program would stop with an error.');
      return { val: mk.float(x / y), why: 'Regular division always gives a decimal (float) answer, even when it divides evenly.' };
    case '//': {
      if (y === 0) throw new PyError('ZeroDivisionError', 'Python cannot divide by zero, so the program would stop with an error.');
      const q = Math.floor(x / y);
      const why = whole
        ? '<b>// counts COMPLETE groups.</b> How many whole groups of ' + y + ' fit inside ' + x + '? ' + q + ' ' + (q === 1 ? 'group' : 'groups') + ' (' + q + ' × ' + y + ' = ' + q * y + '). The leftover is thrown away.'
        : '<b>//</b> divides, then rounds DOWN to a whole number (toward negative infinity).';
      return { val: num(q, floaty), why };
    }
    case '%': {
      if (y === 0) throw new PyError('ZeroDivisionError', 'Python cannot divide by zero, so the program would stop with an error.');
      const q = Math.floor(x / y), r = x - y * q;
      const why = whole
        ? '<b>% gives the LEFTOVERS.</b> ' + q + ' complete ' + (q === 1 ? 'group' : 'groups') + ' of ' + y + ' use up ' + q * y + ', leaving ' + x + ' − ' + q * y + ' = ' + r + '.'
        : '<b>%</b> gives what is left after taking out as many complete groups of ' + y + ' as possible.';
      return { val: num(r, floaty), why };
    }
    case '**': {
      const r = Math.pow(x, y);
      const f = floaty || y < 0;
      const why = Number.isInteger(y) && y >= 2 && y <= 5 && Number.isInteger(x) ? 'Exponent: ' + x + ' ** ' + y + ' means ' + Array(y).fill(x).join(' × ') + ' = ' + r + '.' : 'Exponent: raise ' + x + ' to the power ' + y + '.';
      return { val: num(r, f), why };
    }
  }
  throw new PyError('SyntaxError', 'Unknown operator ' + op);
}

function shortCircuits(n) {
  const a = n.a.val;
  return n.op === 'and' ? !truthy(a) : truthy(a);
}

function find(n) {
  switch (n.k) {
    case 'val': return null;
    case 'name': return n;
    case 'un': return find(n.a) || n;
    default:
      if (n.op === 'and' || n.op === 'or') {
        if (n.a.k !== 'val') return find(n.a);
        if (shortCircuits(n)) return n;
        if (n.b.k !== 'val') return find(n.b);
        return n;
      }
      return find(n.a) || find(n.b) || n;
  }
}

function reduceNode(n, env) {
  if (n.k === 'name') {
    if (!(n.name in env)) throw new PyError('NameError', "name '" + n.name + "' is not defined. Give it a value in the Variables box first.");
    const v = env[n.name];
    return { val: v, why: 'A variable is a labeled box. The box <b>' + esc(n.name) + '</b> currently holds ' + esc(fmt(v)) + ', so Python swaps the name for that value.' };
  }
  if (n.k === 'un') {
    const v = n.a.val;
    if (n.op === 'not') return { val: mk.bool(!truthy(v)), why: '<b>not</b> flips a Boolean: not ' + fmt(v) + ' is ' + fmt(mk.bool(!truthy(v))) + '.' };
    if (!isNum(v)) throw new PyError('TypeError', 'A sign cannot be put in front of ' + tname(v) + '.');
    const x = numOf(v);
    return { val: v.t === 'float' ? mk.float(n.op === '-' ? -x : x) : mk.int(n.op === '-' ? -x : x), why: n.op === '-' ? 'A minus sign in front flips the sign of ' + x + '.' : 'A plus sign leaves the value as it is.' };
  }
  if (n.op === 'and' || n.op === 'or') {
    const a = n.a.val;
    if (shortCircuits(n)) {
      return n.op === 'and'
        ? { val: a, why: '<b>and</b> needs BOTH sides to be True. The left side is ' + fmt(a) + ', so the answer is already ' + fmt(a) + '. Python skips the right side (short-circuit).' }
        : { val: a, why: '<b>or</b> needs only ONE side to be True. The left side is already ' + fmt(a) + ', so Python stops there (short-circuit).' };
    }
    const b = n.b.val;
    return n.op === 'and'
      ? { val: b, why: 'The left side is ' + fmt(a) + ', so the right side decides: the answer is ' + fmt(b) + '.' }
      : { val: b, why: 'The left side is ' + fmt(a) + ', so the right side decides: the answer is ' + fmt(b) + '.' };
  }
  return applyBin(n.op, n.a.val, n.b.val);
}

function replaceNode(n, t, v) {
  if (n === t) return v;
  if (n.k === 'un') return { ...n, a: replaceNode(n.a, t, v) };
  if (n.k === 'bin') return { ...n, a: replaceNode(n.a, t, v), b: replaceNode(n.b, t, v) };
  return n;
}
function parentOf(root, t) {
  let found = null;
  (function w(n, p) { if (n === t) { found = p; return; } if (n.k === 'un') w(n.a, n); if (n.k === 'bin') { w(n.a, n); w(n.b, n); } })(root, null);
  return found;
}
function remaining(root) {
  const out = [];
  (function w(n) { if (n.k === 'un') { out.push(n); w(n.a); } else if (n.k === 'bin') { out.push(n); w(n.a); w(n.b); } })(root);
  return out;
}
function levelOf(n) {
  if (n.k === 'un') return n.op === 'not' ? 6 : 2.5;
  const o = n.op;
  if (o === '**') return 2;
  if (['*', '/', '//', '%'].includes(o)) return 3;
  if (o === '+' || o === '-') return 4;
  if (o === 'and') return 7;
  if (o === 'or') return 8;
  return 5;
}
function reasonFor(root, t) {
  if (t.k === 'name') return 'Python cannot calculate with a name. It first looks up the value stored in that variable.';
  const bits = [], lv = levelOf(t);
  if (t.paren) bits.push('It is inside parentheses, rung 1 of the ladder: finish the group first.');
  else if (lv === 2.5) bits.push('A minus sign in front of a value is applied right after exponents.');
  else bits.push('This operator sits on rung ' + lv + ' of the ladder (' + LEVEL_NAMES[lv] + ').');
  const same = remaining(root).filter(n => n !== t && levelOf(n) === lv).length;
  if (same && !t.paren && lv >= 3 && lv <= 5) bits.push('Several operators share this rung, so Python goes left to right.');
  const p = parentOf(root, t);
  if (p) bits.push('The <code>' + esc(p.op) + '</code> next to it has to wait for this answer.');
  return bits.join(' ');
}

function render(n, ctx, parent) {
  let s;
  if (n.k === 'val') {
    s = esc(fmt(n.val));
    if (parent && isNum(n.val) && numOf(n.val) < 0) s = '(' + s + ')';
    if (ctx.fresh === n) s = '<span class="fresh">' + s + '</span>';
    return s;
  }
  if (n.k === 'name') {
    if (ctx.env && n.name in ctx.env) {
      const v = ctx.env[n.name];
      s = esc(fmt(v));
      if (parent && isNum(v) && numOf(v) < 0) s = '(' + s + ')';
    } else s = esc(n.name);
  } else if (n.k === 'un') s = (n.op === 'not' ? 'not ' : n.op) + render(n.a, ctx, n);
  else s = render(n.a, ctx, n) + ' ' + esc(n.op) + ' ' + render(n.b, ctx, n);
  if (n.paren) s = '(' + s + ')';
  if (ctx.hl === n) s = '<mark>' + s + '</mark>';
  return s;
}

function stepsOf(src, env = {}, naive = false) {
  let root = parse(src, naive);
  const startHtml = render(root, {});
  const steps = [];
  let fresh = null, error = null, guard = 0;
  try {
    while (root.k !== 'val' && guard++ < 200) {
      const t = find(root);
      const before = render(root, { hl: t, fresh });
      const reason = reasonFor(root, t);
      const r = reduceNode(t, env);
      const valNode = { k: 'val', id: ++UID, val: r.val };
      const plain = render(t, {});
      steps.push({ before, short: t.k === 'name' ? esc(t.name) + ' → ' + esc(fmt(r.val)) : plain + ' = ' + esc(fmt(r.val)), why: r.why, reason, val: r.val });
      root = replaceNode(root, t, valNode);
      fresh = valNode;
      steps[steps.length - 1].after = render(root, { fresh });
    }
  } catch (e) { if (e instanceof PyError) error = e; else throw e; }
  return { steps, result: root.k === 'val' ? root.val : null, error, startHtml, finalHtml: render(root, { fresh }) };
}
function fullEval(src, env = {}) {
  const r = stepsOf(src, env);
  if (r.error) throw r.error;
  return r.result;
}
function parseVars(text) {
  const env = {};
  (text || '').split(/[\n;]/).map(s => s.trim()).filter(Boolean).forEach(line => {
    const m = line.match(/^([A-Za-z_]\w*)\s*=(?!=)\s*(.+)$/);
    if (!m) throw new PyError('SyntaxError', 'The variable line "' + line + '" should look like   name = value');
    env[m[1]] = fullEval(m[2], env);
  });
  return env;
}

/* ---------- mini program runner ---------- */
function splitArgs(s) {
  const out = []; let depth = 0, q = null, cur = '';
  for (const ch of s) {
    if (q) { cur += ch; if (ch === q) q = null; continue; }
    if (ch === '"' || ch === "'") { q = ch; cur += ch; continue; }
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === ',' && depth === 0) { out.push(cur.trim()); cur = ''; continue; }
    cur += ch;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

function parseProgram(code) {
  const items = [];
  code.split('\n').forEach((raw, i) => {
    if (!raw.trim() || raw.trim().startsWith('#')) return;
    items.push({ line: i + 1, indent: raw.match(/^ */)[0].length, text: raw.trim() });
  });
  let pos = 0;
  function block(indent) {
    const out = [];
    while (pos < items.length) {
      const it = items[pos];
      if (it.indent < indent) break;
      if (it.indent > indent) throw new PyError('IndentationError', 'Line ' + it.line + ': unexpected indent');
      pos++;
      out.push(statement(it));
    }
    return out;
  }
  function body(parent) {
    if (pos >= items.length || items[pos].indent <= parent.indent) throw new PyError('IndentationError', 'Line ' + parent.line + ': expected an indented block after "' + parent.text + '"');
    return block(items[pos].indent);
  }
  function statement(it) {
    let m;
    if ((m = it.text.match(/^if\s+(.+):$/))) {
      const node = { type: 'if', line: it.line, branches: [{ cond: m[1], line: it.line, body: body(it) }], elseBody: null, elseLine: null };
      while (pos < items.length && items[pos].indent === it.indent) {
        const nx = items[pos]; let mm;
        if ((mm = nx.text.match(/^elif\s+(.+):$/))) { pos++; node.branches.push({ cond: mm[1], line: nx.line, body: body(nx) }); }
        else if (/^else\s*:$/.test(nx.text)) { pos++; node.elseLine = nx.line; node.elseBody = body(nx); break; }
        else break;
      }
      return node;
    }
    if ((m = it.text.match(/^for\s+([A-Za-z_]\w*)\s+in\s+range\((.*)\):$/))) {
      const args = splitArgs(m[2]);
      return { type: 'for', line: it.line, v: m[1], args, text: it.text, body: body(it) };
    }
    if ((m = it.text.match(/^while\s+(.+):$/))) return { type: 'while', line: it.line, cond: m[1], text: it.text, body: body(it) };
    if ((m = it.text.match(/^print\((.*)\)$/))) return { type: 'print', line: it.line, args: splitArgs(m[1]), text: it.text };
    if ((m = it.text.match(/^([A-Za-z_]\w*)\s*(\*\*|\/\/|[-+*\/%])=\s*(.+)$/))) return { type: 'aug', line: it.line, name: m[1], op: m[2], expr: m[3], text: it.text };
    if ((m = it.text.match(/^([A-Za-z_]\w*)\s*=(?!=)\s*(.+)$/))) return { type: 'assign', line: it.line, name: m[1], expr: m[2], text: it.text };
    throw new PyError('SyntaxError', 'Line ' + it.line + ': Python cannot read "' + it.text + '"');
  }
  return block(items.length ? items[0].indent : 0);
}

function runProgram(code, limit = 400) {
  const env = {}, out = [], trace = [];
  let error = null, cur = 0, prog;
  const snap = () => ({ ...env });
  const push = (line, kind, note, extra = {}) => {
    cur = line;
    trace.push({ line, kind, note, vars: snap(), out: out.slice(), ...extra });
    if (trace.length > limit) throw new PyError('RuntimeError', 'This program ran too long. Is there an infinite loop?');
  };
  try { prog = parseProgram(code); } catch (e) { if (e instanceof PyError) return { trace: [], out, error: e, env }; throw e; }
  trace.push({ line: 0, kind: 'start', note: 'Memory is empty and nothing has been printed. Press <b>Next Step</b> to run the first line.', vars: {}, out: [] });
  const ev = s => fullEval(s, env);
  const chain = (src, val) => {
    const parts = [render(parse(src), {})];
    const sub = render(parse(src), { env });
    if (sub !== parts[0]) parts.push(sub);
    const f = esc(fmt(val));
    if (parts[parts.length - 1] !== f) parts.push(f);
    return parts.map(p => '<code>' + p + '</code>').join(' → ');
  };
  function assign(s, name, expr, prefix) {
    const val = ev(expr), old = env[name];
    const c = chain(expr, val);
    env[name] = val;
    push(s.line, 'assign', prefix + 'Python works out the <b>right side first</b>: ' + c + '. Then it stores the result in the box <b>' + esc(name) + '</b>' + (old ? ' (the old value ' + esc(fmt(old)) + ' is erased).' : ' (a new box is created).'), { changed: [name] });
  }
  function one(s) {
    cur = s.line;
    if (s.type === 'assign') assign(s, s.name, s.expr, '');
    else if (s.type === 'aug') assign(s, s.name, s.name + ' ' + s.op + ' (' + s.expr + ')', '<code>' + esc(s.text) + '</code> is shorthand for <code>' + esc(s.name + ' = ' + s.name + ' ' + s.op + ' ' + s.expr) + '</code>. ');
    else if (s.type === 'print') {
      const vals = s.args.map(ev);
      const text = vals.map(show).join(' ');
      out.push(text);
      push(s.line, 'print', 'Evaluate ' + (s.args.length ? s.args.map((a, i) => chain(a, vals[i])).join(' and ') : 'nothing') + ', then show it in the console: <code>' + esc(text) + '</code>.');
    } else if (s.type === 'if') {
      for (let i = 0; i < s.branches.length; i++) {
        const b = s.branches[i], c = ev(b.cond), t = truthy(c);
        const hasNext = i + 1 < s.branches.length || s.elseBody;
        push(b.line, 'cond', 'Check the condition ' + chain(b.cond, c) + '. ' + (t ? '<b>True</b>, so the indented block runs.' : '<b>False</b>, so the indented block is skipped' + (hasNext ? ' and Python checks the next branch.' : '.')));
        if (t) { s.branches[i].body.forEach(one); return; }
      }
      if (s.elseBody) { push(s.elseLine, 'cond', 'Every condition above was False, so the <b>else</b> block runs.'); s.elseBody.forEach(one); }
    } else if (s.type === 'for') {
      const a = s.args.map(ev).map(numOf);
      let start = 0, stop, step = 1;
      if (a.length === 1) stop = a[0]; else { start = a[0]; stop = a[1]; if (a.length > 2) step = a[2]; }
      if (!step) throw new PyError('ValueError', 'range() step cannot be 0');
      const values = [];
      for (let v = start; step > 0 ? v < stop : v > stop; v += step) { values.push(v); if (values.length > 200) throw new PyError('RuntimeError', 'range is too large'); }
      values.forEach((v, k) => {
        env[s.v] = mk.int(v);
        push(s.line, 'iter', 'Iteration ' + (k + 1) + ' of ' + values.length + ': the loop variable <b>' + esc(s.v) + '</b> takes the next number in range, so <b>' + esc(s.v) + ' = ' + v + '</b>. The indented block runs once with that value.', { changed: [s.v], iter: { var: s.v, values, idx: k } });
        s.body.forEach(one);
      });
      push(s.line, 'loopend', values.length ? 'There are no more numbers in range, so the loop is <b>finished</b>. Python moves on to the next line after the loop.' : 'The range is empty, so the loop body never runs.', { iter: { var: s.v, values, idx: values.length } });
    } else if (s.type === 'while') {
      let count = 0;
      for (;;) {
        const c = ev(s.cond);
        if (!truthy(c)) { push(s.line, 'loopend', 'Check ' + chain(s.cond, c) + '. <b>False</b>, so the loop is finished after ' + count + ' pass' + (count === 1 ? '' : 'es') + '.', { iter: { var: null, values: null, idx: count, ended: true } }); break; }
        if (++count > 150) throw new PyError('RuntimeError', 'The loop never stops (infinite loop).');
        push(s.line, 'iter', 'Check ' + chain(s.cond, c) + '. <b>True</b>, so the block runs again (pass ' + count + ').', { iter: { var: null, values: null, idx: count - 1 } });
        s.body.forEach(one);
      }
    }
  }
  try { prog.forEach(one); } catch (e) {
    if (!(e instanceof PyError)) throw e;
    error = e;
    trace.push({ line: cur, kind: 'error', note: '<b>' + esc(e.pyType) + ':</b> ' + esc(e.message), vars: snap(), out: out.slice() });
  }
  return { trace, out, error, env, prog };
}
/*ENGINE_END*/

/* =====================================================================
   Part 2: progress, ranks, badges
   ===================================================================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

const RANKS = [
  { name: 'Apprentice', xp: 0, icon: '🌱' }, { name: 'Explorer', xp: 100, icon: '🧭' }, { name: 'Detective', xp: 300, icon: '🕵️' },
  { name: 'Analyst', xp: 550, icon: '📊' }, { name: 'Python Master', xp: 800, icon: '🐍' }
];
const rankOf = xp => { let i = 0; RANKS.forEach((r, k) => { if (xp >= r.xp) i = k; }); return { i, cur: RANKS[i], next: RANKS[i + 1] }; };

const BADGES = {
  m1: ['Rule Follower', '📜'], m2: ['Ladder Climber', '🪜'], m3: ['Clock Master', '⏱️'], m4: ['Memory Detective', '🕵️'], m5: ['Logic Switcher', '💡'],
  m6: ['Fork in the Road', '🔀'], m7: ['Loop Legend', '🔁'], m8: ['Bug Squasher', '🪲'], m9: ['Bootcamp Graduate', '🎓'],
  machine: ['Machine Operator', '⚙️'], sharp: ['Sharp Mind (90%+)', '🧠'], streak: ['Hot Streak (5 in a row)', '🔥']
};

const ctx = { mod: 'home', n: 0, qids: {} };
ctx.id = () => ctx.mod + '-' + (++ctx.n);
ctx.reg = id => { (ctx.qids[ctx.mod] = ctx.qids[ctx.mod] || new Set()).add(id); };

const Store = {
  d: { xp: 0, done: {}, badges: [], machine: 0, streak: 0 },
  load() { try { const s = JSON.parse(localStorage.getItem('apcsp-camp-v1')); if (s) this.d = { ...this.d, ...s }; } catch (e) { /* ignore */ } },
  save() { try { localStorage.setItem('apcsp-camp-v1', JSON.stringify(this.d)); } catch (e) { /* ignore */ } },
  reset() { this.d = { xp: 0, done: {}, badges: [], machine: 0, streak: 0 }; this.save(); },
  badge(id) {
    if (this.d.badges.includes(id)) return;
    this.d.badges.push(id); this.save();
    toast('<b>' + BADGES[id][1] + ' Badge earned!</b><br>' + BADGES[id][0]);
  },
  record(id, ok) {
    if (id in this.d.done) return;
    const before = rankOf(this.d.xp).i;
    this.d.done[id] = ok ? 1 : 0;
    this.d.xp += ok ? 10 : 2;
    this.d.streak = ok ? this.d.streak + 1 : 0;
    if (this.d.streak >= 5) this.badge('streak');
    const after = rankOf(this.d.xp);
    if (after.i > before) toast('<b>' + after.cur.icon + ' Rank up!</b><br>You are now a ' + after.cur.name);
    MODULES.forEach(m => { if (m.id !== 'm0' && progressOf(m).done === progressOf(m).total && progressOf(m).total) this.badge(m.id); });
    this.save(); refreshChrome();
  }
};
function progressOf(m) {
  const ids = [...(ctx.qids[m.id] || [])];
  return { total: ids.length, done: ids.filter(i => i in Store.d.done).length };
}
function toast(html) {
  const t = document.createElement('div'); t.className = 'toast'; t.innerHTML = html;
  $('#toasts').append(t); setTimeout(() => t.remove(), 4300);
}
function refreshChrome() {
  const r = rankOf(Store.d.xp), xp = Store.d.xp;
  $('#rankIcon').textContent = r.cur.icon; $('#rankName').textContent = r.cur.name;
  const pct = r.next ? (xp - r.cur.xp) / (r.next.xp - r.cur.xp) * 100 : 100;
  $('#xpFill').style.width = pct + '%';
  $('#xpText').textContent = xp + ' XP' + (r.next ? ' · next ' + r.next.xp : ' · MAX');
  $$('#nav a[data-mod]').forEach(a => {
    const m = MODULES.find(x => x.id === a.dataset.mod), p = progressOf(m);
    a.classList.toggle('done', p.total > 0 && p.done === p.total);
    $('.mini', a).textContent = p.total ? p.done + '/' + p.total : '';
  });
}

/* =====================================================================
   Part 3: question components
   ===================================================================== */
function stepCard(s, j, o = {}) {
  return '<div class="step" style="--d:' + (j * 0.12) + 's"><div class="step-h">Step ' + (j + 1) + '</div><div class="step-expr"><code>' + s.before + '</code></div><div class="step-short">' + s.short + '</div><div class="step-why">' + s.why + '</div>' + (o.noReason ? '' : '<div class="step-reason">Why this one now? ' + s.reason + '</div>') + '</div>';
}
function solutionHTML(r, d) {
  const n = r.steps.length;
  return '<div class="steps">' + (n ? r.steps.map((s, j) => stepCard(s, j)).join('') : '<div class="step">There is nothing to calculate: it is already a value.</div>') +
    '<div class="final" style="--d:' + (n * 0.12 + 0.1) + 's">Final Answer: ' + esc(fmt(r.result)) + '</div></div>';
}

function quiz(host, q) {
  q.id = q.id || ctx.id(); ctx.reg(q.id);
  const opts = shuffle([...new Set([q.correct, ...q.wrong])]);
  const el = document.createElement('div'); el.className = 'quiz card';
  el.innerHTML = '<div class="q-top"><span class="q-tag">' + (q.tag || 'Predict') + '</span>' + (q.id in Store.d.done ? '<span class="q-done">✔ attempted before</span>' : '') + '</div>' +
    '<div class="phases"><span class="ph on">1 Predict</span><span class="ph">2 Explain</span><span class="ph">3 Visualize</span><span class="ph">4 Verify</span></div>' +
    '<div class="q-prompt">' + q.prompt + '</div>' + (q.code ? '<pre class="code">' + esc(q.code) + '</pre>' : '') +
    '<div class="choices">' + opts.map((o, i) => '<button class="choice" data-i="' + i + '">' + esc(o) + '</button>').join('') + '</div>' +
    '<div class="feedback"></div><div class="solution"></div>';
  host.append(el);
  const btns = $$('.choice', el); let answered = false;
  btns.forEach((b, i) => b.addEventListener('click', () => {
    if (answered) return; answered = true;
    const ok = opts[i] === q.correct;
    btns.forEach(x => x.disabled = true);
    btns[opts.indexOf(q.correct)].classList.add('correct');
    if (!ok) b.classList.add('wrong');
    $('.feedback', el).innerHTML = ok ? '<span style="color:var(--lime)">✔ Great prediction! Now verify it below.</span>' : '<span style="color:var(--amber)">Not quite, and that is useful. Follow the steps to see where Python went a different way.</span>';
    const sol = $('.solution', el);
    sol.innerHTML = (typeof q.explain === 'function' ? q.explain() : q.explain || '') +
      (q.machine ? '<div class="row" style="margin-top:10px"><button class="btn ghost" data-m>⚙️ Verify in the Thinking Machine</button></div>' : '');
    sol.classList.add('show');
    const mb = $('[data-m]', sol); if (mb) mb.onclick = () => openMachine(q.machine.expr, q.machine.vars);
    $$('.ph', el).forEach((p, k) => setTimeout(() => p.classList.add('on'), k * 250));
    Store.record(q.id, ok);
    if (q.onAnswer) q.onAnswer(ok);
  }));
  return el;
}

function nearby(r, naiveVal) {
  const out = [];
  const typed = x => (r.t === 'float' ? mk.float(x) : mk.int(x));
  if (naiveVal && isNum(naiveVal)) out.push(fmt(naiveVal));
  const c = numOf(r);
  [c + 1, c - 1, c + 2, c - 2, c * 2, c + 10].forEach(x => out.push(fmt(typed(x))));
  return out.filter(x => x !== fmt(r));
}
function qExpr(expr, varsText = '', o = {}) {
  const env = parseVars(varsText), r = stepsOf(expr, env);
  let wrong;
  if (r.result.t === 'bool') wrong = [fmt(mk.bool(!r.result.v))];
  else if (r.result.t === 'str') wrong = o.wrong || [];
  else { let nv = null; try { nv = stepsOf(expr, env, true).result; } catch (e) { /* ignore */ } wrong = [...new Set(nearby(r.result, nv))].slice(0, 3); }
  return {
    tag: o.tag || 'Output prediction', prompt: o.prompt || 'What value does Python print?',
    code: (varsText ? varsText.split(/;/).map(s => s.trim()).join('\n') + '\n' : '') + 'print(' + expr + ')',
    correct: fmt(r.result), wrong, machine: { expr, vars: varsText }, explain: () => solutionHTML(r)
  };
}
const fmtOut = lines => (lines.length ? lines.join(' ⏎ ') : '(nothing prints)');
function traceTable(code, rt) {
  const L = code.split('\n');
  const rows = rt.trace.filter(t => t.kind !== 'start').map(t => {
    const vars = Object.entries(t.vars).map(([k, v]) => k + ' = ' + show(v)).join(', ') || '—';
    return '<tr><td>' + t.line + '</td><td><code>' + esc((L[t.line - 1] || '').trim()) + '</code><span class="note">' + t.note + '</span></td><td>' + esc(vars) + '</td><td>' + esc(t.out.slice(-1)[0] === undefined ? '' : t.out.join(' ⏎ ')) + '</td></tr>';
  }).join('');
  return '<div class="tblwrap"><table class="tt"><tr><th>Line</th><th>What Python does</th><th>Memory afterwards</th><th>Console</th></tr>' + rows + '</table></div>';
}
function qProg(code, kind, wrong, o = {}) {
  const rt = runProgram(code);
  let correct;
  if (kind === 'out') correct = fmtOut(rt.out);
  else if (kind === 'count') correct = String(rt.out.length);
  else correct = fmt(rt.env[kind.split(':')[1]]);
  const w = kind === 'out' ? wrong.map(x => (x === '' ? fmtOut([]) : fmtOut(x.split('|')))) : wrong;
  return {
    tag: o.tag || 'Trace it', prompt: o.prompt || (kind === 'out' ? 'What is printed? (⏎ separates lines)' : kind === 'count' ? 'How many lines are printed?' : 'What is the final value of <code>' + kind.split(':')[1] + '</code>?'),
    code, correct, wrong: w.filter(x => x !== correct),
    explain: () => traceTable(code, rt) + '<div class="final" style="margin-top:10px">Final Answer: ' + esc(correct) + '</div>'
  };
}
function qMC(prompt, correct, wrong, explain, o = {}) {
  return { tag: o.tag || 'Concept check', prompt, correct, wrong, explain: () => explain, code: o.code };
}

/* ---------- step-through tracer ---------- */
function flowList(list) { return list.map(flowOne).join('<div class="arr">↓</div>'); }
function flowOne(s) {
  if (s.type === 'if') return flowIf(s, 0);
  if (s.type === 'for' || s.type === 'while') {
    const label = s.type === 'for' ? s.v + ' in range(' + s.args.join(', ') + ')?' : s.cond + '?';
    return '<div class="fl-if"><div class="fl diamond" data-line="' + s.line + '">' + esc(label) + '</div><div class="fl-branches"><div class="fl-col"><span class="yes">yes</span>' + flowList(s.body) + '<div class="loopback">↺ back to the check</div></div><div class="fl-col"><span class="no">no</span><div class="skip">leave the loop</div></div></div></div>';
  }
  return '<div class="fl" data-line="' + s.line + '">' + esc(s.text) + '</div>';
}
function flowIf(s, i) {
  const b = s.branches[i]; let rest;
  if (i + 1 < s.branches.length) rest = flowIf(s, i + 1);
  else if (s.elseBody) rest = '<span class="fl-else" data-line="' + s.elseLine + '">else</span><div class="arr">↓</div>' + flowList(s.elseBody);
  else rest = '<div class="skip">skip: nothing happens</div>';
  return '<div class="fl-if"><div class="fl diamond" data-line="' + b.line + '">' + esc(b.cond) + '?</div><div class="fl-branches"><div class="fl-col"><span class="yes">True</span>' + flowList(b.body) + '</div><div class="fl-col"><span class="no">False</span>' + rest + '</div></div></div>';
}

function tracer(host, code, opt = {}) {
  const rt = runProgram(code), T = rt.trace, L = code.split('\n');
  if (!T.length) { host.innerHTML = '<div class="err"><b>' + esc(rt.error.pyType) + ':</b> ' + esc(rt.error.message) + '</div>'; return; }
  let i = 0, flow = '';
  if (opt.flow && rt.prog) flow = flowList(rt.prog);
  host.innerHTML = '<div class="tracer"><div class="tr-grid"><div><div class="tr-code"></div>' + (flow ? '<div class="tr-flow"><div class="muted" style="font-size:.78rem;margin-bottom:6px">FLOW CHART</div>' + flow + '</div>' : '') + '</div>' +
    '<div><div class="chips"></div><h4>🧠 Memory</h4><div class="mem"></div><h4 style="margin-top:12px">🖥️ Console</h4><pre class="console"></pre><div class="tr-note"></div></div></div>' +
    '<div class="tr-ctrl"><button class="btn ghost" data-a="reset">⏮ Reset</button><button class="btn ghost" data-a="back">◀ Back</button><button class="btn" data-a="next">▶ Next Step</button>' + (opt.iter ? '<button class="btn" data-a="iter" style="--mc:var(--lime)">⏭ Next Iteration</button>' : '') + '<span class="cnt"></span></div></div>';
  const codeEl = $('.tr-code', host);
  function draw() {
    const e = T[i], prev = T[i - 1];
    const visited = new Set(T.slice(0, i + 1).map(t => t.line));
    codeEl.innerHTML = L.map((ln, k) => {
      const n = k + 1, cls = e.line === n ? 'active' : visited.has(n) ? 'done' : '';
      return '<div class="cl ' + cls + '"><span class="ln">' + n + '</span><code>' + (esc(ln) || ' ') + '</code></div>';
    }).join('');
    const names = Object.keys(e.vars);
    $('.mem', host).innerHTML = names.length ? names.map(n => {
      const ch = prev && (!prev.vars[n] || fmt(prev.vars[n]) !== fmt(e.vars[n]));
      return '<div class="box' + (ch ? ' changed' : '') + '"><div class="name">' + esc(n) + '</div><div class="val">' + esc(fmt(e.vars[n])) + '</div>' + (ch && prev.vars[n] ? '<div class="old">was ' + esc(fmt(prev.vars[n])) + '</div>' : '') + '</div>';
    }).join('') : '<span class="muted">(empty: no variables yet)</span>';
    $('.console', host).textContent = e.out.length ? e.out.join('\n') : '▮';
    $('.tr-note', host).innerHTML = e.note + (i === T.length - 1 && e.kind !== 'error' ? '<br>✅ <b>Program finished.</b>' : '');
    $('.cnt', host).textContent = 'Step ' + i + ' of ' + (T.length - 1);
    $$('[data-a="back"],[data-a="reset"]', host).forEach(b => b.disabled = i === 0);
    $$('[data-a="next"],[data-a="iter"]', host).forEach(b => b.disabled = i >= T.length - 1);
    let it = null; for (let k = 0; k <= i; k++) if (T[k].iter) it = T[k];
    const chips = $('.chips', host);
    if (it && it.iter.values) {
      const ended = it.kind === 'loopend';
      chips.innerHTML = '<span class="muted">range →</span>' + it.iter.values.map((v, n) => '<span class="ic ' + (ended || n < it.iter.idx ? 'done' : n === it.iter.idx ? 'cur' : '') + '">' + v + '</span>').join('') + (it.iter.var && !ended ? '<span class="muted">&nbsp;<code>' + esc(it.iter.var) + '</code> is the current value</span>' : '');
    } else if (it) chips.innerHTML = it.iter.ended ? '<span class="ic done">Loop finished after ' + it.iter.idx + ' passes</span>' : '<span class="ic cur">Pass ' + (it.iter.idx + 1) + '</span>';
    else chips.innerHTML = '';
    $$('[data-line]', host).forEach(f => {
      const n = +f.dataset.line;
      f.classList.toggle('active', n === e.line); f.classList.toggle('visited', n !== e.line && visited.has(n));
    });
  }
  host.addEventListener('click', ev => {
    const a = ev.target.closest('[data-a]'); if (!a || a.disabled) return;
    const act = a.dataset.a;
    if (act === 'next') i = Math.min(i + 1, T.length - 1);
    else if (act === 'back') i = Math.max(0, i - 1);
    else if (act === 'reset') i = 0;
    else if (act === 'iter') { let k = i + 1; while (k < T.length - 1 && !['iter', 'loopend'].includes(T[k].kind)) k++; i = Math.min(k, T.length - 1); }
    draw();
  });
  draw();
}

function lesson(host, Ls) {
  const wrap = document.createElement('section'); wrap.className = 'lesson card';
  wrap.innerHTML = '<h3>' + (Ls.icon || '▸') + ' ' + Ls.title + '</h3>' + (Ls.intro ? '<p>' + Ls.intro + '</p>' : '') + '<pre class="code">' + esc(Ls.code) + '</pre><div class="lq"></div><div class="lt"></div><div class="lwhy"></div>';
  host.append(wrap);
  const q = qProg(Ls.code, Ls.kind || 'out', Ls.wrong, { prompt: Ls.ask, tag: 'Predict first' });
  delete q.code;
  q.explain = () => '<p class="muted">Now watch Python do it one step at a time and compare with your prediction.</p>';
  q.onAnswer = () => {
    $('pre.code', wrap).remove();
    tracer($('.lt', wrap), Ls.code, { flow: Ls.flow, iter: Ls.iter });
    if (Ls.why) $('.lwhy', wrap).innerHTML = '<div class="callout good"><b>Why it works:</b> ' + Ls.why + '</div>';
  };
  quiz($('.lq', wrap), q);
}

/* =====================================================================
   Part 4: the Python Thinking Machine
   ===================================================================== */
const MACHINE_EXAMPLES = [
  ['4 + 3 * 2', ''], ['47 // 8 + 47 % 8 * 2', ''], ['running and elapsed_seconds % 60 == 0', 'running = True\nelapsed_seconds = 120'],
  ['(125 // 60) * 100 + 125 % 60', ''], ['not (age >= 16) or has_permit', 'age = 15\nhas_permit = True'], ['2 + 3 ** 2 * 4 - 10 // 3', ''],
  ['10 - 4 - 3', ''], ['3661 % 3600 // 60', '']
];
function openMachine(expr, vars) {
  window.__machinePreset = expr ? { expr, vars: vars || '' } : null;
  if (location.hash === '#machine') route(); else location.hash = '#machine';
}

function buildMachine(host) {
  const pre = window.__machinePreset || { expr: '47 // 8 + 47 % 8 * 2', vars: '' }; window.__machinePreset = null;
  host.innerHTML = '<div class="card machine"><div class="phases"><span class="ph on">1 Predict</span><span class="ph on">2 Explain</span><span class="ph on">3 Visualize</span><span class="ph on">4 Verify</span></div>' +
    '<label class="l">Python expression</label><input id="mx" class="code-input" spellcheck="false" autocomplete="off">' +
    '<label class="l">Variables the expression uses (optional, one per line, like <code>x = 5</code>)</label><textarea id="mv" rows="2" spellcheck="false"></textarea>' +
    '<label class="l">Your prediction of the final answer (optional, but thinking first makes you stronger)</label><input id="mp" class="code-input" style="max-width:260px" spellcheck="false">' +
    '<div class="examples"><span class="muted">Try:</span>' + MACHINE_EXAMPLES.map((e, i) => '<button class="chip" data-ex="' + i + '">' + esc(e[0]) + '</button>').join('') + '</div>' +
    '<div class="row"><button class="btn" id="mstart">🚀 Start machine</button><button class="btn ghost" id="mnext" disabled>▶ Next step</button><button class="btn ghost" id="mall" disabled>⏩ Run all</button></div>' +
    '<div id="mout"></div></div>';
  const X = $('#mx', host), V = $('#mv', host), P = $('#mp', host), out = $('#mout', host);
  X.value = pre.expr; V.value = pre.vars;
  let M = null, k = 0;
  function view() {
    if (!M) return;
    const N = M.steps.length;
    let h = '<div class="bigexpr"><code>' + (k < N ? M.steps[k].before : M.finalHtml) + '</code></div>';
    if (k < N) h += '<div class="next-hint">🔎 <b>Next up</b> is the highlighted part. <i>Predict what it becomes</i>, then press <b>Next step</b>.<br><span class="muted">' + M.steps[k].reason + '</span></div>';
    h += '<div class="steps">' + M.steps.slice(0, k).map((s, j) => stepCard(s, 0).replace('Step 1', 'Step ' + (j + 1))).join('') + '</div>';
    if (k >= N) {
      if (M.error) h += '<div class="err"><b>' + esc(M.error.pyType) + ':</b> ' + esc(M.error.message) + '</div>';
      else {
        const pv = P.value.trim(); let cmp = '';
        if (pv) cmp = (pv.replace(/['"]/g, '') === show(M.result).replace(/['"]/g, '')) ? '<br>🎯 Your prediction <code>' + esc(pv) + '</code> was <b>correct</b>!' : '<br>Your prediction <code>' + esc(pv) + '</code> was different. Compare it with each step above to find where the paths split.';
        h += '<div class="final">Final Answer: ' + esc(fmt(M.result)) + cmp + '</div>';
      }
      if (!M.counted) { M.counted = true; Store.d.machine++; Store.save(); if (Store.d.machine >= 5) Store.badge('machine'); }
    }
    out.innerHTML = h;
    $('#mnext', host).disabled = $('#mall', host).disabled = k >= N;
  }
  function start() {
    out.innerHTML = '';
    try {
      const env = parseVars(V.value);
      M = stepsOf(X.value, env); k = 0;
      if (!M.steps.length && !M.error) { M.finalHtml = M.startHtml; }
    } catch (e) {
      if (!(e instanceof PyError)) throw e;
      M = null; $('#mnext', host).disabled = $('#mall', host).disabled = true;
      out.innerHTML = '<div class="err"><b>' + esc(e.pyType) + ':</b> ' + esc(e.message) + '</div>';
      return;
    }
    view();
  }
  $('#mstart', host).onclick = start;
  $('#mnext', host).onclick = () => { k++; view(); };
  $('#mall', host).onclick = () => { k = M.steps.length; view(); };
  X.addEventListener('keydown', e => { if (e.key === 'Enter') start(); });
  $$('[data-ex]', host).forEach(b => b.onclick = () => { const e = MACHINE_EXAMPLES[b.dataset.ex]; X.value = e[0]; V.value = e[1]; P.value = ''; start(); });
  start();
}

/* =====================================================================
   Part 5: module content
   ===================================================================== */
const info = (icon, title, html) => '<div class="card"><h3>' + icon + ' ' + title + '</h3>' + html + '</div>';
const exprList = (host, list) => list.forEach(e => quiz(host, qExpr(e[0], e[1] || '', e[2] || {})));
const sub = (host, html) => { const d = document.createElement('div'); d.innerHTML = html; host.append(d); return d; };

function build1(h) {
  sub(h, info('🤖', 'Computers follow rules, not hunches',
    '<p>Python is like a very fast, very literal robot. It never guesses and never skips ahead. It follows the <b>same rules every time</b>. Once you know the rules, you can predict any output.</p>' +
    '<div class="grid g3"><div class="callout"><b>Rule 1</b><br>Some operators go before others (multiplication before addition).</div><div class="callout"><b>Rule 2</b><br>Python does <b>one operation at a time</b>.</div><div class="callout"><b>Rule 3</b><br>Ties go <b>left to right</b>.</div></div>'));
  sub(h, '<div class="callout good"><b>Your job:</b> before each answer appears, <b>pick your prediction</b>. Wrong guesses are welcome here, because the steps show you exactly why.</div>');
  sub(h, '<h2>🎯 Example 1: the classic</h2><p class="muted">Python reads <code>4 + 3 * 2</code>. What does it print?</p>');
  exprList(h, [
    ['4 + 3 * 2'], ['10 - 2 * 3'], ['2 * 5 + 3 * 4'], ['20 // 4 + 1'], ['18 - 6 // 3'], ['7 + 8 % 3'],
    ['2 + 3 ** 2'], ['100 - 5 * 4 + 2'], ['9 // 2 * 2'], ['10 % 4 * 3 + 1'], ['30 / 5 + 2 * 3'], ['50 - 10 // 5 * 2']
  ]);
}

const LADDER = [
  { n: 1, name: 'Parentheses', ops: '( )', c: '#22d3ee', d: 'Anything inside parentheses is finished first. Use them to take control.', e: '(4 + 3) * 2' },
  { n: 2, name: 'Exponents', ops: '**', c: '#a78bfa', d: 'Powers come next. 3 ** 2 means 3 × 3.', e: '2 + 3 ** 2' },
  { n: 3, name: 'Multiply / Divide / Floor / Mod', ops: '* / // %', c: '#f472b6', d: 'All four are equals. When several appear, go left to right.', e: '20 // 6 * 2 + 7 % 4' },
  { n: 4, name: 'Add / Subtract', ops: '+ -', c: '#fbbf24', d: 'Addition and subtraction come after the rung above, also left to right.', e: '10 - 4 + 2' },
  { n: 5, name: 'Comparisons', ops: '== != < > <= >=', c: '#a3e635', d: 'After math is finished, comparisons turn numbers into True or False.', e: '2 + 3 > 4 * 1' },
  { n: 6, name: 'not', ops: 'not', c: '#38bdf8', d: 'not flips a Boolean value.', e: 'not 5 > 3' },
  { n: 7, name: 'and', ops: 'and', c: '#fb923c', d: 'and is True only when both sides are True. It beats or.', e: 'True or False and False' },
  { n: 8, name: 'or', ops: 'or', c: '#f87171', d: 'or is the last rung. It is True when at least one side is True.', e: '1 > 2 or 3 > 2' }
];
function build2(h) {
  const d = sub(h, '<div class="card"><h3>🪜 The Order-of-Operations Ladder</h3><p class="muted">Python climbs from rung 1 (first) down to rung 8 (last). Click a rung, or press the button.</p><div class="ladder"></div><div class="row"><button class="btn" id="climb">🧗 Animate the climb</button></div><div id="ldet"></div></div>');
  const lad = $('.ladder', d);
  lad.innerHTML = LADDER.map(r => '<button class="rung" style="--c:' + r.c + '" data-n="' + r.n + '"><span class="n" style="background:' + r.c + '">' + r.n + '</span><b>' + r.name + '</b><span class="ops">' + esc(r.ops) + '</span></button>').join('');
  const pick = n => {
    const r = LADDER[n - 1];
    $$('.rung', lad).forEach(b => b.classList.toggle('active', +b.dataset.n === n));
    const st = stepsOf(r.e).steps.map(s => '<code>' + s.short + '</code>').join(' &nbsp;→&nbsp; ');
    $('#ldet', d).innerHTML = '<div class="callout"><b>' + r.name + ':</b> ' + r.d + '<br>Example <code>' + esc(r.e) + '</code>: ' + st + ' &nbsp;→&nbsp; <b>' + esc(fmt(fullEval(r.e))) + '</b> &nbsp; <button class="btn ghost" id="lm">⚙️ Open in machine</button></div>';
    $('#lm', d).onclick = () => openMachine(r.e);
  };
  $$('.rung', lad).forEach(b => b.onclick = () => pick(+b.dataset.n));
  $('#climb', d).onclick = () => $$('.rung', lad).forEach((b, i) => setTimeout(() => { b.classList.remove('lit'); void b.offsetWidth; b.classList.add('lit'); pick(i + 1); }, i * 650));
  pick(1);

  sub(h, '<div class="card"><h3>🔁 Parentheses change everything</h3><p class="muted">Predict each answer in your head, then press Reveal.</p><div class="mini-grid" id="cmps"></div><div class="row" style="margin-top:10px"><button class="btn" id="reveal">👁 Reveal answers</button></div></div>');
  const pairs = [['4 + 3 * 2', '(4 + 3) * 2'], ['20 - 8 // 2', '(20 - 8) // 2'], ['2 + 6 % 4', '(2 + 6) % 4'], ['not True or True', 'not (True or True)']];
  $('#cmps', h).innerHTML = pairs.map(p => '<div class="cmp"><div><code>' + esc(p[0]) + '</code> → <span class="res blur">' + esc(fmt(fullEval(p[0]))) + '</span></div><div><code>' + esc(p[1]) + '</code> → <span class="res blur">' + esc(fmt(fullEval(p[1]))) + '</span></div></div>').join('');
  $('#reveal', h).onclick = () => $$('.res', h).forEach(r => r.classList.remove('blur'));

  sub(h, info('⚠️', 'Common traps', '<ul><li><b>Left to right is NOT the whole rule.</b> <code>4 + 3 * 2</code> is 10, not 14.</li><li><code>//</code> and <code>%</code> have the same priority as <code>*</code>. <code>47 % 8 * 2</code> is (47 % 8) × 2.</li><li><b>and</b> is done before <b>or</b>. <code>True or False and False</code> is True.</li><li>Comparisons happen <b>before</b> and / or, so <code>x &gt; 3 and y &lt; 2</code> works as you expect.</li></ul>'));
  sub(h, '<h2>🎯 Predict, then see the steps</h2>');
  exprList(h, [
    ['2 ** 3 * 2'], ['(4 + 6) // 3'], ['4 + 6 // 3'], ['10 - 4 - 3'], ['2 * 3 ** 2'], ['17 % 5 * 2 + 1'], ['20 - 2 ** 3 * 2'],
    ['not 5 > 3 or 2 == 2'], ['3 > 2 and 4 < 2 or 1 == 1'], ['True or False and False'], ['(10 + 5) % 4 == 3'], ['7 + 3 * 2 > 12 and 8 // 3 == 2']
  ]);
}

function build3(h) {
  sub(h, '<div class="card"><h3>⏱️ Your clock timer project</h3><p>You already wrote this program. Let us understand <i>why</i> it works.</p><pre class="code">seconds = 125\nminutes = seconds // 60\nleftover = seconds % 60\nprint(minutes, leftover)</pre>' +
    '<div class="grid g2"><div class="callout"><b>// means complete groups.</b><br>How many full groups of 60 seconds fit in 125? <b>2</b> full minutes.</div><div class="callout good"><b>% means leftovers.</b><br>After taking out those 2 minutes (120 s), <b>5</b> seconds are left.</div></div></div>');
  const d = sub(h, '<div class="card" style="--mc:var(--amber)"><h3>🔬 Clock Lab</h3><p class="muted">Pick a number of seconds. <b>Predict first</b>: type the minutes and leftover seconds, then press Check.</p>' +
    '<div class="row" id="presets"></div><div class="row" style="margin-top:10px"><span>or your own:</span><input id="cs" class="in" type="number" min="0" max="86399" placeholder="seconds"><button class="btn ghost" id="cuse">Use</button></div>' +
    '<div class="row" style="margin-top:12px"><label>minutes <code>//</code>: <input id="pm" class="in" type="number" min="0"></label><label>seconds <code>%</code>: <input id="ps" class="in" type="number" min="0"></label><button class="btn" id="ccheck">✔ Check &amp; visualize</button></div><div id="cfb" class="feedback"></div><div id="cviz"></div></div>');
  const PRE = [61, 90, 125, 200, 3661];
  PRE.forEach(s => ctx.reg('m3-clock-' + s));
  let cur = 125;
  const sel = () => $$('#presets .chip', d).forEach(c => c.classList.toggle('on', +c.dataset.s === cur));
  $('#presets', d).innerHTML = PRE.map(s => '<button class="chip" data-s="' + s + '">' + s + ' seconds</button>').join('');
  const choose = s => { cur = s; sel(); $('#cviz', d).innerHTML = ''; $('#cfb', d).textContent = ''; $('#pm', d).value = $('#ps', d).value = ''; };
  $$('#presets .chip', d).forEach(c => c.onclick = () => choose(+c.dataset.s));
  $('#cuse', d).onclick = () => { const v = parseInt($('#cs', d).value, 10); if (v >= 0 && v < 86400) choose(v); };
  sel();
  $('#ccheck', d).onclick = () => {
    const pm = parseInt($('#pm', d).value, 10), ps = parseInt($('#ps', d).value, 10);
    if (isNaN(pm) || isNaN(ps)) { $('#cfb', d).innerHTML = '<span style="color:var(--amber)">Make a prediction in both boxes first. Thinking comes before answers!</span>'; return; }
    const m = Math.floor(cur / 60), s = cur % 60, hr = Math.floor(cur / 3600), rem = cur % 3600, m2 = Math.floor(rem / 60);
    const ok = pm === m && ps === s;
    $('#cfb', d).innerHTML = ok ? '<span style="color:var(--lime)">✔ Both correct! Watch it happen.</span>' : '<span style="color:var(--amber)">Your guess: ' + pm + ' min, ' + ps + ' s. Look at the groups below to see the real answer.</span>';
    if (PRE.includes(cur)) Store.record('m3-clock-' + cur, ok);
    const pad = n => String(n).padStart(2, '0');
    let blocks = '';
    for (let i = 0; i < m; i++) blocks += '<span class="blk" style="--d:' + Math.min(i * .05, 2) + 's">60 s</span>';
    let dots = '';
    for (let i = 0; i < s; i++) dots += '<span class="dot" style="--d:' + (m * .05 + i * .03) + 's"></span>';
    const secDeg = s * 6, minDeg = (m % 60) * 6 + s / 10;
    $('#cviz', d).innerHTML = '<div class="clockwrap"><div>' +
      '<pre class="code" style="--mc:var(--amber)">minutes = ' + cur + ' // 60   →  ' + m + '\nleftover = ' + cur + ' % 60   →  ' + s + '</pre>' +
      '<div class="callout"><b>// groups:</b> ' + m + ' complete group' + (m === 1 ? '' : 's') + ' of 60 fit in ' + cur + ' (' + m + ' × 60 = ' + m * 60 + ')</div>' +
      '<div class="groups">' + (blocks || '<span class="muted">no complete minute yet</span>') + '</div>' +
      '<div class="callout good"><b>% leftovers:</b> ' + cur + ' − ' + m * 60 + ' = ' + s + ' seconds remain</div>' +
      '<div class="groups">' + (dots || '<span class="muted">nothing left over</span>') + '</div>' +
      (cur >= 3600 ? '<div class="callout"><b>Bonus (hours):</b> <code>' + cur + ' // 3600</code> = ' + hr + ' hour' + (hr === 1 ? '' : 's') + ', then <code>' + cur + ' % 3600 // 60</code> = ' + m2 + ' minute' + (m2 === 1 ? '' : 's') + ', and <code>' + cur + ' % 60</code> = ' + s + ' s.</div>' : '') +
      '</div><div><div class="digital">' + (cur >= 3600 ? pad(hr) + ':' + pad(m2) + ':' + pad(s) : pad(m) + ':' + pad(s)) + '</div>' +
      '<svg class="clock" viewBox="0 0 200 200" width="100%" style="max-width:240px;display:block;margin:10px auto"><circle class="face" cx="100" cy="100" r="92"/>' +
      [...Array(12)].map((_, i) => '<line class="tick" x1="100" y1="12" x2="100" y2="22" style="transform:rotate(' + i * 30 + 'deg);transform-origin:100px 100px;transition:none"/>').join('') +
      '<line id="hm" x1="100" y1="100" x2="100" y2="38" stroke="#fbbf24" stroke-width="6" style="transform:rotate(0deg)"/><line id="hs" x1="100" y1="100" x2="100" y2="22" stroke="#f472b6" stroke-width="3" style="transform:rotate(0deg)"/><circle cx="100" cy="100" r="6" fill="#e9edff"/></svg>' +
      '<p class="muted" style="text-align:center">minute hand = ' + m % 60 + ' min · second hand = ' + s + ' s</p></div></div>';
    requestAnimationFrame(() => requestAnimationFrame(() => { const a = $('#hm', d), b = $('#hs', d); if (a) { a.style.transform = 'rotate(' + minDeg + 'deg)'; b.style.transform = 'rotate(' + secDeg + 'deg)'; } }));
  };
  sub(h, '<h2>🎯 Seconds practice</h2>');
  exprList(h, [
    ['125 // 60'], ['125 % 60'], ['200 % 60'], ['59 // 60'], ['60 % 60'], ['3661 // 3600'], ['7384 % 3600 // 60'], ['(3 * 60 + 45) % 60']
  ]);
  quiz(h, qMC('A clock shows <code>2:05</code>. Which total seconds produced it?', '125', ['205', '65', '25'], '<div class="callout">2 minutes is 2 × 60 = 120 seconds, plus 5 leftover seconds = <b>125</b>. Check: <code>125 // 60</code> = 2 and <code>125 % 60</code> = 5.</div>'));
  quiz(h, qMC('Which line gives the <b>leftover seconds</b> for a timer?', 'leftover = total % 60', ['leftover = total // 60', 'leftover = total / 60', 'leftover = total * 60'], '<div class="callout"><b>%</b> = leftovers. <b>//</b> = complete groups (minutes).</div>'));
}

function build4(h) {
  sub(h, info('📦', 'Variables are labeled boxes', '<p>A variable holds <b>one value at a time</b>. When you assign a new value, the old one is <b>erased</b>. To trace code, track every box after every line.</p><div class="callout"><b>Golden rule:</b> in <code>x = x + 5</code> Python reads the right side first, using the <i>old</i> x, then stores the answer.</div>'));
  [
    { icon: '1️⃣', title: 'Update a variable', code: 'x = 10\nx = x + 5\nprint(x)', ask: 'What does this print?', wrong: ['10', '5', '15|10'], why: 'x = x + 5 reads the old value (10), adds 5, then <b>overwrites</b> the box. The 10 is gone.' },
    { icon: '2️⃣', title: 'Copies stay copies', code: 'a = 3\nb = a\na = 7\nprint(a, b)', ask: 'What does this print?', wrong: ['7 7', '3 3', '3 7'], why: '<code>b = a</code> copies the value <b>at that moment</b>. Changing a later does not change b.' },
    { icon: '3️⃣', title: 'The swap', code: 'first = 4\nsecond = 9\ntemp = first\nfirst = second\nsecond = temp\nprint(first, second)', ask: 'What does this print?', wrong: ['4 9', '9 9', '4 4'], why: 'temp holds the old first so it is not lost. Without it both boxes would end up with 9.' },
    { icon: '⏱️', title: 'Clock trace', code: 'seconds = 125\nminutes = seconds // 60\nseconds = seconds % 60\nprint(minutes, seconds)', ask: 'What does this print?', wrong: ['2 125', '0 5', '125 5'], why: 'minutes is calculated <b>before</b> seconds is overwritten. Reverse the order of those two lines and the answer changes!' },
    { icon: '➕', title: 'Accumulator', code: 'total = 0\ntotal = total + 4\ntotal = total + 6\ntotal += 10\nprint(total)', ask: 'What does this print?', wrong: ['10', '14', '0'], why: '<code>total += 10</code> is shorthand for <code>total = total + 10</code>.' }
  ].forEach(L => lesson(h, L));
  sub(h, '<h2>🕵️ Detective challenges</h2>');
  quiz(h, qProg('x = 4\nx = x * 2\nx = x - 3', 'var:x', ['8', '4', '1']));
  quiz(h, qProg('a = 2\nb = 3\na = a + b\nb = a * b\nprint(b)', 'out', ['6', '9', '5']));
  quiz(h, qProg('n = 17\nq = n // 5\nr = n % 5\nprint(q, r)', 'out', ['3 3', '2 3', '3 17']));
}

function build5(h) {
  sub(h, info('💡', 'Booleans: only two possible values', '<p><code>True</code> and <code>False</code> (capital first letter!). Comparisons like <code>age &gt;= 16</code> produce them.</p>' +
    '<div class="grid g3"><div class="callout good"><b>and</b><br>Both sides must be True. <i>"I need my ticket <b>and</b> my ID."</i></div><div class="callout"><b>or</b><br>At least one side True. <i>"Pizza <b>or</b> tacos works."</i></div><div class="callout bad"><b>not</b><br>Flips the value. <i>not True is False.</i></div></div>'));
  const d = sub(h, '<div class="card" style="--mc:var(--lime)"><h3>🎛️ Switch simulator</h3><p class="muted">Flip the switches, <b>predict</b> whether the bulb lights, then reveal.</p><div class="seg" id="ops"><button data-o="and" class="on">and</button><button data-o="or">or</button><button data-o="not">not</button></div>' +
    '<div class="switches" id="sws"></div><div class="row"><button class="btn" data-p="1">💡 I predict ON</button><button class="btn ghost" data-p="0">⚫ I predict OFF</button></div><div class="row" style="margin-top:10px"><div class="bulb" id="bulb">💡</div><div id="swtxt" class="muted">Make a prediction to reveal the bulb.</div></div></div>');
  const S = { op: 'and', A: false, B: false, shown: false };
  function drawSw() {
    $('#sws', d).innerHTML = '<div class="sw"><button class="tog ' + (S.A ? 'on' : '') + '" data-s="A" aria-label="Switch A"></button>A = ' + (S.A ? 'True' : 'False') + '</div>' +
      (S.op !== 'not' ? '<div class="sw"><button class="tog ' + (S.B ? 'on' : '') + '" data-s="B" aria-label="Switch B"></button>B = ' + (S.B ? 'True' : 'False') + '</div>' : '') +
      '<code style="font-size:1.3rem">' + (S.op === 'not' ? 'not A' : 'A ' + S.op + ' B') + '</code>';
    $$('.tog', d).forEach(t => t.onclick = () => { S[t.dataset.s] = !S[t.dataset.s]; S.shown = false; $('#bulb', d).classList.remove('on'); $('#swtxt', d).textContent = 'Switches changed. Predict again!'; drawSw(); });
  }
  const val = () => fullEval(S.op === 'not' ? 'not A' : 'A ' + S.op + ' B', { A: mk.bool(S.A), B: mk.bool(S.B) });
  $$('#ops button', d).forEach(b => b.onclick = () => { S.op = b.dataset.o; S.shown = false; $$('#ops button', d).forEach(x => x.classList.toggle('on', x === b)); $('#bulb', d).classList.remove('on'); $('#swtxt', d).textContent = 'Predict first!'; drawSw(); });
  $$('[data-p]', d).forEach(b => b.onclick = () => {
    const r = val().v, ok = (b.dataset.p === '1') === r;
    $('#bulb', d).classList.toggle('on', r);
    const expl = S.op === 'not' ? 'not ' + fmt(mk.bool(S.A)) + ' is ' + fmt(mk.bool(r)) : fmt(mk.bool(S.A)) + ' ' + S.op + ' ' + fmt(mk.bool(S.B)) + ' is ' + fmt(mk.bool(r));
    $('#swtxt', d).innerHTML = (ok ? '✔ Correct! ' : '✘ Not this time. ') + '<code>' + expl + '</code>';
  });
  drawSw();

  const t = sub(h, '<div class="card" style="--mc:var(--lime)"><h3>📋 Truth table explorer</h3><p class="muted">Pick an expression. Click switches to <b>test</b> a row, and the table fills in. Can you guess each result first?</p><select id="texp" class="in" style="width:auto;max-width:100%"></select><div class="switches" id="tsw"></div><div id="ttab"></div><div id="tstep"></div><div class="row"><button class="btn ghost" id="trev">Reveal everything</button></div></div>');
  const EXPS = ['A and B', 'A or B', 'not A', 'A and not B', 'not (A and B)', 'not A or B', 'A or B and C', '(A or B) and C'];
  $('#texp', t).innerHTML = EXPS.map(e => '<option>' + esc(e) + '</option>').join('');
  let T = null;
  function setup() {
    const e = $('#texp', t).value, vars = ['A', 'B', 'C'].filter(v => new RegExp('\\b' + v + '\\b').test(e));
    T = { e, vars, cur: Object.fromEntries(vars.map(v => [v, false])), seen: new Set(), all: false };
    drawT(false);
  }
  const rows = () => { const r = []; for (let i = 0; i < (1 << T.vars.length); i++) r.push(Object.fromEntries(T.vars.map((v, k) => [v, !!(i >> (T.vars.length - 1 - k) & 1)]))); return r; };
  const envOf = o => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, mk.bool(v)]));
  function drawT(test) {
    const R = rows(), idx = R.findIndex(r => T.vars.every(v => r[v] === T.cur[v]));
    if (test) T.seen.add(idx);
    $('#tsw', t).innerHTML = T.vars.map(v => '<div class="sw"><button class="tog ' + (T.cur[v] ? 'on' : '') + '" data-v="' + v + '" aria-label="Switch ' + v + '"></button>' + v + '</div>').join('') + '<code style="font-size:1.2rem">' + esc(T.e) + '</code>';
    $$('.tog', t).forEach(b => b.onclick = () => { T.cur[b.dataset.v] = !T.cur[b.dataset.v]; drawT(true); });
    $('#ttab', t).innerHTML = '<table class="truth"><tr>' + T.vars.map(v => '<th>' + v + '</th>').join('') + '<th>' + esc(T.e) + '</th></tr>' + R.map((r, i) => {
      const res = fullEval(T.e, envOf(r)).v, shown = T.all || T.seen.has(i);
      return '<tr class="' + (i === idx ? 'cur' : '') + '">' + T.vars.map(v => '<td class="' + (r[v] ? 'T' : 'F') + '">' + (r[v] ? 'True' : 'False') + '</td>').join('') + '<td class="' + (shown ? (res ? 'T' : 'F') : 'q') + '">' + (shown ? (res ? 'True' : 'False') : '?') + '</td></tr>';
    }).join('') + '</table><div class="muted">Rows discovered: ' + (T.all ? R.length : T.seen.size) + ' / ' + R.length + '</div>';
    if (test) { const st = stepsOf(T.e, envOf(T.cur)); $('#tstep', t).innerHTML = '<div class="steps">' + st.steps.map((s, j) => stepCard(s, j, { noReason: true })).join('') + '<div class="final">' + esc(T.e) + ' = ' + fmt(st.result) + '</div></div>'; }
    else $('#tstep', t).innerHTML = '';
  }
  $('#texp', t).onchange = setup;
  $('#trev', t).onclick = () => { T.all = true; drawT(false); };
  setup();

  sub(h, '<h2>🎯 Boolean predictions</h2>');
  exprList(h, [
    ['running and elapsed_seconds % 60 == 0', 'running = True; elapsed_seconds = 120'],
    ['running and elapsed_seconds % 60 == 0', 'running = False; elapsed_seconds = 120'],
    ['not (x > 5) or y == 3', 'x = 8; y = 3'],
    ['a and b or not a', 'a = False; b = True'],
    ['age >= 13 and age < 20 or has_pass', 'age = 25; has_pass = False'],
    ['not (a or b)', 'a = False; b = False']
  ]);
}

function build6(h) {
  sub(h, info('🔀', 'Code that makes decisions', '<p>An <code>if</code> asks a True/False question. <b>Only if the answer is True</b> does the <i>indented</i> block run. Indentation = "belongs to the if".</p>'));
  [
    { icon: '🚗', title: 'Your first decision', code: 'age = 18\nif age >= 16:\n    print("Can Drive")', ask: 'What happens when this runs?', wrong: ['', 'age', 'False'], flow: true, why: '18 >= 16 is True, so Python enters the indented block and prints. Change age to 15 and the condition is False, so the block is skipped.' },
    { icon: '↔️', title: 'if / else', code: 'score = 72\nif score >= 90:\n    print("A")\nelse:\n    print("Not an A")', ask: 'What is printed?', wrong: ['A', 'A|Not an A', ''], flow: true, why: 'else runs only when the if condition is False. Exactly one of the two blocks runs.' },
    { icon: '🪜', title: 'if / elif / else chain', code: 'temp = 68\nif temp >= 80:\n    print("Hot")\nelif temp >= 60:\n    print("Nice")\nelse:\n    print("Cold")', ask: 'What is printed?', wrong: ['Hot', 'Cold', 'Hot|Nice'], flow: true, why: 'Python checks top to bottom and stops at the <b>first True</b> condition. The rest are never checked.' },
    { icon: '➗', title: 'Even or odd with %', code: 'n = 14\nif n % 2 == 0:\n    print("Even")\nelse:\n    print("Odd")', ask: 'What is printed?', wrong: ['Odd', 'Even|Odd', '7'], flow: true, why: '<code>14 % 2</code> is 0 (no leftover), and 0 == 0 is True. Evens have a remainder of 0 when divided by 2.' },
    { icon: '🔗', title: 'Combining conditions', code: 'age = 15\nhas_permit = True\nif age >= 16 and has_permit:\n    print("Drive")\nelse:\n    print("Walk")', ask: 'What is printed?', wrong: ['Drive', 'Drive|Walk', ''], flow: true, why: '<code>and</code> needs both sides True. 15 >= 16 is False, so the whole condition is False.' },
    { icon: '⏱️', title: 'Clock decision', code: 'seconds = 45\nminutes = seconds // 60\nif minutes == 0:\n    print("Under a minute")\nelse:\n    print(minutes, "min")', ask: 'What is printed?', wrong: ['0 min', '45 min', 'Under a minute|0 min'], flow: true, why: '45 // 60 is 0 complete groups, so minutes == 0 is True.' }
  ].forEach(L => lesson(h, L));
  sub(h, '<h2>🎯 More practice</h2>');
  quiz(h, qProg('x = 10\nif x > 5:\n    print("big")\nif x > 8:\n    print("huge")', 'out', ['big', 'huge', '']));
  quiz(h, qProg('x = 10\nif x > 5:\n    print("big")\nelif x > 8:\n    print("huge")', 'out', ['big|huge', 'huge', '']));
}

function build7(h) {
  sub(h, info('🔁', 'Loops repeat blocks', '<p><code>for i in range(5)</code> repeats the indented block with <b>i = 0, 1, 2, 3, 4</b>. It counts from 0 and <b>stops before</b> 5. Use <b>Next Iteration</b> to jump from one pass to the next.</p><div class="callout"><code>range(stop)</code> · <code>range(start, stop)</code> · <code>range(start, stop, step)</code>. The stop value is never included.</div>'));
  [
    { icon: '5️⃣', title: 'The first loop', code: 'for i in range(5):\n    print(i)', ask: 'What is printed?', wrong: ['1|2|3|4|5', '0|1|2|3|4|5', '5'], flow: true, iter: true, why: 'range(5) produces 0, 1, 2, 3, 4. Five numbers, starting at 0.' },
    { icon: '🦘', title: 'Start, stop, step', code: 'for i in range(2, 10, 2):\n    print(i)', ask: 'What is printed?', wrong: ['2|4|6|8|10', '4|6|8|10', '2|3|4|5'], flow: true, iter: true, why: 'Start at 2, jump by 2, stop before 10.' },
    { icon: '➕', title: 'Loop + accumulator', code: 'total = 0\nfor i in range(1, 4):\n    total = total + i\n    print(total)', ask: 'What is printed?', wrong: ['1|2|3', '1|3|6|10', '6'], flow: true, iter: true, why: 'Each pass adds the current i to total. total remembers its value between passes.' },
    { icon: '⏳', title: 'While loop countdown', code: 'count = 3\nwhile count > 0:\n    print(count)\n    count = count - 1\nprint("Liftoff")', ask: 'What is printed?', wrong: ['3|2|1|0|Liftoff', '2|1|Liftoff', '3|2|1'], flow: true, iter: true, why: 'while checks its condition before <b>every</b> pass. When count becomes 0, 0 > 0 is False and the loop ends.' },
    { icon: '🔎', title: 'Loop + if + %', code: 'for i in range(1, 7):\n    if i % 3 == 0:\n        print(i)', ask: 'What is printed?', wrong: ['0|3|6', '3', '1|2|3|4|5|6'], flow: true, iter: true, why: 'The if runs inside every pass. Only 3 and 6 have a remainder of 0 when divided by 3.' },
    { icon: '⏱️', title: 'Clock ticking', code: 'seconds = 50\nwhile seconds < 130:\n    seconds = seconds + 35\n    print(seconds // 60, seconds % 60)', ask: 'What is printed?', wrong: ['1 25|2 0', '1 25|2 0|2 35|3 10', '1 35|2 10|2 45'], flow: true, iter: true, why: 'The condition is checked <i>before</i> each pass. 120 &lt; 130 is still True, so one more pass runs and gives 155.' }
  ].forEach(L => lesson(h, L));
  sub(h, '<h2>🎯 Loop practice</h2>');
  quiz(h, qProg('for i in range(3, 8):\n    print(i)', 'count', ['4', '6', '8']));
  quiz(h, qProg('total = 0\nfor i in range(4):\n    total = total + 2\n', 'var:total', ['6', '10', '4']));
}

const BUGS = [
  { type: 'Indentation', code: 'score = 85\nif score >= 70:\nprint("Pass")', bug: [3], why: 'The <code>print</code> must be <b>indented</b> to belong to the if. Python raises an IndentationError.', fix: 'score = 85\nif score >= 70:\n    print("Pass")' },
  { type: 'Indentation', code: 'for i in range(3):\n    print(i)\n    print("Done")', bug: [3], why: 'The program should say "Done" once, but line 3 is indented, so it repeats on every pass. Move it back to the left edge.', fix: 'for i in range(3):\n    print(i)\nprint("Done")' },
  { type: 'Logic error', code: 'age = 16\nif age > 16:\n    print("Can Drive")', bug: [2], why: 'A 16-year-old <i>can</i> drive, but <code>16 &gt; 16</code> is False. Use <code>&gt;=</code>.', fix: 'age = 16\nif age >= 16:\n    print("Can Drive")' },
  { type: 'Logic error', code: 'temp = 75\nif temp < 60 and temp > 90:\n    print("Extreme temperature")', bug: [2], why: 'No number is both below 60 <i>and</i> above 90. The condition can never be True. It should be <code>or</code>.', fix: 'temp = 75\nif temp < 60 or temp > 90:\n    print("Extreme temperature")' },
  { type: 'Logic error', code: 'total = 0\nfor i in range(1, 5):\n    total = total + i\nprint(total)', bug: [2], why: 'The goal was to add 1 through 5, but <code>range(1, 5)</code> stops before 5. Use <code>range(1, 6)</code>.', fix: 'total = 0\nfor i in range(1, 6):\n    total = total + i\nprint(total)' },
  { type: 'Variable error', code: 'seconds = 125\nminutes = seconds // 60\nprint(minute)', bug: [3], why: '<code>minute</code> is misspelled. Only <code>minutes</code> exists, so Python reports a NameError.', fix: 'seconds = 125\nminutes = seconds // 60\nprint(minutes)' },
  { type: 'Variable error', code: 'seconds = 125\nseconds = seconds % 60\nminutes = seconds // 60\nprint(minutes, seconds)', bug: [2], why: 'Line 2 overwrites seconds (125 becomes 5) <b>before</b> minutes is calculated, so minutes comes out 0. Calculate minutes first.', fix: 'seconds = 125\nminutes = seconds // 60\nseconds = seconds % 60\nprint(minutes, seconds)' },
  { type: 'Operator mistake', code: 'seconds = 125\nminutes = seconds / 60\nprint(minutes)', bug: [2], why: '<code>/</code> gives a decimal. For complete minutes, use floor division <code>//</code>.', fix: 'seconds = 125\nminutes = seconds // 60\nprint(minutes)' },
  { type: 'Operator mistake', code: 'x = 10\nif x = 10:\n    print("ten")', bug: [2], why: '<code>=</code> stores a value. To <i>compare</i>, use <code>==</code>.', fix: 'x = 10\nif x == 10:\n    print("ten")' },
  { type: 'Operator mistake', code: 'seconds = 200\nminutes = seconds % 60\nremaining = seconds // 60\nprint(minutes, remaining)', bug: [2, 3], why: 'The operators are swapped. <code>//</code> gives complete minutes and <code>%</code> gives leftover seconds.', fix: 'seconds = 200\nminutes = seconds // 60\nremaining = seconds % 60\nprint(minutes, remaining)' }
];
function build8(h) {
  sub(h, info('🩺', 'How to debug', '<p>1) <b>Read</b> what the program is supposed to do. 2) <b>Trace</b> it. 3) <b>Find the first line</b> where reality differs from the plan. Click the line you think contains the bug.</p>'));
  BUGS.forEach((b, n) => {
    const id = ctx.id(); ctx.reg(id);
    const lines = b.code.split('\n');
    const el = sub(h, '<div class="card dbg"><div class="q-top"><span class="q-tag">Find the bug</span></div><div class="phases"><span class="ph on">1 Predict</span><span class="ph">2 Explain</span><span class="ph">3 Visualize</span><span class="ph">4 Verify</span></div><div class="q-prompt">Bug case ' + (n + 1) + ': <b>click the line that contains the mistake.</b></div><div class="tr-code">' +
      lines.map((l, k) => '<div class="cl" data-k="' + (k + 1) + '"><span class="ln">' + (k + 1) + '</span><code>' + (esc(l) || ' ') + '</code></div>').join('') + '</div><div class="feedback"></div><div class="solution"></div></div>');
    let first = true, solved = false;
    $$('.cl', el).forEach(c => c.onclick = () => {
      if (solved) return;
      const k = +c.dataset.k, ok = b.bug.includes(k);
      if (first) { Store.record(id, ok); first = false; }
      if (!ok) { c.classList.add('miss'); setTimeout(() => c.classList.remove('miss'), 500); $('.feedback', el).innerHTML = '<span style="color:var(--amber)">Line ' + k + ' looks fine. Trace the code again and try another line.</span>'; return; }
      solved = true;
      b.bug.forEach(x => $$('.cl', el)[x - 1].classList.add('bug'));
      $$('.cl', el).forEach(x => x.classList.add('locked'));
      $('.feedback', el).innerHTML = '<span style="color:var(--lime)">✔ Found it!</span> <span class="tag">' + b.type + '</span>';
      const rt = runProgram(b.code);
      const outTxt = rt.error ? '<b>' + esc(rt.error.pyType) + ':</b> ' + esc(rt.error.message) : (rt.out.length ? rt.out.map(esc).join('<br>') : '(nothing prints)');
      const sol = $('.solution', el);
      sol.innerHTML = '<div class="callout bad"><b>What the buggy code does:</b><br><code style="display:inline-block;margin-top:4px">' + outTxt + '</code></div><div class="callout"><b>Why:</b> ' + b.why + '</div><div class="callout good"><b>Fixed version:</b><pre class="code">' + esc(b.fix) + '</pre></div>';
      sol.classList.add('show');
      $$('.ph', el).forEach((p, i) => setTimeout(() => p.classList.add('on'), i * 250));
    });
  });
}

function build9(h) {
  const sections = [];
  let sec = null;
  const S = { done: 0, ok: 0, total: 0, by: {} };
  const add = (name, q) => {
    q.tag = name; const prev = q.onAnswer;
    q.onAnswer = ok => { S.done++; if (ok) S.ok++; S.by[name] = S.by[name] || [0, 0]; S.by[name][1]++; if (ok) S.by[name][0]++; if (prev) prev(ok); upd(); };
    sections.push([name, q]); S.total++;
  };
  const A = '// and % mastery', B = 'Order of operations', C = 'Boolean logic', D = 'Control structures: if', E = 'Control structures: loops', F = 'Variable tracing', G = 'Concepts';
  [['47 // 8'], ['47 % 8'], ['47 // 8 + 47 % 8 * 2'], ['250 % 60 // 10'], ['3725 // 3600']].forEach(e => add(A, qExpr(e[0])));
  add(A, qProg('seconds = 3725\nhours = seconds // 3600\nminutes = (seconds % 3600) // 60\nsecs = seconds % 60\nprint(hours, minutes, secs)', 'out', ['1 62 5', '62 2 5', '1 2 25']));
  [['2 + 6 * 3 ** 2 // 9'], ['(2 + 6) * 3 ** 2'], ['100 - 20 % 6 * 5'], ['18 // 4 * 4 + 18 % 4']].forEach(e => add(B, qExpr(e[0])));
  add(C, qExpr('running and elapsed_seconds % 60 == 0', 'running = True; elapsed_seconds = 120'));
  add(C, qExpr('not (x > 5) or y == 3', 'x = 8; y = 3'));
  add(C, qExpr('a and b or not a', 'a = False; b = True'));
  add(C, qExpr('age >= 13 and age < 20 or has_pass', 'age = 25; has_pass = False'));
  add(D, qProg('score = 83\nif score >= 90:\n    print("A")\nelif score >= 80:\n    print("B")\nelse:\n    print("C")', 'out', ['A', 'C', 'A|B']));
  add(D, qProg('n = 15\nif n % 3 == 0:\n    print("Fizz")\nif n % 5 == 0:\n    print("Buzz")', 'out', ['Fizz', 'Buzz', 'FizzBuzz']));
  add(D, qProg('seconds = 59\nminutes = seconds // 60\nif minutes == 0:\n    print("Less than a minute")\nelse:\n    print(minutes)', 'out', ['0', '59', '']));
  add(E, qProg('for i in range(2, 10, 2):\n    print(i)', 'count', ['3', '5', '8']));
  add(E, qProg('total = 0\nfor i in range(1, 5):\n    total = total + i\nprint(total)', 'out', ['15', '6', '4']));
  add(E, qProg('n = 0\nwhile n < 10:\n    n = n + 3\nprint(n)', 'out', ['9', '10', '3']));
  add(F, qProg('a = 6\nb = 4\na = a // b\nb = a + b % 3\nprint(a, b)', 'out', ['1 4', '6 2', '2 1']));
  add(F, qProg('x = 5\ny = x\nx = x * 2\ny = y + x\nprint(x, y)', 'out', ['10 10', '5 15', '10 5']));
  add(G, qMC('What does <code>%</code> calculate?', 'The remainder after division', ['The number of complete groups', 'The result rounded up', 'The value raised to a power'], '<div class="callout"><code>%</code> gives leftovers; <code>//</code> gives complete groups.</div>'));
  add(G, qMC('What is wrong with <code>if x = 5:</code>?', '= stores a value; comparing needs ==', ['Nothing is wrong', 'x must be a string', 'The colon should be removed'], '<div class="callout"><code>=</code> is assignment, <code>==</code> is comparison.</div>'));
  add(G, qMC('A program stores <code>total_seconds</code>. Which expression gives the <b>leftover seconds</b> after whole minutes are removed?', 'total_seconds % 60', ['total_seconds // 60', 'total_seconds / 60', 'total_seconds * 60'], '<div class="callout">Leftovers always come from <code>%</code>.</div>'));

  sub(h, '<div class="sticky-score card" id="score"></div>');
  sub(h, '<div class="callout">📝 <b>' + S.total + ' questions.</b> Predict each answer before you click, then study the steps that appear. Aim for 90% and earn the <b>Sharp Mind</b> badge.</div>');
  let last = null;
  sections.forEach(([name, q]) => {
    if (name !== last) { sub(h, '<h3 class="sec">' + name + '</h3>'); last = name; }
    quiz(h, q);
  });
  const res = sub(h, '<div id="result"></div>');
  function upd() {
    $('#score', h).innerHTML = '<b>📊 Score:</b> ' + S.ok + ' / ' + S.done + ' <span class="muted">(' + S.done + ' of ' + S.total + ' answered)</span><div class="bar" style="flex:1;--mc:var(--gold)"><i style="width:' + S.done / S.total * 100 + '%"></i></div>';
    if (S.done === S.total) {
      const pct = Math.round(S.ok / S.total * 100);
      if (pct >= 90) Store.badge('sharp');
      const weak = Object.entries(S.by).filter(([, v]) => v[0] < v[1]).map(([k, v]) => '<li>' + k + ': ' + v[0] + '/' + v[1] + '</li>').join('');
      const msg = pct >= 90 ? 'Outstanding! You think like Python.' : pct >= 70 ? 'Solid work! Review the steps for the ones you missed.' : 'Good start! Revisit Modules 1 to 3 and the Thinking Machine, then retake.';
      $('#result', h).innerHTML = '<div class="card result"><h2>🏆 Assessment complete</h2><div class="score">' + pct + '%</div><p>' + msg + '</p>' + (weak ? '<p class="muted">Sections to review:</p><ul style="display:inline-block;text-align:left">' + weak + '</ul>' : '<p>Perfect in every section!</p>') + '<div class="row" style="justify-content:center"><button class="btn" id="retake">🔄 Retake</button><button class="btn ghost" onclick="openMachine()">⚙️ Thinking Machine</button></div></div>';
      $('#retake', h).onclick = () => route();
      $('#result', h).scrollIntoView({ behavior: 'smooth' });
    }
  }
  upd();
}

/* =====================================================================
   Part 6: shell, navigation, home
   ===================================================================== */
const MODULES = [
  { id: 'm1', n: 1, icon: '🧠', title: 'Think Like Python', tag: 'Computers follow rules. Predict, then watch the rules run.', color: '#22d3ee', build: build1 },
  { id: 'm2', n: 2, icon: '🪜', title: 'Order of Operations', tag: 'The ladder Python climbs on every expression.', color: '#a78bfa', build: build2 },
  { id: 'm3', n: 3, icon: '⏱️', title: 'Clock Timer Bootcamp', tag: '// means complete groups. % means leftovers.', color: '#fbbf24', build: build3 },
  { id: 'm4', n: 4, icon: '🕵️', title: 'Variable Detective', tag: 'Trace what lives in each memory box.', color: '#f472b6', build: build4 },
  { id: 'm5', n: 5, icon: '💡', title: 'True or False Academy', tag: 'and, or, not, switches and truth tables.', color: '#a3e635', build: build5 },
  { id: 'm6', n: 6, icon: '🔀', title: 'Conditional Challenge', tag: 'if, elif, else, and the flow charts behind them.', color: '#fb923c', build: build6 },
  { id: 'm7', n: 7, icon: '🔁', title: 'Loop Lab', tag: 'Step through every iteration.', color: '#38bdf8', build: build7 },
  { id: 'm8', n: 8, icon: '🩺', title: 'Debugging Clinic', tag: 'Find the bug before it finds you.', color: '#f87171', build: build8 },
  { id: 'm9', n: 9, icon: '🏆', title: 'Assessment Bootcamp', tag: 'A full practice test with step-by-step solutions.', color: '#facc15', build: build9 }
];

function buildNav() {
  $('#nav').innerHTML = '<a href="#home" data-r="home"><span class="ni">🏕️</span><span class="nt">Camp Base</span></a>' +
    '<a href="#machine" data-r="machine" style="--mc:var(--pink)"><span class="ni">⚙️</span><span class="nt"><b>Python Thinking Machine</b></span></a><div class="sep">Modules</div>' +
    MODULES.map(m => '<a href="#' + m.id + '" data-r="' + m.id + '" data-mod="' + m.id + '" style="--mc:' + m.color + '"><span class="ni">' + m.icon + '</span><span class="nt">' + m.n + '. ' + m.title + '</span><span class="mini"></span><span class="check">✔</span></a>').join('');
}

function buildHome(h) {
  const r = rankOf(Store.d.xp);
  const first = MODULES.find(m => { const p = progressOf(m); return p.done < p.total; }) || MODULES[0];
  sub(h, '<div class="hero home"><span class="big">🐍</span><h1>AP CSP Python Survival Camp</h1><p>Predict. Explain. Visualize. Verify. Learn to see exactly how Python evaluates your code, and walk into your Control Structures assessment with confidence.</p>' +
    '<div class="cycle"><span>1 Predict</span><span>2 Explain</span><span>3 Visualize</span><span>4 Verify</span></div>' +
    '<div class="row" style="margin-top:16px"><a class="btn" href="#' + first.id + '">🚀 ' + (Store.d.xp ? 'Continue mission' : 'Start mission') + '</a><a class="btn ghost" href="#machine">⚙️ Open the Thinking Machine</a></div></div>');
  sub(h, '<div class="card"><h3>' + r.cur.icon + ' Rank: ' + r.cur.name + '</h3><div class="row">' + RANKS.map((k, i) => '<span class="chip ' + (i <= r.i ? 'on' : '') + '">' + k.icon + ' ' + k.name + '</span>').join('') + '</div><p class="muted">' + Store.d.xp + ' XP. Correct predictions earn 10 XP, attempts earn 2.</p></div>');
  sub(h, '<a href="#machine" class="card mcard" style="--mc:var(--pink)"><span class="mi">⚙️</span><h3>Python Thinking Machine</h3><p>Type any expression such as <code>47 // 8 + 47 % 8 * 2</code> and watch Python evaluate it one operation at a time, with the reason for each step.</p></a>');
  sub(h, '<div class="grid g3">' + MODULES.map(m => { const p = progressOf(m); return '<a class="card mcard" href="#' + m.id + '" style="--mc:' + m.color + '"><span class="mi">' + m.icon + '</span><h3>' + m.n + '. ' + m.title + '</h3><p>' + m.tag + '</p><div class="bar"><i style="width:' + (p.total ? p.done / p.total * 100 : 0) + '%"></i></div><div class="stat">' + p.done + ' / ' + p.total + ' activities</div></a>'; }).join('') + '</div>');
  sub(h, '<div class="card"><h3>🎖️ Badges</h3><div class="badges">' + Object.entries(BADGES).map(([k, b]) => '<div class="badge ' + (Store.d.badges.includes(k) ? 'on' : '') + '"><b>' + b[1] + '</b>' + b[0] + '</div>').join('') + '</div></div>');
  const rb = sub(h, '<div class="row"><button class="btn ghost" id="resetp">Reset my progress</button></div>');
  $('#resetp', rb).onclick = () => { if (confirm('Erase all XP, badges and progress?')) { Store.reset(); route(); refreshChrome(); } };
}

function route() {
  const id = location.hash.slice(1) || 'home', main = $('#main');
  const m = MODULES.find(x => x.id === id);
  main.style.animation = 'none'; void main.offsetWidth; main.style.animation = '';
  main.innerHTML = ''; ctx.mod = m ? m.id : id; ctx.n = 0;
  main.style.setProperty('--mc', m ? m.color : 'var(--cyan)');
  if (m) {
    sub(main, '<div class="hero" style="--mc:' + m.color + '"><span class="big">' + m.icon + '</span><div class="muted">MODULE ' + m.n + ' OF 9</div><h1>' + m.title + '</h1><p>' + m.tag + '</p><div class="cycle"><span>1 Predict</span><span>2 Explain</span><span>3 Visualize</span><span>4 Verify</span></div></div>');
    const body = document.createElement('div'); main.append(body);
    m.build(body);
    const prev = MODULES[m.n - 2], next = MODULES[m.n];
    sub(main, '<div class="pager">' + (prev ? '<a class="btn ghost" href="#' + prev.id + '">← ' + prev.title + '</a>' : '<a class="btn ghost" href="#home">← Camp Base</a>') + (next ? '<a class="btn" href="#' + next.id + '">' + next.title + ' →</a>' : '<a class="btn" href="#home">🏕️ Back to Camp Base</a>') + '</div>');
  } else if (id === 'machine') {
    ctx.mod = 'machine';
    sub(main, '<div class="hero" style="--mc:var(--pink)"><span class="big">⚙️</span><h1>Python Thinking Machine</h1><p>Enter an expression. The machine shows what Python does next, <b>why</b> it goes in that order, and highlights each operation as it runs.</p></div>');
    const body = document.createElement('div'); main.append(body); buildMachine(body);
  } else { ctx.mod = 'home'; buildHome(main); }
  $$('#nav a').forEach(a => a.classList.toggle('active', a.dataset.r === (m || id === 'machine' ? id : 'home')));
  $('#nav').classList.remove('open');
  window.scrollTo(0, 0);
  refreshChrome();
}

function init() {
  Store.load();
  MODULES.forEach(m => { ctx.mod = m.id; ctx.n = 0; m.build(document.createElement('div')); });
  buildNav();
  $('#menuBtn').onclick = () => $('#nav').classList.toggle('open');
  window.addEventListener('hashchange', route);
  route();
}
if (typeof document !== 'undefined') init();
