// slxt.org – Extras wie auf slxt.dev (05.11.2026): funkelnde Sterne, Polarlicht, Sterne folgen leicht der Maus,
// Hell/Dunkel als langsames Überblenden, Inhalte der Karte erscheinen nacheinander, Licht + Welle auf den Kacheln.
// Nur transform/opacity; bei „Bewegung reduzieren“ passiert hier nichts.
(() => {
  'use strict';
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const sky = document.querySelector('.sky'), stars = document.getElementById('stars');
  const d = document.documentElement;
  d.classList.add('extras');

  // ---- Polarlicht + funkelnde Sterne ----
  const aurora = document.createElement('div'); aurora.className = 'aurora'; aurora.innerHTML = '<i></i><i></i><i></i>';
  const funkeln = document.createElement('div'); funkeln.className = 'funkeln';
  sky.prepend(aurora); stars.after(funkeln);
  const zufall = (seed) => () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const r = zufall(99);
  for (let i = 0, n = Math.min(36, Math.round(innerWidth / 38)); i < n; i++) {
    const s = document.createElement('i');
    s.style.left = (r() * 100).toFixed(2) + '%'; s.style.top = (r() * 92).toFixed(2) + '%';
    s.style.setProperty('--d', (2.4 + r() * 3.6).toFixed(2) + 's');
    s.style.setProperty('--v', (-r() * 6).toFixed(2) + 's');
    s.style.setProperty('--g', (2 + r() * 2.5).toFixed(1) + 'px');
    funkeln.append(s);
  }

  // ---- Inhalte der Karte: nacheinander auftauchen (Reihenfolge per --n) ----
  const folge = [...document.querySelectorAll('.intro > *, .card h2, .socials li, .projects li')];
  folge.forEach((el, i) => { el.classList.add('auftritt'); el.style.setProperty('--n', i); });
  requestAnimationFrame(() => requestAnimationFrame(() => d.classList.add('da')));
  setTimeout(() => folge.forEach((el) => el.classList.add('fertig')), 600 + folge.length * 45 + 800);   // Hover danach ohne Verzögerung

  const fein = matchMedia('(hover: hover) and (pointer: fine)').matches;
  // ---- Sterne + Polarlicht folgen weich der Maus (Tiefe), Licht folgt dem Zeiger auf den Kacheln ----
  if (fein) {
    const ziel = { x: 0, y: 0 }, ist = { x: 0, y: 0 }; let lauf = false;
    const frame = () => {
      ist.x += (ziel.x - ist.x) * 0.06; ist.y += (ziel.y - ist.y) * 0.06;
      stars.style.transform = `translate3d(${(ist.x * -14).toFixed(2)}px, ${(ist.y * -10).toFixed(2)}px, 0)`;
      funkeln.style.transform = `translate3d(${(ist.x * -22).toFixed(2)}px, ${(ist.y * -16).toFixed(2)}px, 0)`;
      aurora.style.translate = `${(ist.x * 30).toFixed(1)}px ${(ist.y * 20).toFixed(1)}px`;
      if (Math.abs(ziel.x - ist.x) + Math.abs(ziel.y - ist.y) > 0.001) requestAnimationFrame(frame); else lauf = false;
    };
    addEventListener('pointermove', (e) => {
      ziel.x = e.clientX / innerWidth - 0.5; ziel.y = e.clientY / innerHeight - 0.5;
      if (!lauf) { lauf = true; requestAnimationFrame(frame); }
    }, { passive: true });
    for (const a of document.querySelectorAll('.projects a, .socials a')) {
      a.addEventListener('pointermove', (e) => {
        const b = a.getBoundingClientRect();
        a.style.setProperty('--mx', e.clientX - b.left + 'px'); a.style.setProperty('--my', e.clientY - b.top + 'px');
      });
    }
  }

  // ---- Welle beim Tippen/Klicken auf Kacheln und Knöpfe ----
  document.addEventListener('pointerdown', (e) => {
    const a = e.target.closest('.projects a, .socials a'); if (!a) return;
    const b = a.getBoundingClientRect(), g = Math.hypot(b.width, b.height) * 2;
    const w = document.createElement('span'); w.className = 'welle';
    Object.assign(w.style, { width: g + 'px', height: g + 'px', left: e.clientX - b.left - g / 2 + 'px', top: e.clientY - b.top - g / 2 + 'px' });
    a.append(w);
    w.animate([{ transform: 'scale(0)', opacity: 0.28 }, { transform: 'scale(1)', opacity: 0 }], { duration: 700, easing: 'cubic-bezier(.2, .8, .2, 1)' }).onfinish = () => w.remove();
  });

  // Light/dark switch: the slow crossfade now lives in modus.js (shared by all slxt pages).
})();
