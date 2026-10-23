/**
 * notes-card.js — Universal Revision Notes Drawer
 * Injects a 📝 button into every topic/item across all journals.
 * Click it → side drawer opens with 5 note fields + self-rating + save.
 * Notes are stored in localStorage, keyed by journal + topicId.
 */
(function () {
  'use strict';

  /* ─── Storage ─────────────────────────────────────────── */
  var STORE = 'revision_notes_v2';

  function pageSlug() {
    return location.pathname.split('/').pop().replace(/\.html$/, '');
  }
  function pageKey(id) { return pageSlug() + '::' + id; }

  function allNotes() {
    try { return JSON.parse(localStorage.getItem(STORE) || '{}'); }
    catch (e) { return {}; }
  }
  function getNote(id) { return allNotes()[pageKey(id)] || {}; }
  function saveNote(id, data) {
    var n = allNotes();
    n[pageKey(id)] = data;
    localStorage.setItem(STORE, JSON.stringify(n));
  }
  function noteHasContent(id) {
    var n = getNote(id);
    return Object.keys(n).some(function(k) { return n[k] && n[k] !== 0; });
  }

  /* ─── CSS ──────────────────────────────────────────────── */
  var css = [
    /* Overlay backdrop */
    '.nc-overlay{display:none;position:fixed;inset:0;z-index:9990;background:rgba(0,0,0,0.25);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);}',
    '.nc-overlay.nc-open{display:block;}',

    /* Drawer panel */
    '.nc-drawer{',
    '  position:fixed;top:0;right:-500px;height:100vh;width:460px;max-width:100vw;',
    '  background:#fff;box-shadow:-6px 0 40px rgba(0,0,0,0.14);',
    '  display:flex;flex-direction:column;',
    '  transition:right .3s cubic-bezier(.4,0,.2,1);',
    '  z-index:9991;font-family:Outfit,Inter,sans-serif;overflow:hidden;',
    '}',
    '.nc-overlay.nc-open .nc-drawer{right:0;}',

    /* Header */
    '.nc-head{padding:18px 20px 14px;border-bottom:1px solid #efefef;display:flex;align-items:flex-start;gap:10px;flex-shrink:0;background:#fff;}',
    '.nc-head-icon{font-size:20px;margin-top:1px;flex-shrink:0;}',
    '.nc-head-title{flex:1;font-size:14px;font-weight:700;color:#1a1a18;line-height:1.4;word-break:break-word;}',
    '.nc-head-close{background:none;border:none;cursor:pointer;font-size:16px;color:#999;padding:0;line-height:1;flex-shrink:0;margin-top:1px;transition:color .15s;}',
    '.nc-head-close:hover{color:#1a1a18;}',

    /* Question banner */
    '.nc-q-banner{margin:14px 20px 0;background:#ffeab6;border-radius:12px;padding:12px 14px;font-size:13px;line-height:1.55;color:#7a5200;display:none;}',
    '.nc-q-banner.nc-visible{display:block;}',
    '.nc-q-banner strong{display:block;margin-bottom:4px;font-weight:700;}',

    /* Body */
    '.nc-body{flex:1;overflow-y:auto;padding:14px 20px 0;}',
    '.nc-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px;}',
    '@media(max-width:600px){.nc-grid{grid-template-columns:1fr;}.nc-drawer{width:100vw;}}',

    /* Field */
    '.nc-field{display:flex;flex-direction:column;gap:5px;}',
    '.nc-field.nc-full{grid-column:1 / -1;}',
    '.nc-lbl{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#5f6368;display:flex;align-items:center;gap:5px;}',
    '.nc-ta{',
    '  width:100%;background:#f5f5f5;border:1.5px solid transparent;border-radius:10px;',
    '  padding:10px 12px;font-family:inherit;font-size:13px;color:#1a1a18;',
    '  resize:vertical;min-height:76px;line-height:1.5;',
    '  transition:border-color .2s,background .2s;',
    '}',
    '.nc-ta:focus{outline:none;border-color:#1a1a18;background:#fff;}',
    '.nc-ta.nc-filled{background:#fff;border-color:rgba(0,0,0,.1);}',
    '.nc-ta::placeholder{color:#bbb;font-style:italic;}',

    /* Footer */
    '.nc-foot{padding:12px 20px 16px;border-top:1px solid #efefef;flex-shrink:0;background:#fff;}',
    '.nc-rating-row{display:flex;align-items:center;gap:7px;flex-wrap:wrap;margin-bottom:10px;}',
    '.nc-rating-lbl{font-size:12px;font-weight:600;color:#5f6368;margin-right:2px;}',
    '.nc-sc{font-size:11px;font-weight:700;padding:5px 12px;border-radius:9999px;border:none;cursor:pointer;font-family:inherit;transition:all .15s;}',
    '.nc-sc.s1{background:#ffd6e8;color:#7a1a4a;}',
    '.nc-sc.s2{background:#ffeab6;color:#7a5200;}',
    '.nc-sc.s3{background:#dcf0eb;color:#1a5a3a;}',
    '.nc-sc.s4{background:#1a1a18;color:#fff;}',
    '.nc-sc:hover{transform:translateY(-1px);}',
    '.nc-sc.nc-sel{box-shadow:0 0 0 2.5px #1a1a18;}',
    '.nc-save-row{display:flex;align-items:center;gap:10px;}',
    '.nc-save-btn{background:#1a1a18;color:#fff;border:none;border-radius:9999px;padding:8px 22px;font-size:13px;font-weight:700;font-family:inherit;cursor:pointer;transition:opacity .2s;}',
    '.nc-save-btn:hover{opacity:.82;}',
    '.nc-flash{font-size:12px;font-weight:600;color:#1a5a3a;display:none;}',
    '.nc-flash.nc-show{display:inline;}',

    /* Trigger button on each topic */
    '.nc-btn{',
    '  background:none;border:1.5px solid transparent;border-radius:8px;cursor:pointer;',
    '  font-size:13px;padding:3px 6px;color:#bbb;',
    '  transition:all .2s;flex-shrink:0;line-height:1;',
    '  margin-left:4px;',
    '}',
    '.nc-btn:hover{background:#ffeab6;color:#7a5200;border-color:#f5dfa9;}',
    '.nc-btn.nc-active{background:#ffeab6;color:#7a5200;border-color:#f5dfa9;}',
  ].join('');

  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ─── Drawer DOM ───────────────────────────────────────── */
  var FIELDS = [
    { k:'what',       icon:'🔍', label:'What It Is',              ph:'In one sentence — define it like explaining to a junior dev...', full:false },
    { k:'why',        icon:'💡', label:'Why It Exists',           ph:'What problem was it designed to solve?',                        full:false },
    { k:'how',        icon:'⚙️', label:'How It Works',            ph:'Explain the internals step by step...',                         full:true  },
    { k:'complexity', icon:'📊', label:'Complexity / Performance', ph:'Time/space complexity, runtime cost, engine behaviour...',      full:false },
    { k:'tradeoffs',  icon:'⚖️', label:'Tradeoffs',               ph:'When NOT to use it. Gotchas. Alternatives...',                  full:false },
  ];

  var SCORES = [
    { v:1, cls:'s1', label:"Can't explain" },
    { v:2, cls:'s2', label:'Rough idea' },
    { v:3, cls:'s3', label:'Can explain' },
    { v:4, cls:'s4', label:'Nailed it ✓' },
  ];

  var overlay = document.createElement('div');
  overlay.className = 'nc-overlay';
  overlay.id = 'nc-overlay';
  overlay.innerHTML = [
    '<div class="nc-drawer" id="nc-drawer">',
    '  <div class="nc-head">',
    '    <span class="nc-head-icon">📝</span>',
    '    <div class="nc-head-title" id="nc-title">My Revision Notes</div>',
    '    <button class="nc-head-close" id="nc-close-btn">✕</button>',
    '  </div>',
    '  <div id="nc-q" class="nc-q-banner"></div>',
    '  <div class="nc-body" id="nc-body"></div>',
    '  <div class="nc-foot">',
    '    <div class="nc-rating-row">',
    '      <span class="nc-rating-lbl">Self-rating:</span>',
         SCORES.map(function(s){ return '<button class="nc-sc ' + s.cls + '" data-score="' + s.v + '">' + s.label + '</button>'; }).join(''),
    '    </div>',
    '    <div class="nc-save-row">',
    '      <button class="nc-save-btn" id="nc-save-btn">Save</button>',
    '      <span class="nc-flash" id="nc-flash">Saved!</span>',
    '    </div>',
    '  </div>',
    '</div>',
  ].join('');

  // Close on backdrop click
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) ncClose();
  });

  var _currentId = null;

  /* ─── Open ─────────────────────────────────────────────── */
  window.openNotesCard = function(topicId, topicLabel, interviewQ, interviewQSub) {
    _currentId = topicId;
    var note = getNote(topicId);

    document.getElementById('nc-title').textContent = topicLabel || topicId;

    // Optional interview question banner
    var qEl = document.getElementById('nc-q');
    if (interviewQ) {
      qEl.innerHTML = '<strong>🎤 ' + interviewQ + '</strong>' + (interviewQSub ? '<span>' + interviewQSub + '</span>' : '');
      qEl.classList.add('nc-visible');
    } else {
      qEl.classList.remove('nc-visible');
      qEl.innerHTML = '';
    }

    // Build fields grid
    var html = '<div class="nc-grid">';
    FIELDS.forEach(function(f) {
      var val = note[f.k] || '';
      html += '<div class="nc-field' + (f.full ? ' nc-full' : '') + '">';
      html += '<div class="nc-lbl"><span>' + f.icon + '</span>' + f.label + '</div>';
      html += '<textarea class="nc-ta' + (val ? ' nc-filled' : '') + '" data-field="' + f.k + '" placeholder="' + f.ph + '" rows="3">' + val + '</textarea>';
      html += '</div>';
    });
    html += '</div>';
    document.getElementById('nc-body').innerHTML = html;

    // Restore score selection
    var savedScore = note.score || 0;
    overlay.querySelectorAll('.nc-sc').forEach(function(b) {
      b.classList.toggle('nc-sel', parseInt(b.dataset.score) === savedScore);
    });

    // Textarea fill indicator
    overlay.querySelectorAll('.nc-ta').forEach(function(ta) {
      ta.addEventListener('input', function() {
        this.classList.toggle('nc-filled', this.value.length > 0);
      });
    });

    overlay.classList.add('nc-open');
    // Focus first textarea
    var first = overlay.querySelector('.nc-ta');
    if (first) setTimeout(function() { first.focus(); }, 320);
  };

  /* ─── Close ────────────────────────────────────────────── */
  function ncClose() {
    overlay.classList.remove('nc-open');
    _currentId = null;
  }

  /* ─── Save ─────────────────────────────────────────────── */
  function ncSave() {
    if (!_currentId) return;
    var data = getNote(_currentId);
    overlay.querySelectorAll('.nc-ta').forEach(function(ta) {
      data[ta.dataset.field] = ta.value;
    });
    var sel = overlay.querySelector('.nc-sc.nc-sel');
    if (sel) data.score = parseInt(sel.dataset.score);
    saveNote(_currentId, data);

    // Update trigger button visual
    var btn = document.querySelector('.nc-btn[data-ncid="' + _currentId + '"]');
    if (btn) btn.classList.add('nc-active');

    var flash = document.getElementById('nc-flash');
    flash.classList.add('nc-show');
    setTimeout(function() { flash.classList.remove('nc-show'); }, 2000);
  }

  /* ─── Attach drawer events ──────────────────────────────── */
  function attachDrawerEvents() {
    document.getElementById('nc-close-btn').addEventListener('click', ncClose);
    document.getElementById('nc-save-btn').addEventListener('click', ncSave);
    overlay.querySelectorAll('.nc-sc').forEach(function(btn) {
      btn.addEventListener('click', function() {
        overlay.querySelectorAll('.nc-sc').forEach(function(b) { b.classList.remove('nc-sel'); });
        this.classList.add('nc-sel');
      });
    });
  }

  /* ─── Inject 📝 buttons into topic/item elements ────────── */
  function makeBtn(id, label, q, qsub) {
    var active = noteHasContent(id);
    var btn = document.createElement('button');
    btn.className = 'nc-btn' + (active ? ' nc-active' : '');
    btn.dataset.ncid = id;
    btn.title = 'My revision notes';
    btn.textContent = '📝';
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      openNotesCard(id, label, q, qsub);
    });
    return btn;
  }

  function inject() {
    // ── Pattern A: PHASES journals ──────────────────────────
    // check-item with input[data-id]  (Networking, Node.js, API Design, DevOps, Security, Observability, Microservices)
    document.querySelectorAll('.check-item').forEach(function(item) {
      if (item.querySelector('.nc-btn')) return;
      var inp = item.querySelector('input[data-id]');
      if (!inp) return;
      var id = inp.dataset.id;
      if (!id) return;
      var label = (item.querySelector('label') || {}).textContent || id;
      label = label.trim();
      item.appendChild(makeBtn(id, label));
    });

    // ── Pattern B: Design Patterns & DSA ───────────────────
    // check-item with input[id^="chk-"]
    document.querySelectorAll('.check-item').forEach(function(item) {
      if (item.querySelector('.nc-btn')) return;
      var inp = item.querySelector('input[id^="chk-"]');
      if (!inp) return;
      var id = inp.id.replace('chk-', '');
      var label = (item.querySelector('label') || {}).textContent || id;
      label = label.trim();
      item.appendChild(makeBtn(id, label));
    });

    // ── Pattern C: Chapters journals ────────────────────────
    // topic-card[id^="card-"]  (OS, Concurrency, OOP, React already has notes)
    document.querySelectorAll('.topic-card[id^="card-"]').forEach(function(card) {
      if (card.querySelector('.nc-btn')) return;
      var id = card.id.replace('card-', '');
      var nameEl = card.querySelector('.topic-name');
      var label = nameEl ? nameEl.textContent.trim() : id;
      // get interview question if present
      var qEl = card.querySelector('.q-text');
      var qsubEl = card.querySelector('.q-sub');
      var q = qEl ? qEl.textContent.trim() : null;
      var qsub = qsubEl ? qsubEl.textContent.trim() : null;
      var header = card.querySelector('.topic-header') || card;
      header.appendChild(makeBtn(id, label, q, qsub));
    });

    // ── Pattern D: Database journal ─────────────────────────
    // topic-card[id^="ci_"] — notes button added via renderContent patch
    // But also catch any remaining ci_ cards that have a label we can read
    document.querySelectorAll('.topic-card[id^="ci_"]').forEach(function(card) {
      if (card.querySelector('.nc-btn')) return;
      var nameEl = card.querySelector('.topic-name');
      if (!nameEl) return;
      var label = nameEl.textContent.trim();
      // use first 40 chars lowercased as stable ID
      var id = pageSlug() + '-' + label.slice(0, 40).toLowerCase().replace(/[^a-z0-9]+/g, '-');
      var header = card.querySelector('.topic-header') || card;
      header.appendChild(makeBtn(id, label));
    });

  }

  /* ─── Boot ──────────────────────────────────────────────── */
  function boot() {
    document.body.appendChild(overlay);
    attachDrawerEvents();

    // Keyboard: Escape closes
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') ncClose();
    });

    // Initial inject + re-inject on any DOM mutation (handles SPA navigation inside journals)
    inject();
    var obs = new MutationObserver(function() {
      clearTimeout(obs._t);
      obs._t = setTimeout(inject, 100);
    });
    obs.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
