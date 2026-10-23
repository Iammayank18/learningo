(function () {
  // Capture nav.js's own absolute URL at parse time (document.currentScript is only valid now).
  // Stripping 'nav.js' gives the project root URL — works for both file:// and http://.
  var NAV_ROOT = (document.currentScript && document.currentScript.src
    ? document.currentScript.src.replace(/nav\.js[^/]*$/, '')
    : '');

  var SIDEBAR_W = 260; // px

  var NAV_GROUPS = [
    // Group 1 — Learn first: the computer science foundations every engineer needs
    { id:'cs-fundamentals', label:'CS Fundamentals', icon:'🧠',
      items:[
        { id:'os-fundamentals', label:'OS',          icon:'💻', url:'journal/cs-fundamentals/os-fundamentals-journal.html' },
        { id:'concurrency',     label:'Concurrency', icon:'⚡', url:'journal/cs-fundamentals/concurrency-journal.html' },
        { id:'dsa',             label:'DSA',          icon:'🧩', url:'journal/cs-fundamentals/dsa-journal.html' },
        { id:'oop',             label:'OOP',          icon:'🏛️', url:'journal/cs-fundamentals/oop-journal.html' }
      ]},
    // Group 2 — Frontend: language first, then framework, then patterns
    { id:'frontend', label:'Frontend', icon:'🎨',
      items:[
        { id:'frontend',          label:'Frontend',       icon:'🎨', url:'frontend-roadmap.html' },
        { id:'frontend-sd',       label:'FE System Design',icon:'🎨', url:'journal/frontend/frontend-system-design-journal.html' },
        { id:'css-html',          label:'CSS & HTML',     icon:'🎨', url:'journal/frontend/css-mastery-journal.html' },
        { id:'javascript',        label:'JavaScript',     icon:'⚡', url:'journal/frontend/js-mastery-journal.html' },
        { id:'typescript',        label:'TypeScript',     icon:'🔷', url:'journal/frontend/typescript-mastery-journal.html' },
        { id:'react',             label:'React',          icon:'⚛️', url:'journal/frontend/react-mastery-journal.html' },
        { id:'build-mini-react',  label:'Build Mini React',icon:'🧱', url:'journal/frontend/build-mini-react-journal.html' },
        { id:'machine-coding',    label:'Machine Coding', icon:'🔨', url:'journal/machine-coding/machine-coding-journal.html' },
        { id:'nextjs-journal',    label:'Next.js',        icon:'▲',  url:'journal/frontend/nextjs-journal.html' },
        { id:'performance-journal',label:'Performance',   icon:'⚡', url:'journal/devops/performance-journal.html' },
        { id:'testing-journal',   label:'Testing',        icon:'🧪', url:'journal/devops/testing-journal.html' },
        { id:'fullstack',         label:'Full-Stack',     icon:'🏗️', url:'journal/machine-coding/fullstack-journal.html' }
      ]},
    // Group 3 — Backend: network layer → runtime → data → API → infra → security
    { id:'backend', label:'Backend', icon:'⚙️',
      items:[
        { id:'web-protocols', label:'Networking',      icon:'🌐', url:'journal/cs-fundamentals/web-protocols-journal.html' },
        { id:'nodejs',        label:'Node.js',         icon:'🟩', url:'journal/backend/nodejs-internals-journal.html' },
        { id:'database',      label:'Databases',       icon:'🗄️', url:'journal/cs-fundamentals/database-journal.html' },
        { id:'api-design',    label:'API Design',      icon:'🔌', url:'journal/backend/api-design-journal.html' },
        { id:'devops',        label:'DevOps',          icon:'🚀', url:'journal/devops/devops-journal.html' },
        { id:'security',      label:'Security',        icon:'🛡️', url:'journal/devops/security-journal.html' },
        { id:'backend-mc',    label:'Backend Systems', icon:'⚙️', url:'journal/machine-coding/backend-machine-coding-journal.html' }
      ]},
    // Group 4 — System Design: patterns → distributed → full architecture → observability
    { id:'system-design', label:'System Design', icon:'🏗️',
      items:[
        { id:'design-patterns',      label:'Design Patterns', icon:'🏛️', url:'journal/architecture/design-patterns-journal.html' },
        { id:'microservices',        label:'Microservices',   icon:'🔀', url:'journal/architecture/microservices-journal.html' },
        { id:'system-design',        label:'System Design',   icon:'🏗️', url:'system-design-roadmap.html' },
        { id:'system-design-journal',label:'SD Journal',      icon:'📐', url:'journal/architecture/system-design-journal.html' },
        { id:'observability',        label:'Observability',   icon:'🔍', url:'journal/devops/observability-journal.html' }
      ]},
    // Group 5 — AI / Agents: LLMs, tool use, RAG, frameworks, production
    { id:'ai-agents', label:'AI / Agents', icon:'🤖',
      items:[
        { id:'ai-agents-journal',     label:'AI Agents',       icon:'🤖', url:'journal/ai/ai-agents-journal.html' },
        { id:'ai-system-design-journal', label:'AI System Design', icon:'🏗️', url:'journal/ai/ai-system-design-journal.html' },
        { id:'build-opencode-journal',label:'Build Mini-opencode', icon:'🔨', url:'journal/ai/build-opencode-journal.html' },
        { id:'build-rag-journal',     label:'Build Codebase RAG', icon:'🔍', url:'journal/ai/build-rag-journal.html' },
        { id:'build-voice-rag-journal', label:'Build Voice RAG',  icon:'🎙️', url:'journal/ai/build-voice-rag-journal.html' },
        { id:'build-git-rag-journal', label:'Build Git Archaeology', icon:'🪶', url:'journal/ai/build-git-rag-journal.html' }
      ]}
  ];
  var STANDALONE_SYLLABUS   = { id:'syllabus',    label:'Syllabus',    icon:'📚', url:'syllabus.html' };
  var STANDALONE_START      = { id:'roadmap',     label:'Roadmap',     icon:'🗺️', url:'learning-path.html' };
  var STANDALONE_SCHOOL     = { id:'prep-school', label:'Prep School', icon:'🎓', url:'prep-school-plan.html' };
  var STANDALONE_PROGRESS   = { id:'progress',    label:'Progress',    icon:'📊', url:'progress-dashboard.html' };
  var STANDALONE            = { id:'behavioral',  label:'Behavioral',  icon:'🧠', url:'behavioral-roadmap.html' };
  var STANDALONE_SCENARIOS  = { id:'scenarios',   label:'Scenarios',   icon:'🎯', url:'journal/machine-coding/real-world-scenarios-journal.html' };

  var STYLE_ID = 'nav-injected-styles';
  var COLLAPSE_KEY = 'nav_groups_collapsed_v1';

  function loadCollapsed() { try { return JSON.parse(localStorage.getItem(COLLAPSE_KEY)) || {}; } catch (e) { return {}; } }
  function saveCollapsed(m) { try { localStorage.setItem(COLLAPSE_KEY, JSON.stringify(m)); } catch (e) {} }

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    var s = document.createElement('style');
    s.id = STYLE_ID;
    s.textContent = [
      // shift page content to make room for the fixed sidebar
      'body{padding-left:' + SIDEBAR_W + 'px;box-sizing:border-box;}',
      // sidebar shell
      '.g-side{position:fixed;top:0;left:0;width:' + SIDEBAR_W + 'px;height:100vh;overflow-y:auto;overflow-x:hidden;background:rgba(255,255,255,.94);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-right:.5px solid rgba(0,0,0,.09);font-family:Outfit,Inter,sans-serif;z-index:1000;padding:14px 12px 40px;transition:transform .25s ease}',
      '.g-side::-webkit-scrollbar{width:8px}.g-side::-webkit-scrollbar-thumb{background:rgba(0,0,0,.12);border-radius:8px}',
      // brand header
      '.g-side-brand{display:flex;align-items:center;gap:9px;font-size:17px;font-weight:700;color:#1a1a18;letter-spacing:-.02em;padding:8px 10px 6px}',
      '.g-side-brand .logo{font-size:19px}',
      '.g-side-tag{font-size:11px;font-weight:600;color:#9aa0a6;padding:0 10px 12px;margin-bottom:4px;border-bottom:.5px solid rgba(0,0,0,.07)}',
      // links
      '.g-side-link{display:flex;align-items:center;gap:9px;padding:9px 12px;border-radius:10px;font-size:13.5px;font-weight:600;color:#5f5e5a;text-decoration:none;white-space:nowrap;transition:background .13s,color .13s;cursor:pointer}',
      '.g-side-link:hover{background:#f0f2f5;color:#1a1a18}',
      '.g-side-link.active,.g-side-link.active:hover{background:#1a1a18;color:#fff}',
      '.g-side-link .ico{font-size:15px;width:18px;text-align:center;flex-shrink:0}',
      '.g-side-sep{height:.5px;background:rgba(0,0,0,.07);margin:10px 10px}',
      // groups (accordion)
      '.g-side-group{margin:2px 0}',
      '.g-side-grouphead{display:flex;align-items:center;gap:9px;padding:9px 12px;border-radius:10px;font-size:13.5px;font-weight:700;color:#3a3a38;cursor:pointer;user-select:none;transition:background .13s}',
      '.g-side-grouphead:hover{background:#f0f2f5}',
      '.g-side-grouphead .ico{font-size:15px;width:18px;text-align:center;flex-shrink:0}',
      '.g-side-grouphead .label{flex:1}',
      '.g-side-grouphead.has-active{color:#1a1a18}',
      '.g-side-grouphead .caret{font-size:10px;opacity:.55;transition:transform .2s ease}',
      '.g-side-group.collapsed .g-side-grouphead .caret{transform:rotate(-90deg)}',
      '.g-side-items{padding:2px 0 4px 0}',
      '.g-side-group.collapsed .g-side-items{display:none}',
      '.g-side-items .g-side-link{padding-left:34px;font-weight:500;font-size:13px}',
      '.g-side-items .g-side-link .ico{font-size:13px}',
      // mobile toggle + backdrop
      '.g-side-toggle{position:fixed;top:12px;left:12px;z-index:1200;display:none;align-items:center;justify-content:center;width:42px;height:42px;border:none;border-radius:12px;background:#1a1a18;color:#fff;font-size:18px;cursor:pointer;box-shadow:0 4px 14px rgba(0,0,0,.2)}',
      '.g-side-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.35);z-index:999;opacity:0;pointer-events:none;transition:opacity .25s}',
      '@media(max-width:900px){',
      'body{padding-left:0}',
      '.g-side{transform:translateX(-100%);box-shadow:6px 0 30px rgba(0,0,0,.14)}',
      '.g-side.open{transform:translateX(0)}',
      '.g-side-toggle{display:flex}',
      '.g-side-backdrop.show{opacity:1;pointer-events:auto}',
      '}'
    ].join('');
    document.head.appendChild(s);
  }

  function activeIdFromURL() {
    var path = window.location.pathname.split('/').pop();
    if (STANDALONE_SYLLABUS.url.split('/').pop() === path) return STANDALONE_SYLLABUS.id;
    if (STANDALONE_START.url.split('/').pop() === path) return STANDALONE_START.id;
    if (STANDALONE_SCHOOL.url.split('/').pop() === path) return STANDALONE_SCHOOL.id;
    if (STANDALONE_PROGRESS.url.split('/').pop() === path) return STANDALONE_PROGRESS.id;
    for (var g = 0; g < NAV_GROUPS.length; g++)
      for (var i = 0; i < NAV_GROUPS[g].items.length; i++)
        if (NAV_GROUPS[g].items[i].url.split('/').pop() === path) return NAV_GROUPS[g].items[i].id;
    if (STANDALONE.url.split('/').pop() === path) return STANDALONE.id;
    if (STANDALONE_SCENARIOS.url.split('/').pop() === path) return STANDALONE_SCENARIOS.id;
    return null;
  }

  function linkHtml(item, activeId) {
    return '<a href="' + NAV_ROOT + item.url + '" class="g-side-link' + (item.id === activeId ? ' active' : '') +
      '"><span class="ico">' + item.icon + '</span><span>' + item.label + '</span></a>';
  }

  function buildNav(activeId) {
    var collapsed = loadCollapsed();

    var html = '<div class="g-side-brand"><span class="logo">🚀</span><span>Prep Hub</span></div>';
    html += '<div class="g-side-tag">Interview Mastery · Mayank</div>';

    // top standalone links
    html += linkHtml(STANDALONE_SYLLABUS, activeId);
    html += linkHtml(STANDALONE_START, activeId);
    html += linkHtml(STANDALONE_SCHOOL, activeId);
    html += linkHtml(STANDALONE_PROGRESS, activeId);
    html += '<div class="g-side-sep"></div>';

    // accordion groups
    for (var g = 0; g < NAV_GROUPS.length; g++) {
      var grp = NAV_GROUPS[g];
      var hasActive = false;
      for (var i = 0; i < grp.items.length; i++) if (grp.items[i].id === activeId) hasActive = true;

      // collapsed default: honor stored choice; otherwise open only the active group
      var isCollapsed = collapsed.hasOwnProperty(grp.id) ? collapsed[grp.id] : !hasActive;

      var items = '';
      for (var j = 0; j < grp.items.length; j++) items += linkHtml(grp.items[j], activeId);

      html += '<div class="g-side-group' + (isCollapsed ? ' collapsed' : '') + '" data-group="' + grp.id + '">' +
        '<div class="g-side-grouphead' + (hasActive ? ' has-active' : '') + '" onclick="window.__navToggleGroup(\'' + grp.id + '\')">' +
        '<span class="ico">' + grp.icon + '</span><span class="label">' + grp.label + '</span><span class="caret">▾</span>' +
        '</div><div class="g-side-items">' + items + '</div></div>';
    }

    html += '<div class="g-side-sep"></div>';
    html += linkHtml(STANDALONE, activeId);
    html += linkHtml(STANDALONE_SCENARIOS, activeId);

    var toggle = '<button class="g-side-toggle" aria-label="Menu" onclick="window.__navToggleSidebar()">☰</button>';
    var backdrop = '<div class="g-side-backdrop" onclick="window.__navToggleSidebar(false)"></div>';

    return toggle + backdrop + '<nav class="g-side">' + html + '</nav>';
  }

  function autoRender() {
    var c = document.getElementById('nav-container');
    if (!c) { c = document.createElement('div'); c.id = 'nav-container'; document.body.prepend(c); }
    c.innerHTML = buildNav(activeIdFromURL());
  }

  // toggle one accordion group and remember the choice
  window.__navToggleGroup = function (id) {
    var el = document.querySelector('.g-side-group[data-group="' + id + '"]');
    if (!el) return;
    var nowCollapsed = !el.classList.contains('collapsed');
    el.classList.toggle('collapsed', nowCollapsed);
    var m = loadCollapsed();
    m[id] = nowCollapsed;
    saveCollapsed(m);
  };

  // open/close the whole sidebar on mobile
  window.__navToggleSidebar = function (force) {
    var side = document.querySelector('.g-side');
    var back = document.querySelector('.g-side-backdrop');
    if (!side) return;
    var open = (typeof force === 'boolean') ? force : !side.classList.contains('open');
    side.classList.toggle('open', open);
    if (back) back.classList.toggle('show', open);
  };

  injectStyles();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', autoRender);
  else autoRender();

  window.renderNav = function (id) {
    var c = document.getElementById('nav-container');
    if (!c) { c = document.createElement('div'); c.id = 'nav-container'; document.body.prepend(c); }
    c.innerHTML = buildNav(id || activeIdFromURL());
  };

  // Inject favicon using NAV_ROOT (available here inside the IIFE)
  document.addEventListener('DOMContentLoaded', function () {
    var favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/png';
    favicon.href = NAV_ROOT + 'owl.png';
    document.head.appendChild(favicon);
  });
})();
