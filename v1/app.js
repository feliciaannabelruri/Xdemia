/* ===================== XDEMIA ===================== */
(function () {
  'use strict';

  /* ---------- HERO slides ---------- */
  const SLIDES = [
    { img: 'assets/portraits/einstein.png',  name: 'Albert Einstein',     role: 'Theoretical physicist · 1879–1955',                          line: '“The mind, once stretched, never returns to its old dimensions.”' },
    { img: 'assets/portraits/comenius.png',  name: 'Jan Amos Comenius',   role: 'Father of modern education · 1592–1670',                     line: 'omnes, omnia, omnino — teach everything, to everyone.' },
    { img: 'assets/portraits/malala.png',    name: 'Malala Yousafzai',    role: 'Nobel Peace Prize · education activist · b. 1997',          line: 'One child, one teacher, one book can change the world.' },
    { img: 'assets/portraits/satyarthi.png', name: 'Kailash Satyarthi',   role: 'Nobel Peace Prize · the child’s right to education · b. 1954', line: 'Every child deserves the freedom to learn.' },
    { img: 'assets/portraits/einstein-old.png', name: 'Albert Einstein',  role: 'Theoretical physicist · 1879–1955',                          line: 'Education is the training of the mind to think.' },
  ];
  const DURATION = 6000;
  const stage = document.getElementById('heroStage');
  const dotsWrap = document.getElementById('heroDots');
  const figName = document.getElementById('figName');
  const figRole = document.getElementById('figRole');
  const figLine = document.getElementById('figLine');
  let idx = 0, timer = null;

  SLIDES.forEach((s, i) => {
    const slide = document.createElement('div');
    slide.className = 'hero-slide';
    const im = document.createElement('img');
    im.src = s.img; im.alt = s.name; im.loading = i === 0 ? 'eager' : 'lazy';
    slide.appendChild(im);
    stage.appendChild(slide);

    const dot = document.createElement('button');
    dot.setAttribute('aria-label', 'Go to ' + s.name);
    dot.innerHTML = '<span class="fill"></span>';
    dot.addEventListener('click', () => { go(i); restart(); });
    dotsWrap.appendChild(dot);
  });
  const slideEls = [...stage.children];
  const dotEls = [...dotsWrap.children];

  function setFigure(s) {
    figName.textContent = s.name;
    figRole.textContent = s.role;
    figLine.textContent = s.line;
  }
  function go(n) {
    slideEls[idx].classList.remove('active');
    dotEls[idx].classList.remove('active');
    idx = (n + SLIDES.length) % SLIDES.length;
    slideEls[idx].classList.add('active');
    // restart dot fill animation
    const fill = dotEls[idx].querySelector('.fill');
    fill.style.transition = 'none'; fill.style.width = '0';
    void fill.offsetWidth;
    dotEls[idx].classList.add('active');
    fill.style.transition = '';
    // fade figure text
    const fig = document.getElementById('heroFigure');
    fig.style.opacity = '0';
    setTimeout(() => { setFigure(SLIDES[idx]); fig.style.opacity = ''; }, 320);
  }
  function next() { go(idx + 1); }
  function restart() { clearInterval(timer); timer = setInterval(next, DURATION); }

  // init
  slideEls[0].classList.add('active');
  dotEls[0].classList.add('active');
  setFigure(SLIDES[0]);
  setTimeout(() => document.querySelector('.hero').classList.add('in'), 120);
  restart();

  /* ---------- NAV scroll ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- reveal on scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  /* ---------- hero parallax ---------- */
  const heroStageEl = document.getElementById('heroStage');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) heroStageEl.style.transform = 'translateY(' + y * 0.18 + 'px)';
  }, { passive: true });

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

  /* ---------- building blocks pulse ---------- */
  const mods = [...document.querySelectorAll('#bbGrid .mod')];
  let bbStarted = false;
  const bbIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && !bbStarted) {
        bbStarted = true;
        setInterval(() => {
          mods.forEach(m => m.classList.remove('on'));
          const k = 2 + Math.floor(Math.random() * 3);
          const shuffled = [...mods].sort(() => Math.random() - 0.5).slice(0, k);
          shuffled.forEach(m => m.classList.add('on'));
        }, 1400);
        // initial
        mods[0].classList.add('on'); mods[3].classList.add('on');
      }
    });
  }, { threshold: 0.3 });
  if (mods.length) bbIO.observe(document.getElementById('bbGrid'));

  /* ---------- LMS Bridge diagram ---------- */
  const svg = document.getElementById('bridgeSvg');
  if (svg) {
    const NS = 'http://www.w3.org/2000/svg';
    const nodes = [
      { x: 70,  y: 70,  label: 'LMS A' },
      { x: 70,  y: 270, label: 'LMS B' },
      { x: 390, y: 70,  label: 'LMS C' },
      { x: 390, y: 270, label: 'LMS D' },
    ];
    const hub = { x: 230, y: 170 };
    function el(tag, attrs) { const n = document.createElementNS(NS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); return n; }
    // links
    nodes.forEach((n, i) => {
      const p = el('path', {
        d: `M${n.x} ${n.y} Q ${(n.x + hub.x) / 2} ${n.y} ${hub.x} ${hub.y}`,
        fill: 'none', stroke: 'rgba(255,255,255,.14)', 'stroke-width': '1.4'
      });
      svg.appendChild(p);
      // animated pulse dot
      const dot = el('circle', { r: '3.5', fill: 'var(--teal)' });
      const anim = el('animateMotion', { dur: (2.6 + i * 0.4) + 's', repeatCount: 'indefinite', path: `M${n.x} ${n.y} Q ${(n.x + hub.x) / 2} ${n.y} ${hub.x} ${hub.y}` });
      dot.appendChild(anim); svg.appendChild(dot);
    });
    // nodes
    nodes.forEach((n) => {
      svg.appendChild(el('rect', { x: n.x - 42, y: n.y - 22, width: 84, height: 44, rx: 9, fill: '#161a1f', stroke: 'rgba(255,255,255,.14)' }));
      const t = el('text', { x: n.x, y: n.y + 4, 'text-anchor': 'middle', class: 'node-label' }); t.textContent = n.label; svg.appendChild(t);
    });
    // hub
    svg.appendChild(el('circle', { cx: hub.x, cy: hub.y, r: 42, fill: 'rgba(10,163,180,.10)', stroke: 'var(--teal)', 'stroke-width': '1.4' }));
    svg.appendChild(el('circle', { cx: hub.x, cy: hub.y, r: 42, fill: 'none', stroke: 'var(--teal)', 'stroke-width': '1.4', opacity: '.5' }));
    const hubT = el('text', { x: hub.x, y: hub.y - 2, 'text-anchor': 'middle', class: 'node-label', 'font-weight': '700' }); hubT.textContent = 'xδ'; svg.appendChild(hubT);
    const hubT2 = el('text', { x: hub.x, y: hub.y + 13, 'text-anchor': 'middle', class: 'node-label', 'font-size': '8' }); hubT2.textContent = 'BRIDGE'; hubT2.setAttribute('fill', 'rgba(255,255,255,.6)'); svg.appendChild(hubT2);
    // breathing ring
    const ring = el('circle', { cx: hub.x, cy: hub.y, r: 42, fill: 'none', stroke: 'var(--teal)', 'stroke-width': '1' });
    ring.appendChild(el('animate', { attributeName: 'r', values: '42;62;42', dur: '3.5s', repeatCount: 'indefinite' }));
    ring.appendChild(el('animate', { attributeName: 'opacity', values: '.6;0;.6', dur: '3.5s', repeatCount: 'indefinite' }));
    svg.appendChild(ring);
  }

  /* ---------- mobile burger (simple) ---------- */
  const burger = document.querySelector('.burger');
  if (burger) burger.addEventListener('click', () => {
    document.querySelector('.nav-links').style.display = 'flex';
  });
})();
