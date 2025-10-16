// Lightweight image lightbox for content area
// - Activates on images inside .content-inner
// - Click to open overlay; ESC or overlay click to close
// - Minimal footprint; no external deps

const SELECTOR = '.content-inner img';

function ensureOverlay() {
  let overlay = document.querySelector('.lightbox-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    const img = document.createElement('img');
    overlay.appendChild(img);
    document.body.appendChild(overlay);
    overlay.addEventListener('click', () => close());
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  }
  return overlay;
}

function open(src, alt) {
  const overlay = ensureOverlay();
  const img = overlay.querySelector('img');
  img.src = src;
  img.alt = alt || '';
  overlay.classList.add('active');
  document.documentElement.style.overflow = 'hidden';
}

function close() {
  const overlay = document.querySelector('.lightbox-overlay');
  if (overlay) overlay.classList.remove('active');
  document.documentElement.style.overflow = '';
}

function mount() {
  const container = document.querySelector('.content-inner');
  if (!container) return;
  container.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLImageElement)) return;
    // Skip non-zoomable (opt-out)
    if (target.dataset.nozoom !== undefined) return;
    e.preventDefault();
    open(target.src, target.alt);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}
