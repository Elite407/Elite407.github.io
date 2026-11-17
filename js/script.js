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
    const TECHNIQUES = [
        {
            jp: '言語', kanji: '語', color: 'var(--azure)',
            title: 'Languages',
            chips: ['Python', 'SQL', 'Java', 'C++', 'C', 'MATLAB', 'Bash / Shell'],
        },
        {
            jp: 'データ分析', kanji: '析', color: 'var(--wind)',
            title: 'Data Science',
            chips: ['Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Seaborn', 'SciPy', 'SHAP', 'Statsmodels', 'Jupyter'],
        },
        {
            jp: '機械学習', kanji: '学', color: 'var(--flame)',
            title: 'AI / ML',
            chips: ['PyTorch', 'LightGBM', 'TensorFlow', 'Keras', 'RAG Architecture', 'GenAI & LLMs', 'Function Calling'],
        },
        {
            jp: '開発環境', kanji: '具', color: 'var(--gold)',
            title: 'Backend & Systems',
            groups: [
                { name: 'Architecture & Storage', chips: ['Spring Boot', 'Hibernate · JPQL', 'Caffeine Cache', 'PostgreSQL', 'POSIX Threads', 'POSIX Sockets', 'REST APIs', 'JWT · OAuth2'] },
                { name: 'DevOps & Tooling', chips: ['Git', 'Docker', 'GitHub Actions CI/CD', 'k6 Load Testing', 'JUnit · JaCoCo', 'Linux Shell', 'Streamlit', 'Postman', 'Maven', 'pgAdmin'] }
            ]
        },
        {
            jp: '履修', kanji: '修', color: 'var(--moon)',
            title: 'Coursework',
            chips: ['Design & Analysis of Algorithms', 'Database Management Systems', 'Operating Systems', 'Object Oriented Programming', 'Linear Algebra', 'Probability & Statistics'],
        },
        {
            jp: '問題解決', kanji: '競', color: 'var(--crimson)',
            title: 'Problem Solving',
            chips: ['Codeforces (1376)', 'LeetCode (1719)', 'Data Structures & Algorithms', 'Dynamic Programming', 'Graph Algorithms', 'Greedy Approaches'],
        },
    ];

    const DOMAINS = [
        {
            kanji: '白紙学府', color: 'var(--wind)',
            title: 'MySlate', real: 'Full-stack e-learning platform · Java 21 · Spring Boot · React · PostgreSQL',
            metric: ['7.7s → 118ms', 'catalog p95 under load'],
            tags: ['Java 21', 'Spring Boot', 'Hibernate · JPQL', 'PostgreSQL (Neon)', 'Caffeine', 'k6', 'React', 'JWT · OAuth2', 'JUnit · Mockito', 'Docker', 'GitHub Actions'],
            links: [],
            note: 'Private repository for now. Code walkthrough available on request.',
            metrics: [['118 ms', 'catalog p95, from 7.7 s'], ['65×', 'latency improvement'], ['3 → 290', 'req/s throughput'], ['51', 'REST endpoints over 9 tables'], ['566', 'tests · 94% instruction']],
            story: 'MySlate is a full-stack learning platform I built end to end: a 51-endpoint Spring Boot REST API over Neon PostgreSQL with student, instructor and admin roles, course catalog and moderation, enrollment, lecture progress, reviews, bookmarks and streaks, JWT authentication with OTP and Google sign-in, an admin approval workflow, and a React frontend shipped through Docker and GitHub Actions. The part I learned the most from was not building features but making it fast. Under k6 load the course catalog took 6–13 seconds to respond, and the interesting work was finding out why — then proving the fix with numbers rather than assuming it worked.',
            points: [
                '<b>Diagnosed a 5N+1 query pattern</b> as the cause of 6–13 s catalog latency under k6 load. Each catalog request was fanning out into five additional queries per course against a remote database, so the cost was dominated by round trips rather than by the queries themselves.',
                'Fixed it with <b>3 batched JPQL queries</b> plus a <b>Caffeine cache</b> with explicit invalidation and stampede protection. The cache deliberately holds only role-agnostic data — <b>per-user access control stays out of the shared cache</b>, so one user\'s permissions can never be served to another.',
                'Result: catalog <b>p95 fell from 7.7 s to 118 ms (65×)</b> and throughput rose from <b>3 to 290 req/s</b>. At 100 concurrent virtual users, k6 p95 went from <b>13 s to 6.5 ms</b>. Measured with the same k6 scripts before and after, on the same remote Neon instance.',
                'Built the backend test suite to <b>566 tests across 35 test classes</b> with JUnit 5, Mockito and MockMvc — <b>94% instruction and 88% branch coverage</b>, all 13 controllers covered, services at 97%, with before/after JaCoCo reports committed, providing the regression safety net required to refactor the query and caching layers safely without breaking behaviour or access controls.',
                'Set up the delivery pipeline: <b>path-filtered CI</b> with a Postgres service container so only affected modules rebuild, and a <b>CD workflow publishing containers to GHCR</b>.',
                'Added a <b>feature-flag mechanism</b> for UI that has no backend yet. Mock-data screens are tagged <b>@preview-only</b> with the missing endpoint, shown in local dev and hidden in production builds, so a single grep lists everything left to wire up.',
                'Wrote the supporting documentation: database architecture, functional and non-functional requirements, epics, user stories and landing-page prototypes.',
                '<b>Designed, not yet built:</b> a hierarchical curriculum (Course → Module → Section → Lesson with a draft/review/publish lifecycle), a question bank with timed proctored exams and tab-switch telemetry, and a RAG teaching assistant (500-token transcript chunks with 50 overlap, <b>pgvector</b> HNSW cosine search, Gemini-backed answers, and timestamp citations that seek the video player to the exact moment). Specs and schemas are written; the code is not.',
            ],
        },
        {
            kanji: '無限予測', color: 'var(--azure)',
            title: 'Retail Sales Forecasting', real: 'End-to-end demand forecasting + GenAI analyst',
            metric: ['5.42% MAPE', 'bottom-up national aggregate'],
            tags: ['Python', 'LightGBM', 'Streamlit', 'SHAP', 'Google Gemini', 'RAG', 'Statsmodels'],
            links: [['Repo', 'https://github.com/Elite407/sales-forecasting'], ['Live demo', 'https://sales-forecasting-v001.streamlit.app']],
            metrics: [['5.42%', 'national MAPE (4.81% SMAPE)'], ['43,947', 'national MAE (−49.3% vs SARIMA)'], ['1,782', 'store × family series'], ['7', 'Streamlit dashboard tabs'], ['5', 'grounded LLM tools']],
            story: 'Retail demand forecasting is a high-stakes operational problem — overstocking wastes capital; stockouts forfeit revenue. I analyzed a 3.4 million-row dataset spanning 54 stores and 33 product families from Ecuadorian retailer Corporación Favorita. The core engineering insight was resolving the granularity mismatch: classical statistical models excel at national aggregates but fail operational sku-level demands, whereas bottom-up summation of granular LightGBM predictions cuts aggregate baseline error in half while remaining fully explainable through SHAP and an autonomous GenAI copilot.',
            points: [
                'Cleaned, preprocessed and ran <b>exploratory data analysis</b> on the 3.4M-row dataset: isolated a <b>+14.8% biweekly payday lift</b>, proved resilient staple sales during the 2014–15 crude oil collapse, and captured emergency demand spikes following the April 2016 7.8M earthquake.',
                'Benchmarked <b>ARIMA, SARIMA, Prophet and LightGBM</b>; resolved the granularity mismatch by aggregating 1,782 store×family LightGBM series bottom-up, achieving <b>5.42% MAPE / 4.81% SMAPE (43,947 MAE)</b> on the 16-day holdout — cutting SARIMA baseline error (86,618 MAE) by <b>49.3%</b>.',
                'Applied <b>SHAP TreeExplainer</b> across 1,782 series to explain per-anomaly demand drivers at the row level; identified 7-day lag, promotions, and 14-day rolling mean as dominant global drivers, and built local waterfall decompositions for anomalous spikes.',
                'Built and deployed an enterprise <b>7-tab Streamlit dashboard</b> for store-level forecasting, multi-category macro trends, classical model diagnostics, and SHAP explainability.',
                'Shipped an autonomous GenAI analyst tab with <b>LLM function-calling (5 grounded tools)</b> and a <b>TF-IDF RAG pipeline</b> for natural-language queries over forecasts, anomalies and model metrics.',
                '<b>Documented limitations:</b> Evaluated on a single 16-day holdout; row-level SMAPE is 70.33% on sparse zero-heavy series (national 4.81% SMAPE benefits from residual cancellation under summation); earthquake shock captured from training data rather than predicted a priori.',
            ],
            shots: [
                {
                    src: 'images/projects/dashboard_overview.png',
                    alt: 'Streamlit dashboard executive overview displaying KPI telemetry, national daily trends, and historical timeline of macroeconomic shocks',
                    caption: 'Executive Overview: KPI telemetry, national daily trends, and historical timeline of macroeconomic shocks.',
                    width: 1920,
                    height: 1080
                },
                {
                    src: 'images/projects/dashboard_model_comparison.png',
                    alt: 'Master benchmark matrix comparing LightGBM, SARIMA, Prophet, and ARIMA across holdout MAE and MAPE metrics',
                    caption: 'Model Comparison: Benchmark matrix proving bottom-up LightGBM (43,947 MAE) achieves 49.3% error reduction over SARIMA.',
                    width: 1920,
                    height: 1080
                },
                {
                    src: 'images/projects/dashboard_shap_explainer.png',
                    alt: 'SHAP Explainable AI tab with global TreeExplainer feature importance beeswarm and local anomaly waterfall breakdown',
                    caption: 'SHAP Explainability: Side-by-side global feature ranking (lags, promotions) and local causal waterfall attribution.',
                    width: 1920,
                    height: 1080
                },
                {
                    src: 'images/projects/dashboard_genai_analyst.png',
                    alt: 'Autonomous GenAI decision copilot interface with Gemini function-calling and 5 grounded tools',
                    caption: 'GenAI Analyst: Conversational decision copilot using 5 grounded tools to query forecasts and explain anomalies.',
                    width: 1920,
                    height: 1080
                }
            ],
        },
        {
            kanji: '意味虚空', color: 'var(--violet)',
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
            kanji: '金庫結界', color: 'var(--gold)',
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
            kanji: '千線競売', color: 'var(--crimson)',
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
            kanji: '不断転送', color: 'var(--flame)',
            title: 'Fault-Tolerant File Distribution', real: 'Topic-based binary file server in C · POSIX sockets + pthreads · team of 6',
            role: 'My part: 9-byte protocol design · multi-threaded server · multi-node test harness · CI/CD · resume fix · README',
            metric: ['26.8×', 'session-resume vs stateless at 2% faults'],
            tags: ['C', 'POSIX Sockets', 'POSIX Threads', 'Protocol Design', 'GitHub Actions'],
            links: [['Repo', 'https://github.com/Elite407/resilient-stream']],
            metrics: [
                ['26.8×', 'session-resume vs stateless at 2% faults'],
                ['0.05 → 1.34 MB/s', 'stateless vs resume at 2% faults'],
                ['4.86×', 'concurrency speedup (4 parallel streams vs 1)'],
                ['63.5 → 301.6 MB/s', 'fault-free baseline throughput'],
                ['9 B', 'binary frame header'],
                ['12', 'protocol message types']
            ],
            story: 'TCP guarantees in-order byte delivery within an active connection, but offers zero recovery once that connection drops mid-transfer. This IT305 Computer Networks project designs the resilience layer above TCP: a custom framed application protocol in C for distributing topic-organized binary files under synthetic per-chunk fault injection. The evaluation compares recovery paradigms directly. A stateless implementation wipes the destination directory and restarts from byte zero on every disconnect, causing total throughput collapse as faults scale. A stateful session server paired with an fsync-checkpointing client resumes transfers at the exact byte offset via a dedicated reconnect handshake. An enhanced variant partitions files across parallel worker streams with modulo hashing. Built as a team-of-six collaboration (merged Groups 100 and 113).',
            points: [
                '<b>The readdir() non-deterministic resume bug:</b> During checkpoint recovery testing, clients resuming after dropped connections occasionally received corrupted or mismatched files. Root cause: the server traversed topic directories using unordered <code>readdir()</code>, whose return order is filesystem-dependent and varied across reconnects, shifting file indices. I resolved this by refactoring enumeration to sorted <code>scandir()</code> for deterministic indexing across restarts, added strict bounds checks on topic and payload headers, and backported the patch across all server variants.',
                '<b>Wire protocol & server engine:</b> Architected the <b>9-byte binary framed protocol</b> (1-byte type, 4-byte transaction ID, 4-byte payload length) in <code>protocol.h</code>, with atomic <code>send_all</code>/<code>recv_all</code> loops to survive partial I/O and <code>EINTR</code>, and <code>MSG_NOSIGNAL</code> to prevent process death on <code>SIGPIPE</code>. Designed the multi-threaded listener loop delegating clients to detached POSIX threads.',
                '<b>Stateful resumption & parallel streaming:</b> Case 1 simulates stateless drops with recursive directory wipes. Case 2 maintains an in-memory <b>mutex-guarded session table</b> (64-bit session ID, file cursor, topic name); the client advances checkpoints only after disk <code>fwrite</code>, initiating a <code>RECONNECT_REQ</code> handshake that resumes via server <code>fseek</code>. Case 2 Enhanced distributes files across N parallel TCP connections via <code>index mod N</code> partitioning.',
                '<b>Empirical benchmark results (committed CSV data):</b> Under 2% per-chunk fault injection (<code>Part2_throughput.csv</code>), the stateless pipeline collapses to <b>0.05 MB/s</b>, while stateful session resumption sustains <b>1.34 MB/s (a 26.8× throughput advantage)</b>, widening from 3.9× at 1% faults. In the parallel streaming suite (<code>Part2_Enhanced_throughput.csv</code>), scaling from 1 to 4 connections increased throughput from <b>0.42 to 2.04 MB/s (4.86× speedup)</b>. In fault-free baseline testing, session resumption delivers <b>301.6 MB/s</b> vs stateless 63.5 MB/s.',
                '<b>Saturation analysis & limitations:</b> In multi-client scaling (<code>Part1_throughput.csv</code>), throughput doubles near-linearly from 1 to 2 clients (<b>52.61 → 102.65 MB/s</b>), but plateaus at 4 and 8 clients (<b>102.26 → 112.16 MB/s</b>), indicating saturation at the link or disk I/O rather than the thread pool. <em>These are small lab runs, not a rigorous benchmark:</em> data reflects single runs per configuration without variance error bars, and the stateless baseline was permitted to spin on reconnects rather than backing off.',
                '<b>CI/CD & documentation:</b> Configured GitHub Actions CI workflows (<code>build.yml</code>, <code>ci.yml</code>) compiling all four modules with <code>-Wall -Wextra</code> and running the end-to-end integration test suite (15/15 checks green on <code>main</code>). Authored the comprehensive <b>880+ line wire-protocol specification and run guide</b> in the project README.',
            ],
            shots: [
                {
                    src: 'images/projects/ftfd_part2_cases_throughput.png',
                    alt: 'Benchmark plot comparing Case 1 stateless throughput collapse vs Case 2 session resumption under 0% to 2% fault injection',
                    caption: 'Case 1 vs Case 2 Throughput: Stateless collapses from 63.5 MB/s to 0.05 MB/s at 2% faults, while session resumption sustains 1.34 MB/s (26.8× advantage).',
                    width: 2820,
                    height: 1619
                },
                {
                    src: 'images/projects/ftfd_part2_enhanced_throughput.png',
                    alt: 'Benchmark plot showing throughput scaling across 1, 2, 4, and 8 parallel TCP worker connections',
                    caption: 'Parallel Streaming Concurrency: 4 worker connections achieve 2.04 MB/s vs 0.42 MB/s single-stream (4.86× speedup) using modulo file partitioning.',
                    width: 2655,
                    height: 1619
                },
                {
                    src: 'images/projects/ftfd_terminal_session_resume.png',
                    alt: 'Dual-pane terminal capture of Part 2 Case 2 server and client performing handshake and byte-offset resumption',
                    caption: 'Session Resumption: Client reconnects with session ID and resumes exactly from byte offset with zero redundant chunk retransmissions.',
                    width: 1520,
                    height: 860
                },
                {
                    src: 'images/projects/ftfd_terminal_case1_failover.png',
                    alt: 'Dual-pane terminal capture of Part 2 Case 1 stateless disconnect and directory wipe',
                    caption: 'Stateless Failover: Connection drop detected, client unlinks partial directory, and transfer restarts from byte zero.',
                    width: 1520,
                    height: 860
                }
            ],
        },
    ];

    const PHRASES = [
        'building ML pipelines...',
        'forecasting retail demand...',
        'designing PostgreSQL schemas...',
        'writing concurrent C...',
        'solving on Codeforces...',
    ];

    /* ---------------- RENDER ---------------- */
    const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

    $('#techGrid').innerHTML = TECHNIQUES.map(t => `
        <article class="tech-card reveal" style="--c:${t.color}">
            <span class="tc-kanji" aria-hidden="true">${t.kanji}</span>
            <div class="tc-head">
                <h3 class="tc-title">${t.title}</h3>
                <span class="tc-jp kanji-deco" aria-hidden="true">${t.jp}</span>
            </div>
            ${t.groups ? t.groups.map(g => `
                <div class="tech-group">
                    ${g.name ? `<div class="tech-group-title mono">${g.name}</div>` : ''}
                    <div class="chips">${g.chips.map(c => `<span class="chip">${c}</span>`).join('')}</div>
                </div>`).join('') : ''}
            ${t.chips ? `<div class="chips">${t.chips.map(c => `<span class="chip">${c}</span>`).join('')}</div>` : ''}
        </article>`).join('');

    const ringsSvg = `<svg class="rings" viewBox="0 0 440 440">${[200, 160, 120, 80, 40].map((r, i) => `<circle cx="220" cy="220" r="${r}" stroke-width="${i % 2 ? .6 : 1}" stroke-dasharray="${i % 2 ? '2 8' : '0'}"/>`).join('')}</svg>`;

    $('#domainGrid').innerHTML = DOMAINS.map((d, i) => `
        <article class="domain-card reveal${d.featured ? ' featured' : ''}" style="--c:${d.color}" data-idx="${i}" role="button" tabindex="0" aria-haspopup="dialog" aria-label="Open case study: ${esc(d.title)}">
            <div class="domain-art" aria-hidden="true">${ringsSvg}</div>
            <div class="dc-top">
                <span class="dc-idx">PROJECT ${String(i + 1).padStart(2, '0')} / ${String(DOMAINS.length).padStart(2, '0')}</span>
                <span class="dc-open">case study</span>
            </div>
            <div class="dc-kanji" aria-hidden="true">${d.kanji}</div>
            <h3 class="dc-title">${d.title}</h3>
            <p class="dc-real">${d.real}</p>
            ${d.role ? `<p class="dc-role mono">${d.role}</p>` : ''}
            <div class="dc-metric"><b>${d.metric[0]}</b><span>${d.metric[1]}</span></div>
            <div class="dc-foot">
                <div class="dc-tags">${d.tags.map(t => `<span class="chip">${t}</span>`).join('')}</div>
            </div>
        </article>`).join('');

    /* ---------------- THEME (dark / light) ---------------- */
    const savedTheme = localStorage.getItem('theme');
    let isLight = savedTheme === 'light' || (!savedTheme && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches);

    function applyTheme() {
        body.classList.toggle('theme-light', isLight);
        document.documentElement.classList.toggle('theme-light', isLight);
        const metaTheme = $('meta[name="theme-color"]');
        if (metaTheme) metaTheme.setAttribute('content', isLight ? '#f7f5f0' : '#121019');
        const themeText = $('#themeText');
        if (themeText) themeText.textContent = isLight ? 'Light' : 'Dark';
    }

    const themeToggleBtn = $('#themeToggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            isLight = !isLight;
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            applyTheme();
        });
    }

    // The old sorcerer/plain text toggle is gone: the copy is plain English everywhere now,
    // and the Japanese that remains is decoration only (aria-hidden in the markup).
    localStorage.removeItem('mode');

    /* ---------------- TYPING ---------------- */
    let typeTimer;
    function restartTyping() {
        clearTimeout(typeTimer);
        const el = $('#typeText');
        const list = PHRASES;
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
    // Short on purpose: a visitor's attention budget is ~20s, so the intro must not spend 3s of it.
    const LOADER_MS = 1200;
    const loader = $('#loader');
    let loaderTimer;
    const loaderVisible = () => loader.style.display !== 'none' && !loader.classList.contains('done');
    function hideLoader() {
        if (!loaderVisible()) return;
        clearTimeout(loaderTimer);
        loader.classList.add('done');
        setTimeout(() => {
            loader.style.display = 'none';
            loader.setAttribute('inert', '');
            body.classList.add('ready');
            revealHero();
        }, 450);
    }
    function playLoader() {
        loader.style.display = '';
        loader.removeAttribute('inert');
        loader.classList.remove('done');
        // restart CSS animations
        $$('*', loader).forEach(el => { el.style.animation = 'none'; void el.offsetWidth; el.style.animation = ''; });
        loaderTimer = setTimeout(hideLoader, LOADER_MS);
    }
    // Any intent to interact dismisses it — not just the skip button and Enter.
    $('#loaderSkip').addEventListener('click', e => { e.stopPropagation(); hideLoader(); });
    loader.addEventListener('click', hideLoader);
    document.addEventListener('keydown', () => { if (loaderVisible()) hideLoader(); });
    addEventListener('wheel', () => { if (loaderVisible()) hideLoader(); }, { passive: true });
    addEventListener('touchstart', () => { if (loaderVisible()) hideLoader(); }, { passive: true });

    const noIntro = new URLSearchParams(location.search).has('nointro');
    if (reduceMotion || noIntro || sessionStorage.getItem('seenIntro')) {
        loader.style.display = 'none';
        loader.setAttribute('inert', '');
        requestAnimationFrame(revealHero);
    } else {
        sessionStorage.setItem('seenIntro', '1');
        playLoader();
    }
    $('#logo').addEventListener('click', e => {
        if (reduceMotion) return;
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

    const menuBtn = $('#menuBtn');
    function setMenu(open) {
        body.classList.toggle('menu-open', open);
        menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
        menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    menuBtn.addEventListener('click', () => setMenu(!body.classList.contains('menu-open')));
    navLinks.forEach(a => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && body.classList.contains('menu-open')) setMenu(false); });

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

    /* ---------------- HERO PORTRAIT ---------------- */
    // Try the common formats in turn, then fall back to initials rather than a broken-image icon.
    (() => {
        const fig = $('#heroPortrait'), img = $('#heroPhoto');
        if (!fig || !img) return;
        const CANDIDATES = ['images/pranamya.jpg', 'images/pranamya.jpeg', 'images/pranamya.png', 'images/pranamya.webp'];
        let i = 0;
        const next = () => {
            i += 1;
            if (i < CANDIDATES.length) img.src = CANDIDATES[i];
            else fig.classList.add('no-photo');
        };
        img.addEventListener('error', next);
        // Covers the case where the error already fired before this script ran.
        if (img.complete && img.naturalWidth === 0) next();
    })();

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

            ctx.globalCompositeOperation = isLight ? 'source-over' : 'lighter';

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
                        const alpha = (1 - dist / LINK_DIST) * (isLight ? 0.35 : 0.22);
                        ctx.strokeStyle = isLight ? `rgba(124, 58, 237, ${alpha})` : `rgba(168, 85, 247, ${alpha})`;
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
                        const alpha = (1 - dist / MOUSE_DIST) * (isLight ? 0.6 : 0.5);
                        ctx.strokeStyle = isLight ? `rgba(217, 20, 56, ${alpha})` : `rgba(192, 132, 252, ${alpha})`;
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
                ctx.globalAlpha = isLight ? p.a * 0.75 : p.a;
                ctx.drawImage(sprites[p.c], p.x - s / 2, p.y - s / 2, s, s);

                ctx.fillStyle = `rgba(${p.c}, ${isLight ? 0.95 : p.a})`;
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
            <div class="dm-chant">Project ${String(i + 1).padStart(2, '0')} / ${String(DOMAINS.length).padStart(2, '0')}</div>
            <div class="dm-kanji" aria-hidden="true">${d.kanji}</div>
            <h2 class="dm-title" id="dmTitleLabel">${d.title}</h2>
            <p class="dm-real">${d.real}</p>
            ${d.role ? `<p class="dm-role mono">${d.role}</p>` : ''}
            ${d.links.length ? `<div class="dm-links">${d.links.map(([l, h]) => `<a href="${h}" target="_blank" rel="noopener">${l} ↗</a>`).join('')}</div>` : `<p class="dm-note mono">${d.note || ''}</p>`}
            <div class="dm-metrics">${d.metrics.map(([b, s]) => `<div class="dm-metric"><b>${b}</b><span>${s}</span></div>`).join('')}</div>
            <div class="dm-h">// Context</div>
            <p class="dm-story">${d.story}</p>
            <div class="dm-h">// What I built</div>
            <ul class="dm-list">${d.points.map(p => `<li>${p}</li>`).join('')}</ul>
            ${d.shots && d.shots.length ? `
            <div class="dm-h">// Visual Proof</div>
            <div class="dm-shots">
                ${d.shots.map(s => `
                    <figure class="dm-shot">
                        <img src="${s.src}" alt="${esc(s.alt)}" width="${s.width || 1920}" height="${s.height || 1080}" loading="lazy" decoding="async">
                        ${s.caption ? `<figcaption class="mono">${esc(s.caption)}</figcaption>` : ''}
                    </figure>
                `).join('')}
            </div>` : ''}
            <div class="dm-h">// Stack</div>
            <div class="chips">${d.tags.map(t => `<span class="chip">${t}</span>`).join('')}</div>`;
        modal.querySelector('.dm-scroll').scrollTop = 0;
        const go = () => {
            modal.classList.add('open');
            modal.setAttribute('aria-hidden', 'false');
            body.classList.add('modal-open');
            setBackgroundInert(true);
            $('#dmClose').focus({ preventScroll: true });
        };
        if (!reduceMotion) { blackFlash(); setTimeout(go, 140); } else go();
    }
    function closeDomain() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        body.classList.remove('modal-open');
        setBackgroundInert(false);
        if (lastFocus) lastFocus.focus({ preventScroll: true });
    }
    // Keep the page behind the dialog out of the tab order and the accessibility tree.
    const backdropTargets = [$('#nav'), $('main'), $('.footer')].filter(Boolean);
    function setBackgroundInert(on) {
        backdropTargets.forEach(el => {
            if (on) { el.setAttribute('inert', ''); el.setAttribute('aria-hidden', 'true'); }
            else { el.removeAttribute('inert'); el.removeAttribute('aria-hidden'); }
        });
    }
    // Focus trap: Tab must cycle inside the dialog, not walk into the page behind it.
    const FOCUSABLE = 'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';
    modal.addEventListener('keydown', e => {
        if (e.key !== 'Tab' || !modal.classList.contains('open')) return;
        const items = $$(FOCUSABLE, modal).filter(el => el.offsetParent !== null);
        if (!items.length) return;
        const first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    // Click-outside-to-close. .dm-scroll is inset:0 and sits above .dm-barrier, so it is the
    // element that actually receives "outside" clicks — only close when the target is itself.
    const dmScroll = modal.querySelector('.dm-scroll');
    dmScroll.addEventListener('click', e => { if (e.target === dmScroll) closeDomain(); });
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

    /* ---------------- CONTACT FORM ---------------- */
    // Formspree endpoint. If it ever fails, the status line tells the sender to email directly
    // rather than claiming a success we cannot verify.
    const FORM_ENDPOINT = 'https://formspree.io/f/xbgogjdw';
    const EMAIL = 'pranamyasanghvi@gmail.com';

    const form = $('#vowForm');
    const formNote = $('#formNote');
    const submitBtn = $('#formSubmit');
    const submitText = $('#formSubmitText');

    function setNote(msg, kind) {
        formNote.textContent = msg;
        formNote.classList.remove('err', 'ok');
        if (kind) formNote.classList.add(kind);
    }
    function mailtoFallback(f) {
        const subject = encodeURIComponent(`Portfolio: message from ${f.get('name')}`);
        const bodyTxt = encodeURIComponent(`${f.get('message')}\n\n— ${f.get('name')} (${f.get('email')})`);
        location.href = `mailto:${EMAIL}?subject=${subject}&body=${bodyTxt}`;
    }

    if (!FORM_ENDPOINT) setNote(`opens your mail client · or email ${EMAIL} directly`);

    form.addEventListener('submit', async e => {
        e.preventDefault();
        if (!form.reportValidity()) return;
        const f = new FormData(form);
        if (f.get('_gotcha')) return; // honeypot: bots fill hidden fields

        if (!FORM_ENDPOINT) { mailtoFallback(f); return; }

        submitBtn.disabled = true;
        submitText.textContent = 'Sending...';
        setNote('sending...');
        try {
            const res = await fetch(FORM_ENDPOINT, {
                method: 'POST',
                headers: { Accept: 'application/json' },
                body: f,
            });
            if (!res.ok) throw new Error('HTTP ' + res.status);
            form.reset();
            submitText.textContent = 'Sent ✓';
            setNote('got it — I\'ll reply within a couple of days.', 'ok');
            if (!reduceMotion) blackFlash();
            showToast('✓ message sent');
            setTimeout(() => { submitText.textContent = 'Send message'; submitBtn.disabled = false; }, 4000);
        } catch (err) {
            // Never claim success we can't verify — offer the path that always works.
            submitText.textContent = 'Send message';
            submitBtn.disabled = false;
            setNote(`couldn't send — please email ${EMAIL} directly.`, 'err');
        }
    });

    /* ---------------- LIVE CODEFORCES ---------------- */
    fetch('https://codeforces.com/api/user.info?handles=LogicsLord')
        .then(r => r.json())
        .then(j => {
            if (j.status !== 'OK') return;
            const u = j.result[0];
            if (!u.maxRating) return;
            $('#cfRating').textContent = u.maxRating;
            $('#cfRank').textContent = u.rating ? `LogicsLord · now ${u.rating}` : 'LogicsLord';
            const live = $('#cfLive');
            live.textContent = '● live';
            live.classList.add('on');
        })
        .catch(() => { /* keep static fallback */ });

    /* ---------------- INIT ---------------- */
    applyTheme();
    restartTyping();
})();
