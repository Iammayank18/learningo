import re

file_path = '/Users/mayankthakur/Documents/open-source/Personal/learning📚/Interview-Prep/frontend-roadmap.html'

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. CSS to add
    new_css = """
    .stat-val {
      font-size: 36px;
      font-weight: 600;
      color: var(--text);
      line-height: 1.1;
      margin-bottom: 8px;
    }

    .progress-track {
      height: 8px;
      background: var(--surface2);
      border-radius: 4px;
      margin-bottom: 0.75rem;
      overflow: hidden;
      position: relative;
    }

    .progress-fill {
      height: 100%;
      background: var(--text);
      border-radius: 4px;
      transition: width 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .progress-label {
      font-size: 13px;
      color: var(--text2);
      font-weight: 500;
    }

    .streak-box {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #FFE8A1;
      padding: 8px 16px;
      border-radius: 100px;
      margin-top: 1.5rem;
    }

    .streak-flame {
      font-size: 18px;
    }

    .streak-text {
      font-size: 14px;
      color: var(--text);
      font-weight: 600;
    }

    .today-box {
      background: #E1F5EE;
      padding: 1.5rem;
      border-radius: var(--radius);
      margin-bottom: 2rem;
      margin-inline: 16px;
    }

    .today-label {
      font-size: 13px;
      color: var(--text);
      font-weight: 600;
      margin-bottom: 0.5rem;
      opacity: 0.8;
    }

    .today-text {
      font-size: 16px;
      color: var(--text);
      line-height: 1.5;
      font-weight: 500;
    }
"""
    # Replace just the stat-val to insert new CSS
    stat_val_target = """    .stat-val {
      font-size: 36px;
      font-weight: 600;
      color: var(--text);
      line-height: 1.1;
      margin-bottom: 8px;
    }"""
    if ".progress-track" not in content:
        content = content.replace(stat_val_target, new_css.strip())

    # 2. HTML to add
    html_target = """      <!-- Hidden elements for JS compatibility -->
      <div style="display:none;">
        <div id="overall-bar"></div>
        <span id="overall-label"></span>
        <div id="s-streak"></div>
      </div>
    </div>
  </div>
  </div>
  </div>"""

    new_html = """      <div class="progress-track">
        <div class="progress-fill" id="overall-bar" style="width:0%"></div>
      </div>
      <div class="progress-label" id="overall-label">0 of 0 topics complete</div>

      <div class="streak-box">
        <span class="streak-flame">🔥</span>
        <span class="streak-text" id="s-streak">0 day streak — start today</span>
      </div>
    </div>
  </div>

  <div class="today-box">
    <div class="today-label">Today's focus</div>
    <div class="today-text" id="today-focus">Phase 1 — Foundations. Continue where you left off below.</div>
  </div>"""

    if 'class="streak-box"' not in content:
        content = content.replace(html_target, new_html)

    # 3. JS to add
    js_target = '      document.getElementById("s-streak").textContent = todayData.date === today() ? todayData.count : 0;'
    new_js = """      const currentStreak = todayData.date === today() ? todayData.count : 0;
      const streakText = currentStreak > 0 ? currentStreak + " day streak — keep going" : "0 day streak — start today";
      document.getElementById("s-streak").textContent = streakText;
      
      // Update today's focus text
      let focusText = "Phase 1 — Foundations. Continue where you left off below.";
      if (pct > 0 && pct < 100) {
        focusText = "Great progress! You are currently at " + pct + "% completion. Keep it up!";
      } else if (pct === 100) {
        focusText = "Incredible! You have completed the entire roadmap. You are ready for FAANG!";
      }
      const focusEl = document.getElementById("today-focus");
      if (focusEl) focusEl.textContent = focusText;"""

    if "streakText =" not in content:
        content = content.replace(js_target, new_js)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print("Successfully updated frontend-roadmap.html!")
except Exception as e:
    print(f"Error: {e}")
