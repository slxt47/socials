/* ==========================================================================
   slxt.org — interactions
   ========================================================================== */

(() => {
  'use strict';

  /* Disable right-click (kept from original — user preference) */
  document.addEventListener('contextmenu', (e) => e.preventDefault());

  /* ------------------------------------------------------------------------ */
  /*  Snowflakes                                                              */
  /* ------------------------------------------------------------------------ */
  function createSnowflakes() {
    const container = document.getElementById('snowflakes');
    if (!container) return;

    const w = window.innerWidth;
    const count = w < 400 ? 18 : w < 700 ? 28 : 55;

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const flake = document.createElement('div');
      flake.className = 'snowflake';

      const size     = Math.random() * 3 + 1.5;       // 1.5 – 4.5 px
      const duration = Math.random() * 9 + 7;         // 7 – 16 s
      const delay    = -Math.random() * duration;     // negative → mid-fall on load
      const opacity  = Math.random() * 0.5 + 0.35;    // 0.35 – 0.85
      const drift    = `${(Math.random() - 0.5) * 60}px`;

      flake.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        opacity: ${opacity};
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        --drift: ${drift};
      `;

      fragment.appendChild(flake);
    }

    container.appendChild(fragment);
  }

  /* ------------------------------------------------------------------------ */
  /*  Draggable window                                                        */
  /*  – uses Pointer Events for unified mouse/touch/pen support               */
  /*  – fixes the original "first-frame jump" bug by anchoring left/top       */
  /*    BEFORE switching to absolute positioning                              */
  /*  – clamps to viewport so the window can't be lost off-screen             */
  /* ------------------------------------------------------------------------ */
  function setupDraggable() {
    const win = document.getElementById('draggable-window');
    const handle = document.getElementById('window-titlebar');
    if (!win || !handle) return;

    // Disable drag on touch devices (tablets, phones) where it feels off
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;
    let pointerId = null;

    const onPointerDown = (e) => {
      // Don't drag from interactive elements
      if (e.target.closest('a, button, input')) return;

      // Only primary button / single touch
      if (e.button !== undefined && e.button !== 0) return;

      const rect = win.getBoundingClientRect();

      // Lock window to its current visual position before switching to absolute
      if (win.style.position !== 'absolute') {
        win.style.position = 'absolute';
        win.style.margin   = '0';
        win.style.left     = `${rect.left}px`;
        win.style.top      = `${rect.top}px`;
      }

      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      pointerId = e.pointerId;

      dragging = true;
      win.style.transition = 'none';
      win.style.animation  = 'none';            // freeze entry animation if mid-flight
      win.style.opacity    = '1';
      win.style.transform  = 'none';

      try { handle.setPointerCapture(pointerId); } catch (_) {}
    };

    const onPointerMove = (e) => {
      if (!dragging) return;

      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;

      const maxX = window.innerWidth  - win.offsetWidth;
      const maxY = window.innerHeight - win.offsetHeight;

      win.style.left = `${Math.max(0, Math.min(maxX, x))}px`;
      win.style.top  = `${Math.max(0, Math.min(maxY, y))}px`;
    };

    const onPointerUp = () => {
      if (!dragging) return;
      dragging = false;
      win.style.transition = '';
      try { handle.releasePointerCapture(pointerId); } catch (_) {}
    };

    handle.addEventListener('pointerdown',   onPointerDown);
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup',   onPointerUp);
    document.addEventListener('pointercancel', onPointerUp);

    // Reset window position on viewport resize so it doesn't end up off-screen
    window.addEventListener('resize', () => {
      if (win.style.position !== 'absolute') return;
      const left = parseFloat(win.style.left) || 0;
      const top  = parseFloat(win.style.top)  || 0;
      const maxX = window.innerWidth  - win.offsetWidth;
      const maxY = window.innerHeight - win.offsetHeight;
      win.style.left = `${Math.max(0, Math.min(maxX, left))}px`;
      win.style.top  = `${Math.max(0, Math.min(maxY, top))}px`;
    });
  }

  /* ------------------------------------------------------------------------ */
  /*  Footer year                                                             */
  /* ------------------------------------------------------------------------ */
  function setYear() {
    const el = document.getElementById('year');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* ------------------------------------------------------------------------ */
  /*  Init                                                                    */
  /* ------------------------------------------------------------------------ */
  const init = () => {
    createSnowflakes();
    setupDraggable();
    setYear();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
