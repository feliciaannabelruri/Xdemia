/* ===================== XDEMIA ===================== */
(function () {
  'use strict';

  /* ---------- BANNER: rotating portrait slideshow ---------- */
  const SLIDES = [
    { img: 'assets/portraits/malala.png',       name: 'Malala Yousafzai',   role: 'Nobel Peace Prize · education activist' },
    { img: 'assets/portraits/mandela.png',      name: 'Nelson Mandela',     flip: true,     role: '“Education is the most powerful weapon.”' },
    { img: 'assets/portraits/einstein.png',     name: 'Albert Einstein',    role: 'Theoretical physicist · 1879–1955' },
    { img: 'assets/portraits/comenius.png',     name: 'Jan Amos Comenius',  role: 'Father of modern education' },
    { img: 'assets/portraits/satyarthi.png',    name: 'Kailash Satyarthi',  role: 'Nobel Peace Prize · child’s right to learn' },
    { img: 'assets/portraits/velaz.png',        flip: true, name: 'José María Vélaz',   role: 'Founder of Fe y Alegría' },
    { img: 'assets/portraits/plato.png',        name: 'Plato',              flip: true,              role: 'Founder of the Academy · c. 387 BC' },
    { img: 'assets/portraits/einstein-old.png', name: 'Albert Einstein',    role: '“The training of the mind to think.”' },
  ];
  const DURATION = 6000;
  const bStage = document.getElementById('bannerStage');
  const bDots = document.getElementById('bannerDots');
  const figName = document.getElementById('figName');
  const figRole = document.getElementById('figRole');
  if (bStage) {
    let idx = 0, timer = null;
    SLIDES.forEach((s, i) => {
      const slide = document.createElement('div');
      slide.className = 'banner-slide';
      const im = document.createElement('img');
      im.src = s.img; im.alt = s.name; im.loading = i === 0 ? 'eager' : 'lazy';
      if (s.flip) im.style.transform = 'scaleX(-1)';
      slide.appendChild(im); bStage.appendChild(slide);
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', 'Show ' + s.name);
      dot.innerHTML = '<span class="fill"></span>';
      dot.addEventListener('click', () => { go(i); restart(); });
      bDots.appendChild(dot);
    });
    const slideEls = [...bStage.children];
    const dotEls = [...bDots.children];
    function setFig(s) { figName.textContent = s.name; figRole.textContent = s.role; }
    function go(n) {
      slideEls[idx].classList.remove('active'); dotEls[idx].classList.remove('active');
      idx = (n + SLIDES.length) % SLIDES.length;
      slideEls[idx].classList.add('active');
      const fill = dotEls[idx].querySelector('.fill');
      fill.style.transition = 'none'; fill.style.width = '0'; void fill.offsetWidth; fill.style.transition = '';
      dotEls[idx].classList.add('active');
      const fig = document.getElementById('bannerFigure');
      fig.style.opacity = '0';
      setTimeout(() => { setFig(SLIDES[idx]); fig.style.opacity = ''; }, 300);
    }
    function next() { go(idx + 1); }
    function restart() { clearInterval(timer); timer = setInterval(next, DURATION); }
    slideEls[0].classList.add('active'); dotEls[0].classList.add('active'); setFig(SLIDES[0]);
    restart();
  }

  /* ---------- hero reveal ---------- */
  setTimeout(() => {
    const b = document.querySelector('.banner'); if (b) b.classList.add('in');
    const h = document.querySelector('.hero'); if (h) h.classList.add('in');
  }, 120);

  /* ---------- NAV scroll ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- scroll-driven visibility engine (IntersectionObserver is unreliable in some sandboxed frames) ---------- */
  const watchers = [];
  function watch(el, cb, margin) { if (el) watchers.push({ el, cb, margin: margin == null ? 0.12 : margin, done: false }); }
  function checkVis() {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    let pending = 0;
    for (const w of watchers) {
      if (w.done) continue;
      const r = w.el.getBoundingClientRect();
      if (r.top < vh * (1 - w.margin) && r.bottom > -60) { w.done = true; w.cb(w.el); }
      else pending++;
    }
    return pending;
  }
  window.addEventListener('scroll', checkVis, { passive: true });
  window.addEventListener('resize', checkVis);
  // interval poll: reveals track the real scroll position even if scroll events are suppressed
  const _poll = setInterval(() => { if (checkVis() === 0) clearInterval(_poll); }, 320);

  // reveals (bento .bcard elements also carry .reveal, so they're covered here)
  document.querySelectorAll('.reveal').forEach((el) => watch(el, (e) => e.classList.add('in')));

  /* ---------- animated counters ---------- */
  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const dur = 1400, t0 = performance.now();
    const fmt = (n) => n >= 1000 ? n.toLocaleString('en-US') : String(n);
    function tick(now) {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(target * eased)) + (p === 1 ? suffix : '');
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  document.querySelectorAll('[data-count]').forEach((el) => watch(el, animateCount, -0.05));

  /* ---------- partner marquee (real P4ELECS partners, associated partners excluded) ---------- */
  const PBASE = 'https://p4elecs.com/storage/partners/';
  const PARTNERS = [
    ['KU Leuven', '01J7AZKYKN38NP69FD89JG0NHX'],
    ['UC Leuven-Limburg', '01J7B1ZX3Y977GAZTBD8EPXFD8'],
    ['T2-Campus', '01J7B20PSHHBQ7X7KSFXC0Q3H3'],
    ['DCInergy', '01J7B25PHV6K480RPEF3R4K99F'],
    ['Encon', '01J97HA5C975AQR9W9YFSJ94HH'],
    ['RWTH Aachen', '01J7B2BJM0G70WC1G8EJMJKF9J'],
    ['TH Köln', '01J7B2D6MMB3D5BVH83CMWTAVB'],
    ['Werner von Siemens Schule', '01J8DM4XN1ZEFR706M9AM8DWRK'],
    ['FEN Aachen', '01J7B2KR8QCGEJ323T5F68SM50'],
    ['Politecnico di Torino', '01J8DK3G272PHKWEKP7AXGKAFR'],
    ['Forma-re-te', '01J7B2PRC6TQEWAX7J84J155PP'],
    ['Manufacturing Industry 4.0', '01J7B2V0YTDV0PYB3W3KDW0AFY'],
    ['Progetto Arcadia', '01J9PSAVVTBA47HDYG2NETZT3E'],
    ['Riga Technical University', '01J7B2M6WE75AAZ6GES9Y1Q6F9'],
    ['LEPEBA Latvia', '01J7B2MTFF5SBAJN6CBCZRZEK9'],
    ['Ventspils Tehnikums', '01J7KBA7HACBBYTFPNN761F731'],
    ['HAN University', '01J8DKP8ABE7NTRTAQ4AJC7GA4'],
    ['The Hague University', '01J8DKXD6BYC4S0K2WRQ0VX64P'],
    ['ISSO', '01J97HC3SFN4K71B3JAZS28PG0'],
    ['Stichting Gelijkspanning', '01J7B2ZB0NDGDWVTKW6KCY6ZF5'],
    ['DC Opportunities', '01J7B2ZV14N51GC412QN71P96D'],
    ['Heijmans', '01J7B30HCYPFRCZCXZJAZ2HYKE'],
  ];
  const ptrack = document.getElementById('ptrack');
  function buildPartners() {
    const make = () => PARTNERS.map(([name, id]) =>
      `<div class="plogo"><div class="card"><img data-src="${PBASE}${id}.jpg" alt="${name}" title="${name}"></div></div>`
    ).join('');
    ptrack.innerHTML = make() + make();
  }
  buildPartners();

  // Load logos with limited concurrency — the CDN stalls on a large burst.
  (function loadLogosSequentially() {
    const imgs = [...ptrack.querySelectorAll('img[data-src]')];
    const byUrl = new Map();           // url -> [img,...]
    imgs.forEach(im => {
      const u = im.dataset.src;
      if (!byUrl.has(u)) byUrl.set(u, []);
      byUrl.get(u).push(im);
    });
    const urls = [...byUrl.keys()];
    let cursor = 0;
    const MAX = 4;
    function pump() {
      if (cursor >= urls.length) return;
      const url = urls[cursor++];
      const pre = new Image();
      const done = () => { byUrl.get(url).forEach(im => { im.src = url; }); pump(); };
      pre.onload = done;
      pre.onerror = () => pump();
      pre.src = url;
    }
    for (let i = 0; i < MAX; i++) pump();
  })();

  /* ---------- LMS Bridge: animation is pure CSS (course packet travels the rail) ---------- */

  /* ---------- mobile burger — slide-in drawer ---------- */
  (function () {
    const burger = document.querySelector('.burger');
    if (!burger) return;

    // inject drawer HTML once
    const drawer = document.createElement('div');
    drawer.className = 'nav-drawer';
    drawer.innerHTML = `
      <div class="nav-panel">
        <a href="#feed">Network</a>
        <a href="#communities">Communities</a>
        <a href="#scholarships">Scholarships</a>
        <a href="#blocks">Building Blocks</a>
        <a href="#trust">Trust</a>
        <div class="nav-panel-cta">
          <a class="btn btn-ghost" href="#">Log in</a>
          <a class="btn btn-primary" href="#join">Join free <span class="arr">→</span></a>
        </div>
      </div>`;
    document.body.appendChild(drawer);

    const open = () => { drawer.classList.add('open'); burger.classList.add('open'); document.body.style.overflow = 'hidden'; };
    const close = () => { drawer.classList.remove('open'); burger.classList.remove('open'); document.body.style.overflow = ''; };

    burger.addEventListener('click', () => drawer.classList.contains('open') ? close() : open());
    drawer.addEventListener('click', (e) => { if (!e.target.closest('.nav-panel')) close(); });
    drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  })();
})();