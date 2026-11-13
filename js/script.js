/* =========================================================
   DOMAIN EXPANSION: INFINITE COMPUTATION — interactions
   ========================================================= */
(() => {
    'use strict';

    const $ = (s, r = document) => r.querySelector(s);
    const $$ = (s, r = document) => [...r.querySelectorAll(s)];
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const body = document.body;

    /* ---------------- DATA ---------------- */
    // lvl: 3 = Special Grade / Expert, 2 = Grade 1 / Advanced, 1 = Grade 2 / Intermediate
    const LVL = {
        3: { w: '94%', t: 'Special Grade', p: 'Expert' },
        2: { w: '74%', t: 'Grade 1', p: 'Advanced' },
        1: { w: '52%', t: 'Grade 2', p: 'Intermediate' },
    };
    const NUM = ['壱', '弐', '参', '肆', '伍', '陸', '漆', '捌'];

    const TECHNIQUES = [
        {
            style: 'Water Breathing', jp: '水の呼吸', kanji: '水', color: 'var(--azure)',
            title: 'Languages', plain: 'Languages',
            forms: [['Python', 3], ['SQL', 3], ['Java', 2], ['C++', 2], ['C', 1]],
        },
        {
            style: 'Wind Breathing', jp: '風の呼吸', kanji: '風', color: 'var(--wind)',
            title: 'Data Science', plain: 'Data Science',
            forms: [['Pandas', 3], ['NumPy', 3], ['Scikit-learn', 2], ['Matplotlib', 2], ['Seaborn', 2]],
            chips: ['SciPy', 'SHAP', 'Jupyter'],
        },
        {
            style: 'Flame Breathing', jp: '炎の呼吸', kanji: '炎', color: 'var(--flame)',
            title: 'AI / ML', plain: 'AI / ML',
            forms: [['PyTorch', 2], ['LightGBM', 2], ['TensorFlow', 2], ['Keras', 2]],
            chips: ['RAG', 'GenAI', 'LLM function-calling'],
        },
        {
            style: 'Thunder Breathing', jp: '雷の呼吸', kanji: '雷', color: 'var(--gold)',
            title: 'Developer Tools', plain: 'Developer Tools',
            forms: [['Git', 3], ['PostgreSQL', 2], ['Streamlit', 2]],
            chips: ['Spring Boot', 'Docker', 'GitHub Actions', 'JUnit · JaCoCo', 'GitHub', 'VS Code', 'Linux Shell', 'pgAdmin', 'POSIX threads', 'POSIX sockets'],
        },
        {
            style: 'Moon Breathing', jp: '月の呼吸', kanji: '月', color: 'var(--moon)',
            title: 'Coursework', plain: 'Coursework',
            chips: ['Probability & Statistics', 'Design & Analysis of Algorithms', 'DBMS', 'Linear Algebra', 'Operating Systems'],
        },
        {
            style: 'Total Concentration', jp: '全集中', kanji: '集', color: 'var(--crimson)',
            title: 'Competitive Programming', plain: 'Problem Solving',
            forms: [['Codeforces · 1370', 2], ['LeetCode · 1718', 2]],
            chips: ['DSA', 'Greedy', 'Graphs', 'DP'],
        },
    ];

    const DOMAINS = [
        {
            kanji: '白紙学府', domain: 'Blank Slate Academy', color: 'var(--wind)',
            title: 'MySlate', real: 'Personal e-learning platform · Spring Boot 3 · React 19 · PostgreSQL',
            role: 'My additions: a 541-test suite, a feature-flag system, and architecture specs for exams and an AI tutor',
            metric: ['13% → 94%', 'backend test coverage'],
            tags: ['Java', 'Spring Boot', 'JUnit · Mockito', 'JaCoCo', 'React', 'PostgreSQL', 'Docker'],
            links: [],
            note: 'Private repository. Code walkthrough available on request.',
            metrics: [['94%', 'instruction coverage (from 13%)'], ['90%', 'branch coverage (from 7%)'], ['541', 'test cases (from 37)'], ['100%', 'coverage across 13 controllers'], ['6', 'feature specs written']],
            story: 'MySlate is my personal evolution of our team\'s role-based learning platform: students, instructors and admins, with course catalog, enrollment, lecture progress, reviews, bookmarks, streaks, JWT authentication with OTP and Google sign-in, and an admin approval workflow. I started from that shared codebase and took it in my own direction. First I made it trustworthy, with a real test suite and a way to keep unfinished UI out of production. Then I designed the next layer of features: a hierarchical curriculum, proctored exams, and a retrieval-grounded AI tutor.',
            points: [
                'Raised backend coverage from <b>13% to 94%</b> (branch 7% → 90%, line 14% → 96%) by growing the suite from <b>3 to 33 test classes and 541 cases</b> with JUnit 5, Mockito and MockMvc. Every one of the 13 controllers is covered, services sit at 97%, and the before/after JaCoCo reports are documented.',
                'Added a <b>feature-flag mechanism</b> for UI that has no backend yet. Mock-data screens are tagged <b>@preview-only</b> with the missing endpoint, shown in local dev and hidden in production builds, so one grep lists everything left to wire up.',
                '<b>Designed (not built yet): hierarchical curriculum.</b> Course → Module → Section → Lesson with drag-and-drop ordering, video, material, quiz and assignment lessons, a draft/review/publish lifecycle and searchable transcripts.',
                '<b>Designed (not built yet): assessments and proctored exams.</b> A central question bank (single and multi-select, true/false, numerical, descriptive), timed fullscreen exams with tab-switch and window-blur telemetry, and a manual grading queue.',
                '<b>Designed (not built yet): RAG teaching assistant.</b> Transcript chunking (500 tokens, 50 overlap), <b>pgvector</b> with HNSW cosine search, a Gemini-backed answer, and clickable timestamp citations that seek the video player to the exact moment.',
                'Wrote the supporting documentation: database architecture, functional and non-functional requirements, epics, user stories, and landing-page prototypes.',
                'Carried over the <b>CI/CD pipelines</b> I built earlier: path-filtered CI with a Postgres service container, and a CD workflow that publishes containers to GHCR.',
            ],
        },
        {
            kanji: '無限予測', domain: 'Infinite Foresight', color: 'var(--azure)',
            title: 'Retail Sales Forecasting', real: 'End-to-end demand forecasting + GenAI analyst',
            metric: ['17.8 → 10.1%', 'SMAPE'],
            tags: ['Python', 'LightGBM', 'Streamlit', 'RAG'],
            links: [['Repo', 'https://github.com/Elite407/sales-forecasting'], ['Live demo', 'https://sales-forecasting-v001.streamlit.app']],
            metrics: [['3.4M', 'rows of retail data'], ['54 × 33', 'stores × families'], ['10.1%', 'final SMAPE'], ['5', 'grounded LLM tools']],
            story: 'Retail demand forecasting is a billion-dollar problem — overstocking wastes inventory; understocking loses sales. I tackled a 3.4 million-row dataset spanning 54 stores and 33 product families, full of messy real-world signal: missing values, holiday effects, oil-price correlations and earthquake disruptions. The challenge wasn\'t just building models — it was making them explainable to non-technical stakeholders through a dashboard anyone could query in plain English.',
            points: [
                'Cleaned, preprocessed and ran <b>exploratory data analysis</b> on the 3.4M-row dataset — handled missing values, outlier detection, and uncovered seasonal trends that guided feature engineering.',
                'Benchmarked <b>ARIMA, SARIMA, Prophet and LightGBM</b> via walk-forward cross-validation, cutting <b>SMAPE from 17.8% to 10.1%</b>; used <b>SHAP</b> to explain per-anomaly demand drivers at the row level.',
                'Built and deployed a <b>6-tab Streamlit dashboard</b> for store-level forecasting, model comparison and anomaly diagnostics.',
                'Shipped a GenAI analyst tab with <b>LLM function-calling (5 grounded tools)</b> and a <b>TF-IDF RAG pipeline</b> for natural-language queries over forecasts, anomalies and metrics.',
            ],
        },
        {
            kanji: '意味虚空', domain: 'Semantic Void', color: 'var(--violet)',
            title: 'sDAC: Semantic Digital-Analog Converter', real: 'Research reproduction & extension · IEEE Trans. Commun.',
            metric: ['16× – 256×', 'faster codebook lookup'],
            tags: ['PyTorch', 'Deep Learning', 'k-d Trees'],
            links: [['Paper', 'https://drive.google.com/file/d/11Z90m7VgisbUDpVEJi-DuzZS2pU539mb/view?usp=sharing']],
            metrics: [['O(log M)', 'per query'], ['256×', 'max speedup'], ['3', 'modulations, no retrain']],
            story: 'Modern communication systems — 5G, IoT, satellite links — need to transmit meaning, not just bits. The sDAC framework learns a semantic encoder that works with any modulation scheme, but its brute-force codebook lookup was a bottleneck. I replaced it with a k-d tree search, turning an O(M) operation into O(log M): the difference between "works in a lab" and "deployable in real-time systems". The hardest part was understanding how stop-gradient training lets you backpropagate through discrete quantization.',
            points: [
                'Reproduced and extended the <b>sDAC</b> framework (IEEE Trans. Commun., vol. 73, Nov. 2025), a DNN-based semantic encoder bridging deep-learning compression with real digital infrastructure.',
                'Proposed and implemented a <b>k-d tree nearest-neighbour search</b> for codebook lookup (<b>O(log M)</b> per query), achieving <b>16×–256× speedup</b> over brute force at q = 4 to 8 bits/symbol.',
                'Analyzed how a <b>Binary Symmetric Channel</b> abstraction and stop-gradient training enable end-to-end optimization despite discrete quantization — deployable across <b>BPSK, QPSK and 16-QAM</b> without retraining.',
            ],
        },
        {
            kanji: '金庫結界', domain: 'Vault Barrier', color: 'var(--gold)',
            title: 'StockVault', real: 'Portfolio management database system',
            metric: ['900×', 'read speedup at 1M rows'],
            tags: ['PostgreSQL', 'PL/pgSQL', 'SQL'],
            links: [['Repo', 'https://github.com/Elite407/StockVault---Portfolio-Management-system']],
            metrics: [['14', 'BCNF tables'], ['9', 'PL/pgSQL triggers'], ['19', 'targeted indexes'], ['900×', 'speedup']],
            story: 'Every brokerage runs on a database that must atomically execute trades, update holdings, settle balances and log audits without ever losing a rupee. StockVault simulates exactly that: a production-grade database where a single missing constraint or poorly-ordered trigger could corrupt the entire ledger. The challenge was enforcing BCNF across 14 interrelated tables while keeping queries fast enough for real-time dashboards — solved with 19 targeted indexes validated through EXPLAIN ANALYZE at 1M-row scale.',
            points: [
                'Designed a <b>BCNF-normalized PostgreSQL database (14 tables, 7 views, 30 queries)</b> with ISA supertype–subtype hierarchies, check constraints and partial indexes; authored formal BCNF proofs.',
                'Engineered <b>9 PL/pgSQL triggers</b> automating the full trade lifecycle — order validation, weighted-average holdings upsert, balance settlement and audit logging.',
                'Optimized reads with <b>19 targeted indexes</b>, achieving up to <b>900× speedup at 1M-row scale</b>, validated via EXPLAIN ANALYZE.',
                'Built a <b>7-module SQL test suite</b> with an automated bash runner, owning the full lifecycle from schema design to testing.',
            ],
        },
        {
            kanji: '千線競売', domain: 'Thousand-Thread Market', color: 'var(--crimson)',
            title: 'Real-Time TCP Auction System', real: 'Multi-threaded auction server in pure C',
            metric: ['5 pthreads', '· lock-free global state'],
            tags: ['C', 'POSIX Threads', 'TCP Sockets', 'Linux'],
            links: [['Repo', 'https://github.com/Elite407/tcp-auction-system']],
            metrics: [['6', 'concurrent clients'], ['5', 'pthreads'], ['3-byte', 'TLV protocol'], ['10s', 'heartbeat timeout']],
            story: 'Building a real-time auction system from scratch in pure C — no frameworks, nothing beyond POSIX — forced me to confront every low-level concurrency pitfall head-on: race conditions, deadlocks, network byte-order mismatches and partial TCP reads. This is the kind of system behind trading floors and live bidding platforms, where a single race condition means lost transactions. The hardest part was designing the inactivity detection and heartbeat system that evicts dead clients without false positives.',
            points: [
                'Architected a server handling <b>6 concurrent clients</b> with <b>5 pthreads</b> (admin, timer, inactivity monitor, client handlers) synchronized via mutexes, condition variables and <b>C11 _Atomic</b> for lock-free global state.',
                'Designed a <b>3-byte packed TLV binary protocol</b> with 6 message types, using htons/ntohs serialization and <b>MSG_WAITALL</b> for reliable TCP stream framing.',
                'Implemented a sequence-number-guarded <b>inactivity countdown</b> (7s idle → 3-step sale finalization) and <b>PING/PONG heartbeat</b> (3s interval, 10s timeout) for dead-client eviction.',
                'Added <b>SIGPIPE/SIGINT</b> handling for crash-safe shutdown, path-traversal-safe input sanitization, and macro logging with __func__ introspection.',
            ],
        },
        {
            kanji: '不断転送', domain: 'Unbroken Stream', color: 'var(--flame)',
            title: 'Fault-Tolerant File Distribution', real: 'Topic-based binary file server in C · POSIX sockets + pthreads · team of 6',
            role: 'My part: 9-byte protocol design · multi-threaded server · multi-node test harness · CI/CD · resume fix · README',
            metric: ['4.2×', 'throughput from 4 parallel streams at 5% faults'],
            tags: ['C', 'POSIX Sockets', 'POSIX Threads', 'Protocol Design', 'GitHub Actions'],
            links: [['Repo', 'https://github.com/Elite407/Fault-Tolerant-Topic-based-File-Distribution-Service']],
            metrics: [['9 B', 'binary frame header'], ['12', 'protocol message types'], ['500+', 'stateless restarts at 5% faults, no data delivered'], ['13%', 'redundant bytes with resume at 5% faults'], ['4.2×', '4 parallel streams vs 1, at 5% faults']],
            story: 'TCP guarantees delivery inside one connection and nothing once that connection dies. This IT305 Computer Networks project builds the missing layer: a custom application protocol in C for distributing topic-organised binary files, with synthetic fault injection that drops connections mid-transfer. The point is the comparison. A stateless server and client that wipe and restart from byte zero waste more bandwidth every time a fault hits. A server with session state and a client that checkpoints to disk resumes at the exact byte. A parallel variant then splits files across several connections so one failure only stalls one stream. Built by a merged group of six (Groups 100 and 113).',
            points: [
                'Architected the <b>9-byte framed binary protocol</b> and the <b>multi-threaded server engine</b>, with the main thread as a pure listener that hands each client to a <b>detached pthread</b>, and built the <b>multi-node test harness</b> used to collect the results (as credited in the group report).',
                'Found and fixed a <b>non-deterministic file-traversal bug that affected checkpoint resume</b>. The server enumerated files with unordered <b>readdir()</b>, so I switched it to a sorted <b>scandir()</b> for stable file indices across reconnects, added <b>bounds checks</b> on topic and payload lengths, and rolled the fix out to the other servers.',
                'Set up <b>CI/CD with GitHub Actions</b>: it builds all four modules and runs the integration harness, and the runs on <b>main are green</b>. Also wrote the contributing guide and the initial project structure.',
                'Extended the <b>benchmark runner</b> to sweep all ten topic datasets across client counts and fault probabilities.',
                'Wrote the <b>650-line README</b>: wire-protocol specification, architecture diagrams, message layouts, handshake and recovery flows, and a full run guide.',
                '<b>Team-built design.</b> A <b>9-byte framed binary protocol</b> (type, transaction ID, length) with <b>send_all/recv_all</b> to survive partial I/O and EINTR and <b>MSG_NOSIGNAL</b> against SIGPIPE. Case 1 injects faults per 8 KB chunk and restarts from scratch. Case 2 keeps a <b>mutex-guarded session table</b> with 64-bit session IDs, a client checkpoint that advances only after a successful <b>fwrite</b>, and a <b>RECONNECT_REQ</b> handshake that resumes with <b>fseek</b>. The Enhanced variant gives each of N workers the files where <b>index mod N</b> matches its ID.',
                '<b>Measured results</b> from a multi-node testbed (figures taken from the terminal screenshots in the group report). At a <b>5% per-chunk fault rate</b> the stateless server and client never finished, with <b>500+ wipe-and-restart cycles</b> and no useful data delivered. Session resumption completed the transfer with about <b>13% redundant bytes</b>, and four parallel connections raised throughput from <b>0.38 to 1.60 MB/s (about 4.2×)</b>. These are small lab runs, not a rigorous benchmark.',
                'Why restarting fails: with per-chunk fault probability P, a topic of n chunks finishes without a restart with probability <b>(1 − P)<sup>n</sup></b>. At 5% faults and a 3,110-chunk topic that is about <b>10<sup>−70</sup></b>, which is why session resumption matters.',
            ],
        },
    ];

    const PHRASES = {
        t: ['expanding domain: infinite computation...', 'channelling cursed energy into LightGBM...', 'total concentration: codeforces round...', 'sealing tables in BCNF...', 'spawning pthreads without deadlock...'],
        p: ['building ML pipelines...', 'forecasting retail demand...', 'solving on Codeforces...', 'designing PostgreSQL schemas...', 'writing concurrent C...'],
    };

    /* ---------------- RENDER ---------------- */
    const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

    $('#techGrid').innerHTML = TECHNIQUES.map(t => `
        <article class="tech-card reveal" style="--c:${t.color}">
            <span class="tc-kanji">${t.kanji}</span>
            <div class="tc-head">
                <span class="tc-style" data-t="${esc(t.style)}" data-p="Category">${t.style}</span>
                <span class="tc-jp kanji-deco">${t.jp}</span>
            </div>
            <h3 class="tc-title" data-t="${esc(t.title)}" data-p="${esc(t.plain)}">${t.title}</h3>
            ${t.forms ? `<ul class="forms">${t.forms.map(([name, l], i) => `
                <li class="form-row">
                    <span class="fr-name"><small data-t="Form ${NUM[i]}" data-p="0${i + 1}">Form ${NUM[i]}</small>${name}</span>
                    <span class="fr-lvl" data-t="${LVL[l].t}" data-p="${LVL[l].p}">${LVL[l].t}</span>
                    <span class="form-bar"><i style="--w:${LVL[l].w}"></i></span>
                </li>`).join('')}</ul>` : ''}
            ${t.chips ? `<div class="chips" style="margin-top:${t.forms ? '1.2rem' : '0'}">${t.chips.map(c => `<span class="chip">${c}</span>`).join('')}</div>` : ''}
        </article>`).join('');

    const ringsSvg = `<svg class="rings" viewBox="0 0 440 440">${[200, 160, 120, 80, 40].map((r, i) => `<circle cx="220" cy="220" r="${r}" stroke-width="${i % 2 ? .6 : 1}" stroke-dasharray="${i % 2 ? '2 8' : '0'}"/>`).join('')}</svg>`;

    $('#domainGrid').innerHTML = DOMAINS.map((d, i) => `
        <article class="domain-card reveal${d.featured ? ' featured' : ''}" style="--c:${d.color}" data-idx="${i}" role="button" tabindex="0" aria-label="Open ${esc(d.title)}">
            <div class="domain-art">${ringsSvg}</div>
            <div class="dc-top">
                <span class="dc-idx" data-t="DOMAIN ${NUM[i]} / 0${DOMAINS.length}" data-p="PROJECT 0${i + 1}">DOMAIN ${NUM[i]} / 0${DOMAINS.length}</span>
                <span class="dc-open" data-t="expand domain" data-p="case study">expand domain</span>
            </div>
            <div class="dc-kanji">${d.kanji}</div>
            <div class="dc-domain kanji-deco">Domain Expansion · ${d.domain}</div>
            <h3 class="dc-title">${d.title}</h3>
            <p class="dc-real">${d.real}</p>
            ${d.role ? `<p class="dc-role mono">${d.role}</p>` : ''}
            <div class="dc-metric"><b>${d.metric[0]}</b><span>${d.metric[1]}</span></div>
            <div class="dc-foot">
                <div class="dc-tags">${d.tags.map(t => `<span class="chip">${t}</span>`).join('')}</div>
            </div>
        </article>`).join('');

    /* ---------------- MODE (sorcerer / plain) ---------------- */
    let plain = localStorage.getItem('mode') === 'plain';
    function applyMode() {
        body.classList.toggle('plain', plain);
        $$('[data-t]').forEach(el => {
            el.textContent = el.getAttribute(plain ? 'data-p' : 'data-t');
        });
        restartTyping();
    }
    $('#modeToggle').addEventListener('click', () => {
        plain = !plain;
        localStorage.setItem('mode', plain ? 'plain' : 'sorcerer');
        if (!plain && !reduceMotion) blackFlash();
        applyMode();
    });

    /* ---------------- TYPING ---------------- */
    let typeTimer;
    function restartTyping() {
        clearTimeout(typeTimer);
        const el = $('#typeText');
        const list = PHRASES[plain ? 'p' : 't'];
        let pi = 0, ci = 0, del = false;
        el.textContent = '';
        (function tick() {
            const word = list[pi];
            ci += del ? -1 : 1;
            el.textContent = word.slice(0, ci);
            let d = del ? 28 : 55;
            if (!del && ci === word.length) { del = true; d = 1700; }
            else if (del && ci === 0) { del = false; pi = (pi + 1) % list.length; d = 350; }
            typeTimer = setTimeout(tick, d);
        })();
    }

    /* ---------------- LOADER ---------------- */
    const loader = $('#loader');
    let loaderTimer;
    function hideLoader() {
        clearTimeout(loaderTimer);
        loader.classList.add('done');
        setTimeout(() => { loader.style.display = 'none'; body.classList.add('ready'); revealHero(); }, 750);
    }
    function playLoader() {
        loader.style.display = '';
        loader.classList.remove('done');
        // restart CSS animations
        $$('*', loader).forEach(el => { el.style.animation = 'none'; void el.offsetWidth; el.style.animation = ''; });
        loaderTimer = setTimeout(hideLoader, 3000);
    }
    $('#loaderSkip').addEventListener('click', hideLoader);
    document.addEventListener('keydown', e => { if (e.key === 'Enter' && loader.style.display !== 'none' && !loader.classList.contains('done')) hideLoader(); });

    const noIntro = new URLSearchParams(location.search).has('nointro');
    if (reduceMotion || plain || noIntro || sessionStorage.getItem('expanded')) {
        loader.style.display = 'none';
        requestAnimationFrame(revealHero);
    } else {
        sessionStorage.setItem('expanded', '1');
        playLoader();
    }
    $('#logo').addEventListener('click', e => {
        if (plain || reduceMotion) return;
        e.preventDefault();
        window.scrollTo({ top: 0 });
        playLoader();
    });

    function revealHero() {
        $$('.hero .reveal').forEach((el, i) => setTimeout(() => el.classList.add('in'), i * 110));
        setTimeout(() => $$('.hero [data-count]').forEach(countUp), 500);
    }

    /* ---------------- BLACK FLASH ---------------- */
    const flash = $('#blackFlash');
    function blackFlash() {
        flash.classList.remove('on'); void flash.offsetWidth; flash.classList.add('on');
    }

    /* ---------------- REVEAL + COUNTERS ---------------- */
    function countUp(el) {
        if (el.dataset.done) return;
        el.dataset.done = 1;
        const target = parseFloat(el.dataset.count);
        const dec = +(el.dataset.dec || 0);
        const suf = el.dataset.suffix || '';
        const t0 = performance.now(), dur = 1600;
        (function f(now) {
            const p = Math.min(1, (now - t0) / dur);
            const v = target * (1 - Math.pow(1 - p, 4));
            el.textContent = (dec ? v.toFixed(dec) : Math.round(v).toLocaleString('en-IN')) + suf;
            if (p < 1) requestAnimationFrame(f);
        })(t0);
    }
    const io = new IntersectionObserver(entries => {
        entries.forEach(en => {
            if (!en.isIntersecting) return;
            const el = en.target;
            el.classList.add('in');
            $$('[data-count]', el).forEach(countUp);
            if (el.dataset.count) countUp(el);
            io.unobserve(el);
        });
    }, { threshold: .15, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal').forEach(el => { if (!el.closest('.hero')) io.observe(el); });

    /* ---------------- NAV ---------------- */
    const nav = $('#nav');
    const fill = $('#bladeFill');
    function onScroll() {
        const y = scrollY;
        nav.classList.toggle('scrolled', y > 40);
        const max = document.documentElement.scrollHeight - innerHeight;
        fill.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    }
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const navLinks = $$('.nav-links a');
    const secIO = new IntersectionObserver(entries => {
        entries.forEach(en => {
            if (en.isIntersecting) navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('section[id]').forEach(s => secIO.observe(s));

    $('#menuBtn').addEventListener('click', () => body.classList.toggle('menu-open'));
    navLinks.forEach(a => a.addEventListener('click', () => body.classList.remove('menu-open')));

    /* ---------------- CURSOR ---------------- */
    if (finePointer && !reduceMotion) {
        const dot = $('#cursorDot'), ring = $('#cursorRing');
        let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
        addEventListener('mousemove', e => {
            mx = e.clientX; my = e.clientY;
            dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
            body.classList.add('has-cursor');
        });
        document.addEventListener('mouseleave', () => body.classList.remove('has-cursor'));
        (function loop() {
            rx += (mx - rx) * .55; ry += (my - ry) * .55;
            ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
            requestAnimationFrame(loop);
        })();
        document.addEventListener('mouseover', e => {
            ring.classList.toggle('hover', !!e.target.closest('a, button, input, textarea, .tech-card, .rank-card'));
        });
    }

    /* ---------------- ID CARD TILT ---------------- */
    const card = $('#idCard');
    if (finePointer && !reduceMotion) {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
            card.style.setProperty('--ry', ((x - .5) * 14) + 'deg');
            card.style.setProperty('--rx', ((.5 - y) * 14) + 'deg');
            card.style.setProperty('--gx', x * 100 + '%');
            card.style.setProperty('--gy', y * 100 + '%');
        });
        card.addEventListener('mouseleave', () => { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); });
    }

    /* ---------------- CURSED ENERGY CANVAS ---------------- */
    const cv = $('#energyCanvas');
    const ctx = cv.getContext('2d');
    let W, H, dpr, parts = [], heroVisible = true;
    const mouse = { x: -999, y: -999 };
    const COLORS = ['139,92,246', '225,29,72', '56,189,248', '192,132,252'];

    // Pre-rendered glow sprites: far cheaper than a blur (shadowBlur) on every particle every frame.
    const sprites = {};
    COLORS.forEach(c => {
        const s = document.createElement('canvas'); s.width = s.height = 32;
        const x = s.getContext('2d');
        const g = x.createRadialGradient(16, 16, 0, 16, 16, 16);
        g.addColorStop(0, `rgba(${c},1)`); g.addColorStop(.35, `rgba(${c},.45)`); g.addColorStop(1, `rgba(${c},0)`);
        x.fillStyle = g; x.fillRect(0, 0, 32, 32);
        sprites[c] = s;
    });

    // Soft glow that follows the mouse: a GPU-moved element instead of a full-screen gradient repaint.
    const glow = document.createElement('div');
    glow.className = 'hero-glow';
    $('#hero').insertBefore(glow, cv);
    let gx = 0, gy = 0;

    function resize() {
        dpr = Math.min(devicePixelRatio || 1, 1.5);
        W = cv.clientWidth; H = cv.clientHeight;
        cv.width = W * dpr; cv.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const n = Math.round(Math.min(80, Math.max(35, (W * H) / 16000)));
        parts = Array.from({ length: n }, () => spawn());
        gx = W * .72; gy = H * .45;
    }
    function spawn() {
        return {
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 1.6 + 1.2,
            vx: (Math.random() - .5) * .5,
            vy: (Math.random() - .5) * .5,
            a: Math.random() * .4 + .45,
            c: COLORS[(Math.random() * COLORS.length) | 0],
        };
    }
    function draw() {
        if (heroVisible) {
            ctx.clearRect(0, 0, W, H);

            // central cursed core glow eases toward the mouse
            const tx = mouse.x > 0 ? mouse.x : W * .72, ty = mouse.y > 0 ? mouse.y : H * .45;
            gx += (tx - gx) * .08; gy += (ty - gy) * .08;
            glow.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;

            // Update positions & bounce softly off borders
            for (let i = 0; i < parts.length; i++) {
                const p = parts[i];
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) { p.x = 0; p.vx *= -1; }
                else if (p.x > W) { p.x = W; p.vx *= -1; }
                if (p.y < 0) { p.y = 0; p.vy *= -1; }
                else if (p.y > H) { p.y = H; p.vy *= -1; }
            }

            ctx.globalCompositeOperation = 'lighter';

            // 1. Constellation network: connect nearby dots
            const LINK_DIST = 125;
            const LINK_DIST_SQ = LINK_DIST * LINK_DIST;
            for (let i = 0; i < parts.length; i++) {
                const p1 = parts[i];
                for (let j = i + 1; j < parts.length; j++) {
                    const p2 = parts[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const d2 = dx * dx + dy * dy;
                    if (d2 < LINK_DIST_SQ) {
                        const dist = Math.sqrt(d2);
                        const alpha = (1 - dist / LINK_DIST) * 0.22;
                        ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            // 2. Cursor hover: connect lines to the nearest dots (no repulsion)
            if (mouse.x > 0 && mouse.y > 0) {
                const MOUSE_DIST = 160;
                const MOUSE_DIST_SQ = MOUSE_DIST * MOUSE_DIST;
                for (let i = 0; i < parts.length; i++) {
                    const p = parts[i];
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const d2 = dx * dx + dy * dy;
                    if (d2 < MOUSE_DIST_SQ) {
                        const dist = Math.sqrt(d2);
                        const alpha = (1 - dist / MOUSE_DIST) * 0.5;
                        ctx.strokeStyle = `rgba(192, 132, 252, ${alpha})`;
                        ctx.lineWidth = 1.1;
                        ctx.beginPath();
                        ctx.moveTo(mouse.x, mouse.y);
                        ctx.lineTo(p.x, p.y);
                        ctx.stroke();
                    }
                }
            }

            // 3. Draw particles (glow + crisp core dot)
            for (let i = 0; i < parts.length; i++) {
                const p = parts[i];
                const s = p.r * 7;
                ctx.globalAlpha = p.a;
                ctx.drawImage(sprites[p.c], p.x - s / 2, p.y - s / 2, s, s);

                ctx.fillStyle = `rgba(${p.c}, ${p.a})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.globalAlpha = 1;
            ctx.globalCompositeOperation = 'source-over';
        }
        requestAnimationFrame(draw);
    }
    if (!reduceMotion) {
        resize();
        addEventListener('resize', resize);
        $('#hero').addEventListener('mousemove', e => {
            const r = cv.getBoundingClientRect();
            mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
        });
        $('#hero').addEventListener('mouseleave', () => { mouse.x = mouse.y = -999; });
        document.addEventListener('mouseleave', () => { mouse.x = mouse.y = -999; });
        new IntersectionObserver(([en]) => { heroVisible = en.isIntersecting; }).observe($('#hero'));
        requestAnimationFrame(draw);
    }

    /* ---------------- DOMAIN MODAL ---------------- */
    const modal = $('#domainModal');
    const dmContent = $('#dmContent');
    let lastFocus;
    function openDomain(i, x, y) {
        const d = DOMAINS[i];
        lastFocus = document.activeElement;
        modal.style.setProperty('--c', d.color);
        modal.style.setProperty('--ox', x + 'px');
        modal.style.setProperty('--oy', y + 'px');
        dmContent.innerHTML = `
            <div class="dm-chant">${plain ? `Project 0${i + 1}` : `領域展開 · Domain Expansion`}</div>
            ${plain ? '' : `<div class="dm-kanji">${d.kanji}</div>`}
            <h2 class="dm-title">${plain ? d.title : d.domain}</h2>
            <p class="dm-real">${plain ? d.real : `${d.title} — ${d.real}`}</p>
            ${d.role ? `<p class="dm-role mono">${d.role}</p>` : ''}
            ${d.links.length ? `<div class="dm-links">${d.links.map(([l, h]) => `<a href="${h}" target="_blank" rel="noopener">${l} ↗</a>`).join('')}</div>` : `<p class="dm-note mono">${d.note || ''}</p>`}
            <div class="dm-metrics">${d.metrics.map(([b, s]) => `<div class="dm-metric"><b>${b}</b><span>${s}</span></div>`).join('')}</div>
            <div class="dm-h">${plain ? '// Context' : '// The barrier — why it matters'}</div>
            <p class="dm-story">${d.story}</p>
            <div class="dm-h">${plain ? '// What I built' : '// Sure-hit effects — what I built'}</div>
            <ul class="dm-list">${d.points.map(p => `<li>${p}</li>`).join('')}</ul>
            <div class="dm-h">// Stack</div>
            <div class="chips">${d.tags.map(t => `<span class="chip">${t}</span>`).join('')}</div>`;
        modal.querySelector('.dm-scroll').scrollTop = 0;
        const go = () => {
            modal.classList.add('open');
            modal.setAttribute('aria-hidden', 'false');
            body.classList.add('modal-open');
            $('#dmClose').focus({ preventScroll: true });
        };
        if (!plain && !reduceMotion) { blackFlash(); setTimeout(go, 140); } else go();
    }
    function closeDomain() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        body.classList.remove('modal-open');
        if (lastFocus) lastFocus.focus({ preventScroll: true });
    }
    $('#domainGrid').addEventListener('click', e => {
        const c = e.target.closest('.domain-card');
        if (!c) return;
        const r = c.getBoundingClientRect();
        const x = e.clientX || r.left + r.width / 2, y = e.clientY || r.top + r.height / 2;
        openDomain(+c.dataset.idx, x, y);
    });
    $('#domainGrid').addEventListener('keydown', e => {
        const c = e.target.closest('.domain-card');
        if (!c || (e.key !== 'Enter' && e.key !== ' ')) return;
        e.preventDefault();
        const r = c.getBoundingClientRect();
        openDomain(+c.dataset.idx, r.left + r.width / 2, r.top + r.height / 2);
    });
    $('#dmClose').addEventListener('click', closeDomain);
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeDomain(); });

    /* ---------------- COPY + TOAST ---------------- */
    const toast = $('#toast');
    let toastT;
    function showToast(msg) {
        toast.textContent = msg;
        toast.classList.add('show');
        clearTimeout(toastT);
        toastT = setTimeout(() => toast.classList.remove('show'), 1800);
    }
    $$('[data-copy]').forEach(b => b.addEventListener('click', async () => {
        try { await navigator.clipboard.writeText(b.dataset.copy); showToast('✓ copied — ' + b.dataset.copy); }
        catch { showToast(b.dataset.copy); }
    }));

    /* ---------------- VOW FORM ---------------- */
    $('#vowForm').addEventListener('submit', e => {
        e.preventDefault();
        const f = new FormData(e.target);
        const subject = encodeURIComponent(`Portfolio: message from ${f.get('name')}`);
        const bodyTxt = encodeURIComponent(`${f.get('message')}\n\n— ${f.get('name')} (${f.get('email')})`);
        if (!plain && !reduceMotion) blackFlash();
        showToast(plain ? '✓ opening mail client' : '✓ vow sealed — opening mail');
        setTimeout(() => { location.href = `mailto:pranamyasanghvi@gmail.com?subject=${subject}&body=${bodyTxt}`; }, 450);
    });

    /* ---------------- LIVE CODEFORCES ---------------- */
    fetch('https://codeforces.com/api/user.info?handles=LogicsLord')
        .then(r => r.json())
        .then(j => {
            if (j.status !== 'OK') return;
            const u = j.result[0];
            if (!u.maxRating) return;
            $('#cfRating').textContent = u.maxRating;
            const hero = $('#cfHero');
            hero.dataset.count = u.maxRating;
            if (hero.dataset.done) hero.textContent = u.maxRating.toLocaleString('en-IN');
            $('#cfRank').textContent = `${u.maxRank || ''} · now ${u.rating}`.trim();
            $('#cfMeter').style.setProperty('--w', Math.min(100, (u.maxRating / 2400) * 100) + '%');
            const live = $('#cfLive');
            live.textContent = '● live';
            live.classList.add('on');
        })
        .catch(() => { /* keep static fallback */ });

    /* ---------------- INIT ---------------- */
    applyMode();
})();
