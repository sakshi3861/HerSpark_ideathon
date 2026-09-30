import React, { useState } from 'react';

// The harmless vault for FinSafe: a working scientific calculator with no link to the real data.
const FUNCS = { sin: Math.sin, cos: Math.cos, tan: Math.tan, ln: Math.log, log: Math.log10, '√': Math.sqrt };

function evaluate(src, deg) {
  const s = src.replace(/\s/g, '');
  let i = 0;
  const open = (s.match(/\(/g) || []).length - (s.match(/\)/g) || []).length;
  const text = s + ')'.repeat(Math.max(0, open));
  const peek = () => text[i];
  const fail = () => { throw new Error('bad'); };

  const number = () => {
    const m = /^(\d+\.?\d*|\.\d+)/.exec(text.slice(i));
    if (!m) fail();
    i += m[0].length; return parseFloat(m[0]);
  };
  const primary = () => {
    const c = peek();
    if (c === '(') { i++; const v = expr(); if (peek() !== ')') fail(); i++; return v; }
    if (c === 'π') { i++; return Math.PI; }
    if (c === 'e') { i++; return Math.E; }
    for (const name of Object.keys(FUNCS)) {
      if (text.startsWith(name + '(', i)) {
        i += name.length + 1;
        const v = expr(); if (peek() !== ')') fail(); i++;
        const rad = ['sin', 'cos', 'tan'].includes(name) && deg ? v * Math.PI / 180 : v;
        return FUNCS[name](rad);
      }
    }
    return number();
  };
  const factorial = n => { if (n < 0 || n !== Math.floor(n) || n > 170) fail(); let r = 1; for (let k = 2; k <= n; k++) r *= k; return r; };
  const postfix = () => {
    let v = primary();
    for (;;) {
      if (peek() === '!') { i++; v = factorial(v); } else if (peek() === '%') { i++; v /= 100; } else return v;
    }
  };
  const unary = () => { if (peek() === '−') { i++; return -unary(); } return postfix(); };
  const power = () => { const b = unary(); if (peek() === '^') { i++; return b ** power(); } return b; };
  const term = () => {
    let v = power();
    for (;;) {
      const c = peek();
      if (c === '×' || c === '÷') { i++; const r = power(); v = c === '×' ? v * r : v / r; }
      else if (c && /[πe(√sincolatg]/.test(c)) v *= power();
      else break;
    }
    return v;
  };
  function expr() {
    let v = term();
    while (peek() === '+' || peek() === '−') { const op = text[i++]; const r = term(); v = op === '+' ? v + r : v - r; }
    return v;
  }
  const v = expr();
  if (i < text.length) fail();
  if (!Number.isFinite(v)) fail();
  return v;
}

const keys = [
  ['Deg', 'sin(', 'cos(', 'tan(', 'back'],
  ['^2', 'ln(', 'log(', '√(', 'AC'],
  ['(', ')', '^', '!', '÷'],
  ['7', '8', '9', '%', '×'],
  ['4', '5', '6', 'π', '−'],
  ['1', '2', '3', 'e', '+'],
];

export default function DecoyCalculator({ onLock }) {
  const [expr, setExpr] = useState('');
  const [result, setResult] = useState('');
  const [deg, setDeg] = useState(true);

  const add = t => { if (result && /^[\d.πe(]|^[a-z√]/.test(t) && !/^[+−×÷^!%]/.test(t)) { setExpr(t); setResult(''); return; } setExpr(cur => cur + t); setResult(''); };
  const equals = () => {
    if (!expr) return;
    try {
      const v = evaluate(expr, deg);
      const raw = String(parseFloat(v.toPrecision(12)));
      const shown = raw.includes('e') ? raw.replace(/e\+?(-?\d+)/, '×10^($1)') : raw;
      setResult(shown); setExpr(shown);
    } catch { setResult('Error'); setExpr(''); }
  };
  const press = k => {
    if (k === 'AC') { setExpr(''); setResult(''); return; }
    if (k === 'back') { setExpr(cur => cur.replace(/(sin\(|cos\(|tan\(|ln\(|log\(|√\(|.)$/, '')); return; }
    if (k === 'Deg') { setDeg(d => !d); return; }
    add(k);
  };

  const label = k => (k === 'Deg' ? (deg ? 'Deg' : 'Rad') : k === 'back' ? '⌫' : k === '^2' ? 'x²' : k.length > 1 ? k.replace('(', '') : k);
  const tone = k => (/^[\d.]$/.test(k) ? 'bg-white text-slate-800' : /^[÷×−+]$/.test(k) ? 'bg-slate-200 text-slate-800' : k === 'AC' ? 'bg-slate-600 text-white' : 'bg-slate-100 text-slate-700');

  return (
    <div className="h-screen w-screen overflow-y-auto p-5 md:p-8 text-slate-800 bg-slate-50" style={{ colorScheme: 'light' }}>
      <div className="max-w-sm mx-auto flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-3xl text-slate-600">calculate</span>
            <h1 className="text-2xl font-bold">Calculator</h1>
          </div>
          <button type="button" onClick={onLock} aria-label="Lock" className="w-10 h-10 rounded-xl border border-slate-300 bg-white flex items-center justify-center hover:bg-slate-100">
            <span className="material-symbols-outlined text-[20px] text-slate-600">lock</span>
          </button>
        </div>

        <div className="bg-slate-800 text-white rounded-2xl p-4 min-h-[88px] flex flex-col items-end justify-end break-all">
          <div className="text-3xl font-semibold text-right">{result === 'Error' ? 'Error' : expr || '0'}</div>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {keys.flat().map(k => (
            <button key={k} type="button" onClick={() => press(k)} className={`h-12 rounded-xl border border-slate-200 text-sm font-semibold hover:brightness-95 ${tone(k)}`}>{label(k)}</button>
          ))}
          <button type="button" onClick={() => press('0')} className="h-12 rounded-xl border border-slate-200 text-sm font-semibold bg-white hover:brightness-95">0</button>
          <button type="button" onClick={() => press('.')} className="h-12 rounded-xl border border-slate-200 text-sm font-semibold bg-white hover:brightness-95">.</button>
          <button type="button" onClick={equals} className="h-12 col-span-3 rounded-xl text-white font-semibold bg-slate-700 hover:brightness-110">=</button>
        </div>
      </div>
    </div>
  );
}
