// slxt.org – Sternenhimmel, Sternschnuppen und eine Karte zum Ziehen & Werfen (Physik wie cats.slxt.org)
(() => {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (id) => document.getElementById(id);
  $('year').textContent = new Date().getFullYear();
  document.addEventListener('contextmenu', (e) => e.preventDefault());   // wie bisher

  // ---------- Sterne (einmal auf ein Canvas gemalt) ----------
  const cv = $('stars'), ctx = cv.getContext('2d');
  function sterne() {
    const dpr = Math.min(2, devicePixelRatio || 1), w = innerWidth, h = innerHeight;
    cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const n = Math.round(w * h / 5200);
    for (let i = 0; i < n; i++) {
      const r = Math.random() < 0.08 ? 1.3 : Math.random() * 0.8 + 0.3;
      ctx.globalAlpha = 0.25 + Math.random() * 0.65;
      ctx.fillStyle = Math.random() < 0.15 ? '#cdd8ff' : '#ffffff';
      ctx.beginPath(); ctx.arc(Math.random() * w, Math.random() * h * 0.92, r, 0, Math.PI * 2); ctx.fill();
    }
  }
  sterne();
  let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(sterne, 200); });

  // ---------- Sternschnuppen ----------
  const box = $('meteors');
  function meteor(x0, y0) {
    if (reduce) return;
    const W = innerWidth, H = innerHeight;
    const len = 80 + Math.random() * 150;
    const dir = x0 === undefined ? (Math.random() < 0.5 ? 1 : -1) : (x0 < W / 2 ? 1 : -1);
    const ang = (14 + Math.random() * 26) * Math.PI / 180;
    const dist = Math.max(W, H) * (0.22 + Math.random() * 0.25);
    if (x0 === undefined) { x0 = dir > 0 ? Math.random() * W * 0.65 : W * 0.35 + Math.random() * W * 0.65; y0 = Math.random() * H * 0.42; }
    const x1 = x0 + dir * Math.cos(ang) * dist, y1 = y0 + Math.sin(ang) * dist;
    const deg = Math.atan2(y1 - y0, x1 - x0) * 180 / Math.PI;
    const el = document.createElement('i');
    el.className = 'meteor'; el.style.width = len + 'px';
    box.appendChild(el);
    const at = (x, y, s) => `translate(${x - len}px, ${y - 1}px) rotate(${deg}deg) scaleX(${s})`;
    const a = el.animate([
      { transform: at(x0, y0, 0.3), opacity: 0 }, { opacity: 1, offset: 0.12 }, { opacity: 0.9, offset: 0.65 },
      { transform: at(x1, y1, 1), opacity: 0 },
    ], { duration: 650 + Math.random() * 700, easing: 'cubic-bezier(.3, .55, .55, 1)' });
    a.onfinish = a.oncancel = () => el.remove();
  }
  (function plane(first) {
    setTimeout(() => {
      if (!document.hidden) { meteor(); if (Math.random() < 0.18) setTimeout(meteor, 200 + Math.random() * 700); }
      plane(false);
    }, first ? 1500 + Math.random() * 2500 : 3500 + Math.random() * 9000);
  })(true);
  // In den Himmel tippen = eigene Sternschnuppe
  addEventListener('pointerdown', (e) => {
    if (e.target.closest('.card, a, button, .footer')) return;
    meteor(e.clientX, e.clientY);
  });

  // ---------- Karte ziehen & werfen ----------
  const pos = $('card-pos'), card = $('card'), handle = $('handle'), stage = $('stage');
  let x = 0, y = 0, vx = 0, vy = 0, frei = false, drag = null, raf = 0, prevT = 0;

  const bounds = () => ({ maxX: Math.max(0, innerWidth - pos.offsetWidth), maxY: Math.max(0, innerHeight - pos.offsetHeight) });
  // Nur wenn die Karte ganz auf den Bildschirm passt (sonst stört es beim Scrollen am Handy)
  const passt = () => pos.offsetHeight + 16 < innerHeight && innerWidth > 600;
  const setzen = () => { pos.style.transform = `translate3d(${x}px, ${y}px, 0)`; };

  function freigeben() {
    if (frei) return;
    const r = pos.getBoundingClientRect();
    stage.style.minHeight = stage.offsetHeight + 'px';     // Platz halten, nichts springt
    pos.classList.add('frei'); frei = true;
    x = r.left; y = r.top; setzen();
  }
  function zurueck() {
    frei = false; vx = vy = 0; pos.classList.remove('frei'); pos.style.transform = ''; stage.style.minHeight = '';
    if (!reduce) card.animate([{ scale: .96, opacity: .6 }, { scale: 1, opacity: 1 }], { duration: 350, easing: 'cubic-bezier(.2,.8,.2,1)' });
  }

  let letzterGriff = 0;
  function start(e) {
    if (e.button !== undefined && e.button !== 0) return;
    if (e.target.closest('a, button')) return;
    if (!passt()) return;
    e.preventDefault();
    // Doppelklick/-tipp auf die Karte: zurück in die Mitte (dblclick kommt nach preventDefault nicht zuverlässig)
    if (e.timeStamp - letzterGriff < 320) { letzterGriff = 0; if (frei) zurueck(); return; }
    letzterGriff = e.timeStamp;
    freigeben();
    card.classList.add('greifen');
    vx = vy = 0;
    drag = { id: e.pointerId, dx: e.clientX - x, dy: e.clientY - y, px: e.clientX, py: e.clientY, s: [{ x: e.clientX, y: e.clientY, t: e.timeStamp }] };
    try { card.setPointerCapture(e.pointerId); } catch {}
    tick();
    $('hint').classList.remove('an');
  }
  card.addEventListener('pointerdown', start);

  addEventListener('pointermove', (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    drag.px = e.clientX; drag.py = e.clientY;
    drag.s.push({ x: e.clientX, y: e.clientY, t: e.timeStamp }); if (drag.s.length > 6) drag.s.shift();
    tick();
  }, { passive: true });

  function ende(e) {
    if (!drag || e.pointerId !== drag.id) return;
    const s = drag.s, last = s[s.length - 1], first = s.find((p) => last.t - p.t <= 100) || s[0];
    const dt = Math.max(16, last.t - first.t);
    if (!reduce && e.type !== 'pointercancel') { vx = (last.x - first.x) / dt; vy = (last.y - first.y) / dt; }
    card.classList.remove('greifen'); card.style.rotate = '0deg';
    drag = null; tick();
  }
  addEventListener('pointerup', ende);
  addEventListener('pointercancel', ende);

  function tick() { if (!raf) { prevT = performance.now(); raf = requestAnimationFrame(frame); } }
  function frame(t) {
    raf = 0;
    const dt = Math.min(40, t - prevT); prevT = t;
    const b = bounds();
    let weiter = false;
    if (drag) {
      const nx = Math.min(b.maxX, Math.max(0, drag.px - drag.dx)), ny = Math.min(b.maxY, Math.max(0, drag.py - drag.dy));
      card.style.rotate = Math.max(-4, Math.min(4, (nx - x) * 0.3)).toFixed(2) + 'deg';   // leichte Neigung in Zugrichtung
      x = nx; y = ny; setzen(); weiter = true;
    } else if (Math.abs(vx) > 0.01 || Math.abs(vy) > 0.01) {
      x += vx * dt; y += vy * dt;
      if (x < 0) { x = 0; vx = -vx * 0.45; } if (x > b.maxX) { x = b.maxX; vx = -vx * 0.45; }
      if (y < 0) { y = 0; vy = -vy * 0.45; } if (y > b.maxY) { y = b.maxY; vy = -vy * 0.45; }
      const f = Math.pow(0.0035, dt / 1000);   // Reibung, unabhängig von der Bildrate
      vx *= f; vy *= f; setzen(); weiter = true;
    }
    if (weiter) raf = requestAnimationFrame(frame);
  }
  addEventListener('resize', () => {
    if (!frei) return;
    if (!passt()) { zurueck(); return; }
    const b = bounds(); x = Math.min(x, b.maxX); y = Math.min(y, b.maxY); setzen();
  });

  // Kurzer Hinweis beim ersten Besuch (nur mit Maus)
  try {
    if (matchMedia('(hover: hover)').matches && !localStorage.getItem('slxt.hint')) {
      setTimeout(() => $('hint').classList.add('an'), 2500);
      setTimeout(() => $('hint').classList.remove('an'), 9000);
      localStorage.setItem('slxt.hint', '1');
    }
  } catch {}
})();
