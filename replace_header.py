import re

input_files = [
    '/Users/mayankthakur/Documents/open-source/Personal/learning📚/Interview-Prep/frontend-roadmap.html',
    '/Users/mayankthakur/Documents/open-source/Personal/learning📚/Interview-Prep/frontend-roadmap 2.html'
]

css_replacement = """.cover {
      background: var(--bg-main);
      color: var(--text);
      padding: 4rem 2.5rem 2rem;
      position: relative;
      text-align: left;
    }
    .cover-subtitle {
      font-size: 14px;
      letter-spacing: 0.05em;
      color: var(--text2);
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    .cover-title {
      font-size: 40px;
      font-weight: 700;
      letter-spacing: -0.02em;
      margin-bottom: 0.5rem;
      color: var(--text);
    }
    .cover-name {
      font-size: 16px;
      color: var(--text2);
      font-weight: 500;
      margin-bottom: 2rem;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .badge-faang {
      background: #EEEDFE;
      color: #3C3489;
      font-size: 14px;
      font-weight: 500;
      padding: 2px 6px;
      border-radius: 6px;
      white-space: nowrap;
    }
    .stats-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.25rem;
      margin-bottom: 2rem;
    }
    .stat {
      background: var(--surface);
      padding: 1.5rem;
      border-radius: var(--radius);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
    }
    .stat-val {
      font-size: 36px;
      font-weight: 600;
      color: var(--text);
      line-height: 1.1;
      margin-bottom: 8px;
    }
    .stat-label {
      font-size: 14px;
      color: var(--text2);
      font-weight: 500;
    }
    .stat-label span {
      font-size: 11px;
      color: var(--text3);
      font-weight: 400;
    }"""

html_replacement = """<div class="cover">
    <div style="max-width:860px; margin:0 auto;">
      <div class="cover-subtitle">Personal study journal</div>
      <div class="cover-title">Frontend Roadmap</div>
      <div class="cover-name">
        Mayank Thakur &middot; <span class="badge-faang">FAANG</span> Prep &middot; 20 Weeks
      </div>

      <div class="stats-row" id="stats-row">
        <div class="stat">
          <div class="stat-val" id="overall-pct">0%</div>
          <div class="stat-label">Complete</div>
        </div>
        <div class="stat">
          <div class="stat-val" id="s-done">0</div>
          <div class="stat-label">Problems solved<br><span style="font-size:11px;color:var(--text3);font-weight:400"><span id="s-left">0</span> remaining</span></div>
        </div>
        <div class="stat">
          <div class="stat-val" id="s-phases">0</div>
          <div class="stat-label">Current phase</div>
        </div>
      </div>
      <!-- Hidden elements for JS compatibility -->
      <div style="display:none;">
        <div id="overall-bar"></div>
        <span id="overall-label"></span>
        <div id="s-streak"></div>
      </div>
    </div>
  </div>"""

for filepath in input_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace CSS
    css_pattern = re.compile(r'\.hero\s*\{.*?\.stat-label\s*\{[^}]+\}', re.DOTALL)
    content = css_pattern.sub(css_replacement, content)

    # Replace HTML
    html_pattern = re.compile(r'<div class="hero">.*?</div>\s*</div>\s*</div>', re.DOTALL)
    content = html_pattern.sub(html_replacement, content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Header replaced")
