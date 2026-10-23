import re

input_files = [
    '/Users/mayankthakur/Documents/open-source/Personal/learning📚/Interview-Prep/frontend-roadmap.html',
    '/Users/mayankthakur/Documents/open-source/Personal/learning📚/Interview-Prep/frontend-roadmap 2.html'
]

for filepath in input_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Revert .hero
    old_hero = """.hero {
      background: var(--surface);
      border-bottom: 0.5px solid var(--border);
      padding: 32px 28px 24px;
    }"""
    content = re.sub(r'\.hero\s*\{\s*background:\s*linear-gradient[^}]+\}\s*', old_hero + '\n', content)

    # 2. Revert .hero h1
    old_hero_h1 = """.hero h1 {
      font-size: 22px;
      font-weight: 600;
      color: var(--text);
    }"""
    content = re.sub(r'\.hero\s*h1\s*\{\s*font-size:\s*28px;\s*font-weight:\s*800;\s*color:\s*var\(--text\);\s*letter-spacing:\s*-0\.02em;\s*\}', old_hero_h1, content)

    # 3. Revert .phase-card
    old_phase_card = """.phase-card {
      background: var(--surface);
      border: 0.5px solid var(--border);
      border-radius: var(--radius);
      margin-bottom: 16px;
      overflow: hidden;
      box-shadow: var(--shadow);
    }"""
    content = re.sub(r'\.phase-card\s*\{\s*background:\s*var\(--surface\);\s*border:\s*0\.5px\s*solid\s*var\(--border\);\s*border-radius:\s*var\(--radius\);\s*margin-bottom:\s*16px;\s*overflow:\s*hidden;\s*box-shadow:\s*var\(--shadow\);\s*transition:\s*[^}]+\}\s*\.phase-card:hover\s*\{\s*transform:\s*translateY\(-4px\);\s*box-shadow:\s*[^}]+\}', old_phase_card, content)

    # 4. Revert .stat-card
    old_stat_card = """.stat-card {
      background: var(--surface2);
      border-radius: var(--radius-sm);
      padding: 12px 14px;
      text-align: center;
    }"""
    content = re.sub(r'\.stat-card\s*\{\s*border-radius:\s*var\(--radius-sm\);\s*padding:\s*16px\s*14px;\s*text-align:\s*center;\s*box-shadow:\s*var\(--shadow\);\s*transition:\s*transform\s*0\.2s\s*ease;\s*background:\s*var\(--surface2\);\s*\}\s*\.stat-card:hover\s*\{\s*transform:\s*translateY\(-2px\);\s*\}\s*\.stats-row\s*\.stat-card:nth-child\(1\)\s*\{\s*background:\s*var\(--pastel-mint\);\s*\}\s*\.stats-row\s*\.stat-card:nth-child\(2\)\s*\{\s*background:\s*var\(--pastel-yellow\);\s*\}\s*\.stats-row\s*\.stat-card:nth-child\(3\)\s*\{\s*background:\s*var\(--pastel-purple\);\s*\}\s*\.stats-row\s*\.stat-card:nth-child\(4\)\s*\{\s*background:\s*var\(--pastel-pink\);\s*\}', old_stat_card, content)

    # 5. Revert .qa-modal-hdr
    old_qa_modal_hdr = """.qa-modal-hdr {
      padding: 18px 22px 14px;
      border-bottom: 0.5px solid var(--border);
      display: flex;
      align-items: center;
      gap: 12px;
      position: sticky;
      top: 0;
      background: var(--surface);
      border-radius: var(--radius) var(--radius) 0 0;
      z-index: 1;
    }"""
    content = re.sub(r'\.qa-modal-hdr\s*\{\s*padding:\s*18px\s*22px\s*14px;\s*border-bottom:\s*0\.5px\s*solid\s*var\(--border\);\s*display:\s*flex;\s*align-items:\s*center;\s*gap:\s*12px;\s*position:\s*sticky;\s*top:\s*0;\s*background:\s*var\(--pastel-mint\);\s*border-radius:\s*var\(--radius\)\s*var\(--radius\)\s*0\s*0;\s*z-index:\s*1;\s*\}', old_qa_modal_hdr, content)

    # 6. Revert .qa-modal
    old_qa_modal = """.qa-modal {
      background: var(--surface);
      border: 0.5px solid var(--border2);
      border-radius: var(--radius);
      width: 100%;
      max-width: 720px;
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.22);
      transform: translateY(18px);
      transition: transform 0.26s cubic-bezier(0.4, 0, 0.2, 1);
    }"""
    content = re.sub(r'\.qa-modal\s*\{\s*background:\s*var\(--surface\);\s*border:\s*0\.5px\s*solid\s*var\(--border2\);\s*border-radius:\s*var\(--radius\);\s*width:\s*100%;\s*max-width:\s*720px;\s*box-shadow:\s*0\s*20px\s*60px\s*rgba\(0,\s*0,\s*0,\s*0\.15\);\s*transform:\s*translateY\(24px\)\s*scale\(0\.98\);\s*transition:\s*transform\s*0\.35s\s*cubic-bezier\(0\.34,\s*1\.56,\s*0\.64,\s*1\);\s*\}', old_qa_modal, content)

    # 7. Revert .qa-modal-overlay.open .qa-modal
    old_qa_modal_open = """.qa-modal-overlay.open .qa-modal {
      transform: translateY(0);
    }"""
    content = re.sub(r'\.qa-modal-overlay\.open\s*\.qa-modal\s*\{\s*transform:\s*translateY\(0\)\s*scale\(1\);\s*\}', old_qa_modal_open, content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Undone")
