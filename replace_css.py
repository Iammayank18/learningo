import re

file_path = '/Users/mayankthakur/Documents/open-source/Personal/learning📚/Interview-Prep/Mayank_DSA_Journal.html'
with open(file_path, 'r') as f:
    content = f.read()

new_css = """  <style>
    :root {
      --bg-main: #f0f2f5;
      --bg-card: #ffffff;
      --text-primary: #000000;
      --text-secondary: #5f6368;
      --text-muted: #9aa0a6;
      --accent-black: #000000;
      --accent-white: #ffffff;
      
      /* Pastel Palette */
      --pastel-yellow: #ffeab6;
      --pastel-yellow-hover: #f5dfa9;
      --pastel-mint: #dcf0eb;
      --pastel-mint-hover: #cbe3dd;
      --pastel-purple: #e6daff;
      --pastel-purple-hover: #d8c9fa;
      --pastel-pink: #ffd6e8;
      
      --border-radius-lg: 24px;
      --border-radius-md: 16px;
      --border-radius-pill: 9999px;
      
      --font-sans: 'Outfit', 'Inter', sans-serif;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background: var(--bg-main);
      font-family: var(--font-sans);
      color: var(--text-primary);
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      line-height: 1.5;
    }

    .cover {
      background: var(--bg-main);
      color: var(--text-primary);
      padding: 4rem 2.5rem 2rem;
      position: relative;
      text-align: left;
    }

    .cover-subtitle {
      font-size: 14px;
      letter-spacing: 0.05em;
      color: var(--text-secondary);
      font-weight: 500;
      margin-bottom: 0.5rem;
    }

    .cover-title {
      font-size: 40px;
      font-weight: 700;
      letter-spacing: -0.02em;
      margin-bottom: 0.5rem;
      color: var(--text-primary);
    }

    .cover-name {
      font-size: 16px;
      color: var(--text-secondary);
      font-weight: 500;
      margin-bottom: 2rem;
    }

    .stats-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.25rem;
      margin-bottom: 2rem;
    }

    .stat {
      background: var(--bg-card);
      padding: 1.5rem;
      border-radius: var(--border-radius-lg);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
    }

    .stat-val {
      font-size: 36px;
      font-weight: 600;
      color: var(--text-primary);
      line-height: 1.1;
      margin-bottom: 8px;
    }

    .stat-label {
      font-size: 14px;
      color: var(--text-secondary);
      font-weight: 500;
    }

    .progress-track {
      height: 8px;
      background: var(--bg-main);
      border-radius: var(--border-radius-pill);
      margin-bottom: 0.75rem;
      overflow: hidden;
      position: relative;
    }

    .progress-fill {
      height: 100%;
      background: var(--accent-black);
      border-radius: var(--border-radius-pill);
      transition: width 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .progress-label {
      font-size: 13px;
      color: var(--text-secondary);
      font-weight: 500;
    }

    .streak-box {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--pastel-yellow);
      padding: 8px 16px;
      border-radius: var(--border-radius-pill);
      margin-top: 1.5rem;
    }

    .streak-flame {
      font-size: 18px;
    }

    .streak-text {
      font-size: 14px;
      color: var(--accent-black);
      font-weight: 600;
    }

    .today-box {
      background: var(--pastel-mint);
      padding: 1.5rem;
      border-radius: var(--border-radius-lg);
      margin-bottom: 2rem;
    }

    .today-label {
      font-size: 13px;
      color: var(--accent-black);
      font-weight: 600;
      margin-bottom: 0.5rem;
      opacity: 0.8;
    }

    .today-text {
      font-size: 16px;
      color: var(--accent-black);
      line-height: 1.5;
      font-weight: 500;
    }

    .phase-nav {
      display: flex;
      gap: 0.75rem;
      padding: 1rem 2.5rem;
      background: var(--bg-main);
      overflow-x: auto;
      justify-content: flex-start;
      scrollbar-width: none;
    }
    
    .phase-nav::-webkit-scrollbar {
      display: none;
    }

    .phase-tab {
      font-size: 14px;
      font-weight: 500;
      padding: 10px 20px;
      cursor: pointer;
      color: var(--text-secondary);
      background: var(--bg-card);
      border-radius: var(--border-radius-pill);
      border: 1px solid transparent;
      white-space: nowrap;
      transition: all 0.2s ease;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
    }

    .phase-tab.active {
      color: var(--accent-white);
      background: var(--accent-black);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .phase-tab.done {
      color: var(--text-primary);
      background: var(--pastel-mint);
    }
    
    .phase-tab.active.done {
      color: var(--accent-white);
      background: var(--accent-black);
    }

    .phase-tab:hover:not(.active) {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    .content {
      padding: 2rem 2.5rem;
      max-width: 900px;
      margin-inline: auto;
    }

    .chapter-head {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 1.5rem;
      background: var(--pastel-purple);
      padding: 2rem;
      border-radius: var(--border-radius-lg);
    }

    .chapter-num {
      font-size: 14px;
      color: var(--accent-black);
      font-weight: 600;
      margin-bottom: 0.5rem;
      opacity: 0.8;
    }

    .chapter-title {
      font-size: 32px;
      font-weight: 600;
      color: var(--accent-black);
      letter-spacing: -0.01em;
    }

    .chapter-meta {
      text-align: right;
    }

    .chapter-week {
      font-size: 16px;
      color: var(--accent-black);
      font-weight: 600;
    }

    .chapter-time {
      font-size: 14px;
      color: var(--accent-black);
      opacity: 0.8;
      margin-top: 4px;
      font-weight: 500;
    }

    .phase-progress-bar {
      height: 6px;
      background: var(--bg-card);
      border-radius: var(--border-radius-pill);
      margin-bottom: 2.5rem;
      overflow: hidden;
    }

    .phase-progress-fill {
      height: 100%;
      background: var(--accent-black);
      transition: width 0.4s ease;
      border-radius: var(--border-radius-pill);
    }

    .section-head {
      font-size: 20px;
      color: var(--text-primary);
      font-weight: 600;
      margin-bottom: 1.25rem;
      margin-top: 2.5rem;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .section-head::before {
      content: '';
      display: inline-block;
      width: 12px;
      height: 12px;
      background: var(--pastel-yellow);
      border-radius: 50%;
    }

    .check-item {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 16px;
      background: var(--bg-card);
      border-radius: var(--border-radius-md);
      margin-bottom: 12px;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
    }

    .check-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    .check-item input[type=checkbox] {
      margin-top: 4px;
      accent-color: var(--accent-black);
      width: 20px;
      height: 20px;
      cursor: pointer;
      flex-shrink: 0;
      border-radius: 4px;
    }

    .check-item label {
      font-size: 15px;
      color: var(--text-primary);
      cursor: pointer;
      line-height: 1.5;
      flex: 1;
      font-weight: 500;
    }

    .check-item.checked {
      background: var(--pastel-mint);
    }

    .check-item.checked label {
      color: var(--text-secondary);
      text-decoration: line-through;
    }

    .problem-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      background: var(--bg-card);
      border-radius: var(--border-radius-md);
      margin-bottom: 12px;
      transition: all 0.2s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
    }

    .problem-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    .problem-name {
      font-size: 15px;
      font-weight: 500;
      flex: 1;
      color: var(--text-primary);
    }

    .problem-item.state-clean {
      background: var(--pastel-mint);
      box-shadow: none;
    }

    .problem-item.state-clean .problem-name {
      color: var(--text-secondary);
      text-decoration: line-through;
    }

    .problem-item.state-hints {
      background: var(--pastel-yellow);
      box-shadow: none;
    }

    .problem-item.state-hints .problem-name {
      color: var(--text-secondary);
      text-decoration: line-through;
    }

    .solve-btns {
      display: flex;
      gap: 8px;
      flex-shrink: 0;
    }

    .btn-clean,
    .btn-hints {
      font-size: 12px;
      font-weight: 600;
      padding: 8px 16px;
      border-radius: var(--border-radius-pill);
      border: 1px solid transparent;
      cursor: pointer;
      background: var(--bg-main);
      transition: all 0.2s;
      color: var(--text-primary);
      font-family: inherit;
    }

    .btn-clean:hover {
      background: var(--pastel-mint-hover);
    }

    .btn-clean.active {
      background: var(--accent-black);
      color: var(--accent-white);
    }

    .btn-hints:hover {
      background: var(--pastel-yellow-hover);
    }

    .btn-hints.active {
      background: var(--accent-black);
      color: var(--accent-white);
    }

    .diff-badge {
      font-size: 11px;
      font-weight: 600;
      padding: 6px 12px;
      border-radius: var(--border-radius-pill);
    }

    .diff-easy {
      background: var(--pastel-mint);
      color: var(--accent-black);
    }

    .diff-medium {
      background: var(--pastel-yellow);
      color: var(--accent-black);
    }

    .diff-hard {
      background: var(--pastel-pink);
      color: var(--accent-black);
    }

    .problem-link {
      font-size: 13px;
      color: var(--accent-black);
      text-decoration: none;
      font-weight: 500;
      padding: 6px 12px;
      border-radius: var(--border-radius-pill);
      background: var(--pastel-purple);
      transition: all 0.2s;
    }

    .problem-link:hover {
      background: var(--pastel-purple-hover);
      transform: translateY(-1px);
    }

    .pattern-tag {
      font-size: 12px;
      font-weight: 500;
      padding: 6px 12px;
      border-radius: var(--border-radius-pill);
      background: var(--bg-main);
      color: var(--text-secondary);
      white-space: nowrap;
    }

    .move-on-box, .stuck-box {
      background: var(--bg-card);
      padding: 24px;
      margin-top: 2rem;
      border-radius: var(--border-radius-lg);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .move-on-box {
      background: var(--pastel-pink);
    }

    .stuck-box {
      background: var(--pastel-yellow);
    }

    .move-on-label, .stuck-label {
      font-size: 14px;
      color: var(--accent-black);
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .move-on-text, .stuck-text {
      font-size: 15px;
      color: var(--accent-black);
      line-height: 1.6;
      font-weight: 500;
    }

    .complete-banner {
      background: var(--accent-black);
      color: var(--accent-white);
      padding: 16px 24px;
      border-radius: var(--border-radius-lg);
      text-align: center;
      margin-top: 2rem;
      font-weight: 600;
      font-size: 16px;
      display: none;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .quote {
      text-align: center;
      padding: 4rem 2.5rem 3rem;
      font-size: 18px;
      color: var(--text-primary);
      font-weight: 500;
      line-height: 1.6;
    }

    .quote cite {
      display: block;
      font-size: 14px;
      font-style: normal;
      color: var(--text-secondary);
      margin-top: 1rem;
      font-weight: 600;
    }
    
    @media (max-width: 640px) {
      .cover { padding: 3rem 1.5rem 2rem; }
      .content { padding: 2rem 1.5rem; }
      .problem-item { flex-wrap: wrap; }
      .solve-btns { width: 100%; justify-content: flex-end; margin-top: 12px; }
      .chapter-head { flex-direction: column; align-items: flex-start; gap: 1rem; }
      .chapter-meta { text-align: left; }
    }
  </style>"""

new_content = re.sub(r'<style>.*?</style>', new_css, content, flags=re.DOTALL)

with open(file_path, 'w') as f:
    f.write(new_content)

print("CSS updated successfully!")
