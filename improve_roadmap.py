import re

input_file = '/Users/mayankthakur/Documents/open-source/Personal/learning📚/Interview-Prep/frontend-roadmap 2.html'
with open(input_file, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update .hero
new_hero = """.hero {
      background: linear-gradient(135deg, var(--pastel-mint) 0%, var(--surface) 35%, var(--surface) 65%, var(--pastel-pink) 100%);
      border-bottom: 0.5px solid var(--border);
      padding: 44px 32px 32px;
      border-radius: 40px 40px 0 0;
    }"""
content = re.sub(r'\.hero\s*\{\s*background:\s*var\(--surface\);\s*border-bottom:\s*0\.5px\s*solid\s*var\(--border\);\s*padding:\s*32px\s*28px\s*24px;\s*\}', new_hero, content)

# 2. Update .hero h1
new_hero_h1 = """.hero h1 {
      font-size: 28px;
      font-weight: 800;
      color: var(--text);
      letter-spacing: -0.02em;
    }"""
content = re.sub(r'\.hero\s*h1\s*\{\s*font-size:\s*22px;\s*font-weight:\s*600;\s*color:\s*var\(--text\);\s*\}', new_hero_h1, content)

# 3. Update .phase-card
new_phase_card = """.phase-card {
      background: var(--surface);
      border: 0.5px solid var(--border);
      border-radius: var(--radius);
      margin-bottom: 16px;
      overflow: hidden;
      box-shadow: var(--shadow);
      transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .phase-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px rgba(0,0,0,0.06);
    }"""
content = re.sub(r'\.phase-card\s*\{\s*background:\s*var\(--surface\);\s*border:\s*0\.5px\s*solid\s*var\(--border\);\s*border-radius:\s*var\(--radius\);\s*margin-bottom:\s*16px;\s*overflow:\s*hidden;\s*box-shadow:\s*var\(--shadow\);\s*\}', new_phase_card, content)

# 4. Update .stat-card
new_stat_card = """.stat-card {
      border-radius: var(--radius-sm);
      padding: 16px 14px;
      text-align: center;
      box-shadow: var(--shadow);
      transition: transform 0.2s ease;
      background: var(--surface2);
    }
    .stat-card:hover {
      transform: translateY(-2px);
    }
    .stats-row .stat-card:nth-child(1) { background: var(--pastel-mint); }
    .stats-row .stat-card:nth-child(2) { background: var(--pastel-yellow); }
    .stats-row .stat-card:nth-child(3) { background: var(--pastel-purple); }
    .stats-row .stat-card:nth-child(4) { background: var(--pastel-pink); }"""
content = re.sub(r'\.stat-card\s*\{\s*background:\s*var\(--surface2\);\s*border-radius:\s*var\(--radius-sm\);\s*padding:\s*12px\s*14px;\s*text-align:\s*center;\s*\}', new_stat_card, content)

# 5. Update .qa-modal-hdr
new_qa_modal_hdr = """.qa-modal-hdr {
      padding: 18px 22px 14px;
      border-bottom: 0.5px solid var(--border);
      display: flex;
      align-items: center;
      gap: 12px;
      position: sticky;
      top: 0;
      background: var(--pastel-mint);
      border-radius: var(--radius) var(--radius) 0 0;
      z-index: 1;
    }"""
content = re.sub(r'\.qa-modal-hdr\s*\{\s*padding:\s*18px\s*22px\s*14px;\s*border-bottom:\s*0\.5px\s*solid\s*var\(--border\);\s*display:\s*flex;\s*align-items:\s*center;\s*gap:\s*12px;\s*position:\s*sticky;\s*top:\s*0;\s*background:\s*var\(--surface\);\s*border-radius:\s*var\(--radius\)\s*var\(--radius\)\s*0\s*0;\s*z-index:\s*1;\s*\}', new_qa_modal_hdr, content)

# 6. Update .qa-modal
new_qa_modal = """.qa-modal {
      background: var(--surface);
      border: 0.5px solid var(--border2);
      border-radius: var(--radius);
      width: 100%;
      max-width: 720px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
      transform: translateY(24px) scale(0.98);
      transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
    }"""
content = re.sub(r'\.qa-modal\s*\{\s*background:\s*var\(--surface\);\s*border:\s*0\.5px\s*solid\s*var\(--border2\);\s*border-radius:\s*var\(--radius\);\s*width:\s*100%;\s*max-width:\s*720px;\s*box-shadow:\s*0\s*12px\s*48px\s*rgba\(0,\s*0,\s*0,\s*0\.22\);\s*transform:\s*translateY\(18px\);\s*transition:\s*transform\s*0\.26s\s*cubic-bezier\(0\.4,\s*0,\s*0\.2,\s*1\);\s*\}', new_qa_modal, content)

new_qa_modal_open = """.qa-modal-overlay.open .qa-modal {
      transform: translateY(0) scale(1);
    }"""
content = re.sub(r'\.qa-modal-overlay\.open\s*\.qa-modal\s*\{\s*transform:\s*translateY\(0\);\s*\}', new_qa_modal_open, content)

with open(input_file, 'w', encoding='utf-8') as f:
    f.write(content)

with open('/Users/mayankthakur/Documents/open-source/Personal/learning📚/Interview-Prep/frontend-roadmap.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
