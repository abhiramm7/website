// Tiny pixel storm cloud. Drop <script src="mascot.js" defer></script> into any page.
(() => {
  // Each string is one pixel row; '.' is transparent, other characters index PALETTE.
  // ART START
  const PALETTE = {"1": "#2b2a27", "2": "#eef1f4", "3": "#c3c9d1", "4": "#ffffff", "5": "#ff3300", "6": "#4ea8de", "7": "#ffd23f", "8": "#8f99a6", "9": "#66707c", "a": "#9cc9ee", "b": "#ff8c1a", "c": "#5cb85c"};
  const ROWS = {
    idle: [
      '................................',
      '............11111111............',
      '...........1444444441...........',
      '..........144222222221111.......',
      '.......11144222222222244411.....',
      '.....11444422222222222222241....',
      '....1444222222222222222222221...',
      '...14422222222222222222222221...',
      '...142222222222222222222222221..',
      '..1442222222222222222222222221..',
      '..12222222221122222112222222221.',
      '..122222222211222221122222222221',
      '.1222222222211222221122222222221',
      '.1222222225522122122255222222221',
      '.1222222222222211222222222222221',
      '.122222222222222222222222222221.',
      '..1333333333333333333333333331..',
      '..1333333333333333333333333331..',
      '...11111111111111111111111111...',
      '................................',
      '................................',
      '................................',
      '................................',
      '................................',
      '................................',
      '................................',
      '................................',
      '................................',
      '................................',
      '................................',
      '................................',
      '................................',
    ],
    blink: [
      '................................',
      '............11111111............',
      '...........1444444441...........',
      '..........144222222221111.......',
      '.......11144222222222244411.....',
      '.....11444422222222222222241....',
      '....1444222222222222222222221...',
      '...14422222222222222222222221...',
      '...142222222222222222222222221..',
      '..1442222222222222222222222221..',
      '..12222222222222222222222222221.',
      '..122222222222222222222222222221',
      '.1222222222211222221122222222221',
      '.1222222225522122122255222222221',
      '.1222222222222211222222222222221',
      '.122222222222222222222222222221.',
      '..1333333333333333333333333331..',
      '..1333333333333333333333333331..',
      '...11111111111111111111111111...',
      '................................',
      '................................',
      '................................',
      '................................',
      '................................',
      '................................',
      '................................',
      '................................',
      '................................',
      '................................',
      '................................',
      '................................',
      '................................',
    ],
    rain1: [
      '................................',
      '............11111111............',
      '...........1444444441...........',
      '..........144222222221111.......',
      '.......11144222222222244411.....',
      '.....11444422222222222222241....',
      '....1444222222222222222222221...',
      '...14422222222222222222222221...',
      '...142222222222222222222222221..',
      '..1442222222222222222222222221..',
      '..12222222221122222112222222221.',
      '..122222222211222221122222222221',
      '.1222222222211222221122222222221',
      '.1222222225522122122255222222221',
      '.1222222222222211222222222222221',
      '.122222222222222222222222222221.',
      '..1333333333333333333333333331..',
      '..1333333333333333333333333331..',
      '...11111111111111111111111111...',
      '................................',
      '.....6.........6.........6......',
      '.....6.........6.........6......',
      '................................',
      '................................',
      '................................',
      '..........6.........6...........',
      '..........6.........6...........',
      '................................',
      '................................',
      '................................',
      '................................',
      '................................',
    ],
    rain2: [
      '................................',
      '............11111111............',
      '...........1444444441...........',
      '..........144222222221111.......',
      '.......11144222222222244411.....',
      '.....11444422222222222222241....',
      '....1444222222222222222222221...',
      '...14422222222222222222222221...',
      '...142222222222222222222222221..',
      '..1442222222222222222222222221..',
      '..12222222221122222112222222221.',
      '..122222222211222221122222222221',
      '.1222222222211222221122222222221',
      '.1222222225522122122255222222221',
      '.1222222222222211222222222222221',
      '.122222222222222222222222222221.',
      '..1333333333333333333333333331..',
      '..1333333333333333333333333331..',
      '...11111111111111111111111111...',
      '................................',
      '..........6.........6...........',
      '..........6.........6...........',
      '................................',
      '................................',
      '................................',
      '.....6.........6.........6......',
      '.....6.........6.........6......',
      '................................',
      '................................',
      '................................',
      '................................',
      '................................',
    ],
    storm: [
      '................................',
      '............11111111............',
      '...........1333333331...........',
      '..........133888888881111.......',
      '.......11133888888888833311.....',
      '.....11333388888888888888831....',
      '....1333888888888888888888881...',
      '...13388888888888888888888881...',
      '...138888888888888888888888881..',
      '..1338888888888888888888888881..',
      '..18888888881188888118888888881.',
      '..188888888811888881188888888881',
      '.1888888888811888881188888888881',
      '.1888888885588188188855888888881',
      '.1888888888888811888888888888881',
      '.188888888888888888888888888881.',
      '..1999999999999999999999999991..',
      '..1999999999999999999999999991..',
      '...11111111111111111111111111...',
      '...............17771............',
      '..............17771.............',
      '..............1771..............',
      '.............177111.............',
      '............17777771............',
      '.............111771.............',
      '...............1771.............',
      '..............1771..............',
      '..............1771..............',
      '.............1771...............',
      '.............171................',
      '............171.................',
      '.............1..................',
    ],
    stormDark: [
      '................................',
      '............11111111............',
      '...........1333333331...........',
      '..........133888888881111.......',
      '.......11133888888888833311.....',
      '.....11333388888888888888831....',
      '....1333888888888888888888881...',
      '...13388888888888888888888881...',
      '...138888888888888888888888881..',
      '..1338888888888888888888888881..',
      '..18888888881188888118888888881.',
      '..188888888811888881188888888881',
      '.1888888888811888881188888888881',
      '.1888888885588188188855888888881',
      '.1888888888888811888888888888881',
      '.188888888888888888888888888881.',
      '..1999999999999999999999999991..',
      '..1999999999999999999999999991..',
      '...11111111111111111111111111...',
      '................................',
      '................................',
      '................................',
      '................................',
      '................................',
      '................................',
      '................................',
      '................................',
      '................................',
      '................................',
      '................................',
      '................................',
      '................................',
    ],
    snow1: [
      '................................',
      '............11111111............',
      '...........1444444441...........',
      '..........144222222221111.......',
      '.......11144222222222244411.....',
      '.....11444422222222222222241....',
      '....1444222222222222222222221...',
      '...14422222222222222222222221...',
      '...142222222222222222222222221..',
      '..1442222222222222222222222221..',
      '..12222222221122222112222222221.',
      '..122222222211222221122222222221',
      '.1222222222211222221122222222221',
      '.1222222225522122122255222222221',
      '.1222222222222211222222222222221',
      '.122222222222222222222222222221.',
      '..1333333333333333333333333331..',
      '..1333333333333333333333333331..',
      '...11111111111111111111111111...',
      '................................',
      '......a...................a.....',
      '.....aaa.................aaa....',
      '......a.........a.........a.....',
      '...............aaa..............',
      '................a...............',
      '................................',
      '................................',
      '...........a.........a..........',
      '..........aaa.......aaa.........',
      '...........a.........a..........',
      '................................',
      '................................',
    ],
    snow2: [
      '................................',
      '............11111111............',
      '...........1444444441...........',
      '..........144222222221111.......',
      '.......11144222222222244411.....',
      '.....11444422222222222222241....',
      '....1444222222222222222222221...',
      '...14422222222222222222222221...',
      '...142222222222222222222222221..',
      '..1442222222222222222222222221..',
      '..12222222221122222112222222221.',
      '..122222222211222221122222222221',
      '.1222222222211222221122222222221',
      '.1222222225522122122255222222221',
      '.1222222222222211222222222222221',
      '.122222222222222222222222222221.',
      '..1333333333333333333333333331..',
      '..1333333333333333333333333331..',
      '...11111111111111111111111111...',
      '................................',
      '...................a............',
      '..................aaa...........',
      '...................a............',
      '.........a......................',
      '........aaa.....................',
      '.........a......................',
      '....a...................a.......',
      '...aaa.................aaa......',
      '....a.........a.........a.......',
      '.............aaa................',
      '..............a.................',
      '................................',
    ],
    rainbow: [
      '................................',
      '............11111111............',
      '...........1444444441...........',
      '..........144222222221111.......',
      '.......11144222222222244411.....',
      '.....11444422222222222222241....',
      '....1444222222222222222222221...',
      '...14422222222222222222222221...',
      '...142222222222222222222222221..',
      '..1442222222222222222222222221..',
      '..12222222221122222112222222221.',
      '..122222222211222221122222222221',
      '.1222222222211222221122222222221',
      '.1222222225522122122255222222221',
      '.1222222222222211222222222222221',
      '.122222222222222222222222222221.',
      '..1333333333333333333333333331..',
      '..1333333333333333333333333331..',
      '...11111111111111111111111111...',
      '...........5555555555...........',
      '.........55bbbbbbbbbb55.........',
      '........5bb7777777777bb5........',
      '......55bb77cccccccc77bb55......',
      '......5b77cc66666666cc77b5......',
      '.....5b77c66........66c77b5.....',
      '....5bb7c66..........66c7bb5....',
      '....5b7c66............66c7b5....',
      '...5b77c6..............6c77b5...',
      '...5b7c6................6c7b5...',
      '...5b7c6................6c7b5...',
      '...5b7c6................6c7b5...',
      '...5b7c6................6c7b5...',
    ],
  };
  // ART END
  const SCALE = 2, SPEED = 30, SEED = 42;
  const QUOTES = [
    'Precipitation: 100%. p-value: also somehow 0.049.',
    'My rainfall is i.i.d. Your excuses are autocorrelated.',
    "I'm a 100-year storm. Third visit this decade. Stationarity is dead.",
    "Infiltration is just rain with commitment issues.",
    'Fun fact: I weigh 500 tonnes. Rude of you not to ask.',
    'My dew point is higher than your test coverage.',
    'Nash-Sutcliffe efficiency of your scrolling: -0.3.',
    "I don't overfit. I overcast.",
    'Sorry, I just exceeded my design storm.',
    'Running SWMM in my head. Your basement is fine. Probably.',
    'Clausius-Clapeyron says I hold 7% more water per degree. So, yes, I am bloated.',
    'Rain is just gradient descent with gravity.',
    "Peak flow? I'm peak flow.",
    "Runoff coefficient of this page: 0.9. Nothing's soaking in.",
    "I'm not a model. All models are wrong. I'm just mostly wrong.",
    'Humidity: 98%. Training loss: also 98%.',
    "My forecast has error bars. Your plans don't.",
    "I'd do a Monte Carlo on whether you'll click me. Already converged: yes.",
    "Evapotranspiration is the plants' version of ghosting.",
    'Every puddle is an unsupervised clustering of rain.',
  ];
  // Said when clicked, so poking it gets a reaction instead of a random line.
  const POKED = [
    'Hey! Hands off the cumulus.',
    'Unhandled exception: PokeError at cloud.py:1',
    'I have 10^9 droplets and you touched all of them.',
    'Each click raises my convective potential. Just saying.',
    "That's not how you sample a cloud.",
    "Logged. Added to the training set of grudges.",
  ];
  const ANGRY = [
    'Convective available potential energy: MAXED.',
    'You have been rate-limited. By lightning.',
    'kill -9 your_mood',
  ];
  // Said once when a section scrolls into the middle of the screen.
  const SECTIONS = {
    'side-quests': ['Baseflow separation: the art of telling rivers what they really are.', 'Side quests. Like a main quest, but with fewer reviewers.'],
    experience: ["A data scientist who models water. I AM water. Awkward.", 'Hydraulic control engineer? So you are the one damming my plans.'],
    projects: ['PySWMM: because Fortran-era engines deserve Python too.', "rrcf finds anomalies. It'd flag me in a heartbeat."],
    publications: ['Peer review: when 3 strangers rain on your parade.', 'Bayesian optimization of stormwater. Finally, someone with priors.'],
    blog: ['Blog posts. Like papers, minus Reviewer 2.', 'Governing equations from data? I am the governing equations.'],
    rowing: ["Rowing: moving water by hand. Cute. I do it with gravity."],
    otf: ['Splat points are just precipitation for sweat.'],
    dogs: ['Dogs! Finally, data with zero noise. Pure signal.', 'Good dogs. Statistically significant good dogs.'],
  };

  // mulberry32: Math.random can't be seeded, so this gives the same sequence on every load.
  const seeded = s => () => {
    s = (s + 0x6D2B79F5) >>> 0;
    let r = Math.imul(s ^ (s >>> 15), s | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
  // Separate streams so timer draws can't shift which weather comes next.
  const weatherRandom = seeded(SEED), random = seeded(SEED + 1), quoteRandom = seeded(SEED + 2);

  const W = ROWS.idle[0].length, H = ROWS.idle.length;
  for (const [name, rows] of Object.entries(ROWS)) {
    console.assert(rows.length === H && rows.every(r => r.length === W), `mascot frame ${name} is not ${W}x${H}`);
  }

  // Render every frame once to an offscreen canvas; the loop only blits.
  const FRAMES = {};
  for (const [name, rows] of Object.entries(ROWS)) {
    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    const g = c.getContext('2d');
    rows.forEach((row, y) => [...row].forEach((ch, x) => {
      if (ch === '.') return;
      g.fillStyle = PALETTE[ch];
      g.fillRect(x, y, 1, 1);
    }));
    FRAMES[name] = c;
  }

  const el = document.createElement('canvas');
  el.width = W; el.height = H;
  el.setAttribute('aria-hidden', 'true');
  Object.assign(el.style, {
    position: 'fixed', left: '0', bottom: '0', zIndex: '1000',
    width: `${W * SCALE}px`, height: `${H * SCALE}px`,
    imageRendering: 'pixelated', cursor: 'pointer',
  });
  document.body.appendChild(el);
  const ctx = el.getContext('2d');
  const draw = name => { ctx.clearRect(0, 0, W, H); ctx.drawImage(FRAMES[name], 0, 0); };

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { draw('idle'); return; }

  const bubble = document.createElement('div');
  const text = document.createElement('span');
  const tail = document.createElement('div');
  bubble.setAttribute('aria-hidden', 'true');
  Object.assign(bubble.style, {
    position: 'fixed', bottom: `${H * SCALE + 8}px`, left: '0', zIndex: '1001', maxWidth: '220px',
    background: '#fff', color: '#2b2a27', border: '2px solid #2b2a27', borderRadius: '8px',
    padding: '6px 10px', font: '13px/1.3 system-ui, sans-serif',
    pointerEvents: 'none', opacity: '0', transition: 'opacity .3s',
  });
  Object.assign(tail.style, {
    position: 'absolute', bottom: '-7px', width: '10px', height: '10px', background: '#fff',
    borderRight: '2px solid #2b2a27', borderBottom: '2px solid #2b2a27',
    transform: 'translateX(-50%) rotate(45deg)',
  });
  bubble.append(text, tail);
  document.body.appendChild(bubble);

  let quoteLeft = 0, nextQuote = 3;
  const sayQuote = (list = QUOTES) => {
    let i = Math.floor(quoteRandom() * list.length);
    // Step past the line already showing so the same quote never shows twice in a row.
    if (list[i] === text.textContent) i = (i + 1) % list.length;
    text.textContent = list[i];
    bubble.style.opacity = '1';
    quoteLeft = 4;
  };

  // Thin band at mid-screen, so tall sections still trigger and each one fires once.
  const seen = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    seen.unobserve(e.target);
    sayQuote(SECTIONS[e.target.id]);
    nextQuote = 12 + quoteRandom() * 8;
  }), { rootMargin: '-45% 0px -45% 0px' });
  for (const id in SECTIONS) { const s = document.getElementById(id); if (s) seen.observe(s); }

  const rand = (lo, hi) => lo + random() * (hi - lo);
  const EVENTS = {
    // Two bolt flashes per strike, so the flicker stays under 3 flashes a second.
    thunder: { length: 0.7, moves: false, frame: left => (left > 0.5 || (left > 0.15 && left <= 0.35)) ? 'storm' : 'stormDark' },
    snow: { length: 4, moves: true, frame: (left, t) => Math.floor(t * 3) % 2 ? 'snow1' : 'snow2' },
    rainbow: { length: 3, moves: false, frame: () => 'rainbow' },
  };
  const NAMES = Object.keys(EVENTS);

  let x = 0, dir = 1, speed = SPEED, mode = 'drift', modeT = 5, t = 0, last = performance.now();
  let event = null, eventLeft = 0, nextEvent = rand(8, 16);
  const startEvent = () => { event = EVENTS[NAMES[Math.floor(weatherRandom() * NAMES.length)]]; eventLeft = event.length; };
  // Each click gets a retort and some weather; 5 quick clicks and it storms off.
  let clicks = 0, lastClick = -Infinity;
  el.addEventListener('click', () => {
    clicks = t - lastClick < 2 ? clicks + 1 : 1;
    lastClick = t;
    if (clicks >= 5) {
      clicks = 0;
      event = EVENTS.thunder; eventLeft = event.length;
      mode = 'drift'; modeT = 2.5; speed = 140; dir = -dir;
      sayQuote(ANGRY);
      return;
    }
    sayQuote(POKED);
    if (!event) startEvent();
  });

  function tick(now) {
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now; t += dt;

    let frame, moving;
    if (event) {
      eventLeft -= dt;
      frame = event.frame(eventLeft, t);
      moving = event.moves;
    } else {
      nextEvent -= dt;
      if (nextEvent <= 0) { startEvent(); nextEvent = rand(8, 16); }
      modeT -= dt;
      if (modeT <= 0) {
        mode = mode === 'drift' ? 'idle' : 'drift';
        modeT = rand(3, 7);
        speed = rand(15, 50);
        if (random() < 0.3) dir = -dir;
      }
      moving = mode === 'drift';
      frame = moving ? (Math.floor(t * 4) % 2 ? 'rain1' : 'rain2') : (t % 3.5 < 0.15 ? 'blink' : 'idle');
    }

    if (moving) {
      const max = innerWidth - W * SCALE;
      x += dir * speed * dt;
      if (x < 0 || x > max) { dir = -dir; x = Math.max(0, Math.min(x, max)); }
    }

    draw(frame);
    const bob = event === EVENTS.thunder ? 0 : Math.sin(t * 2) * 3;
    if (event && eventLeft <= 0) event = null;
    el.style.transform = `translate(${x}px, ${bob}px) scaleX(${dir})`;

    if (quoteLeft > 0) {
      quoteLeft -= dt;
      if (quoteLeft <= 0) bubble.style.opacity = '0';
    } else if ((nextQuote -= dt) <= 0) {
      sayQuote();
      nextQuote = 12 + quoteRandom() * 8;
    }
    if (quoteLeft > 0) {
      const center = x + W * SCALE / 2, bw = bubble.offsetWidth;
      const left = Math.max(8, Math.min(center - bw / 2, innerWidth - bw - 8));
      bubble.style.left = `${left}px`;
      tail.style.left = `${center - left}px`;
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
