import re
import sys
import shutil

# We will read from the pristine 'frontend-roadmap 2.html'
input_file = '/Users/mayankthakur/Documents/open-source/Personal/learning📚/Interview-Prep/frontend-roadmap 2.html'
with open(input_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Add Google Fonts
fonts = """<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet">
<title>"""

# Fix: Only replace the first <title> tag in the head!
content = re.sub(r'<title>', fonts, content, count=1)

# Replace :root variables
new_root = """:root {
    --bg-main: #f0f2f5;
    --surface: #ffffff;
    --surface2: #f1f0ec;
    --border: rgba(0,0,0,0.1);
    --border2: rgba(0,0,0,0.18);
    --text: #1a1a18;
    --text2: #5f5e5a;
    --text3: #888780;
    
    --pastel-yellow: #ffeab6;
    --pastel-mint: #dcf0eb;
    --pastel-purple: #e6daff;
    --pastel-pink: #ffd6e8;
    
    --accent-black: #000000;
    --accent-white: #ffffff;
    
    --radius: 24px;
    --radius-sm: 16px;
    --radius-pill: 9999px;
    --shadow: 0 4px 20px rgba(0,0,0,0.04);
    
    --font-sans: 'Outfit', 'Inter', sans-serif;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      /* Keep light theme structure mostly, or disable dark mode for this specific pastel vibe */
      --bg-main: #f0f2f5; --surface: #ffffff; --surface2: #f1f0ec;
      --border: rgba(0,0,0,0.1); --border2: rgba(0,0,0,0.18);
      --text: #1a1a18; --text2: #5f5e5a; --text3: #888780;
    }
  }"""
content = re.sub(r':root\s*\{[^}]+\}\s*@media\s*\(prefers-color-scheme:\s*dark\)\s*\{\s*:root\s*\{[^}]+\}\s*\}', new_root, content, flags=re.MULTILINE|re.DOTALL)

# Replace body styles
new_body = """html { background-color: #e2e8f0; }
  body { 
    font-family: var(--font-sans); 
    background: var(--bg-main); 
    color: var(--text); 
    min-height: 100vh; 
    padding: 0 0 60px;
    max-width: 900px;
    margin: 0 auto;
    box-shadow: 0 0 40px rgba(0,0,0,0.05);
    border-radius: 0 0 40px 40px;
  }"""
content = re.sub(r'body\s*\{\s*font-family:[^}]+}', new_body, content)

# Change .progress-bar-fill and progress percent text
content = re.sub(r'background:\s*#534AB7;', 'background: var(--accent-black);', content)
content = re.sub(r'color:\s*#534AB7;', 'color: var(--accent-black);', content)

# Topic checked
content = re.sub(r'\.topic-item\.done\s*\{\s*background:\s*#[0-9a-fA-F]+;\s*border-color:\s*#[0-9a-fA-F]+;\s*\}', 
                 '.topic-item.done { background: var(--pastel-mint); border-color: var(--border2); }', content)
content = re.sub(r'\.topic-item\.done\s*\.topic-check\s*\{\s*background:\s*#[0-9a-fA-F]+;\s*border-color:\s*#[0-9a-fA-F]+;\s*\}',
                 '.topic-item.done .topic-check { background: var(--accent-black); border-color: var(--accent-black); }', content)

# Remove the dark mode overrides for topic-item
content = re.sub(r'@media[^{]+\{\s*\.topic-item\.done[^{]+\{[^}]+\}\s*\}', '', content)

# Replace Mark Done Button colors
content = re.sub(r'border:\s*1\.5px\s*solid\s*#534AB7;\s*background:\s*none;\s*color:\s*#534AB7;',
                 'border: 1.5px solid var(--accent-black); background: none; color: var(--accent-black); border-radius: var(--radius-pill);', content)
content = re.sub(r'\.mark-done-btn:hover\s*\{\s*background:\s*#534AB7;\s*color:\s*#fff;\s*\}',
                 '.mark-done-btn:hover { background: var(--accent-black); color: var(--accent-white); }', content)
content = re.sub(r'\.mark-done-btn\.already-done\s*\{\s*background:\s*#534AB7;\s*color:\s*#fff;\s*\}',
                 '.mark-done-btn.already-done { background: var(--accent-black); color: var(--accent-white); }', content)
content = re.sub(r'\.mark-done-btn\.already-done:hover\s*\{\s*background:\s*#3C3489;\s*\}',
                 '.mark-done-btn.already-done:hover { background: #333; }', content)

# Replace Reset Button colors
content = re.sub(r'\.reset-btn\s*\{\s*(.*?)\}',
                 r'.reset-btn { \1 border-radius: var(--radius-pill); background: var(--accent-black); color: var(--accent-white); border: none; padding: 10px 24px; font-weight: 600; font-family: var(--font-sans); }', content)
content = re.sub(r'\.reset-btn:hover\s*\{\s*(.*?)\}',
                 r'.reset-btn:hover { background: #333; color: white; border-color: transparent; }', content)

# ROADMAP color mappings
roadmap_colors = [
    'color:"#000", bg:"var(--pastel-mint)", darkBg:"var(--pastel-mint)"',
    'color:"#000", bg:"var(--pastel-yellow)", darkBg:"var(--pastel-yellow)"',
    'color:"#000", bg:"var(--pastel-purple)", darkBg:"var(--pastel-purple)"',
    'color:"#000", bg:"var(--pastel-pink)", darkBg:"var(--pastel-pink)"',
    'color:"#000", bg:"var(--pastel-mint)", darkBg:"var(--pastel-mint)"',
    'color:"#000", bg:"var(--pastel-yellow)", darkBg:"var(--pastel-yellow)"',
    'color:"#000", bg:"var(--pastel-purple)", darkBg:"var(--pastel-purple)"',
    'color:"#000", bg:"var(--pastel-pink)", darkBg:"var(--pastel-pink)"',
    'color:"#000", bg:"var(--pastel-mint)", darkBg:"var(--pastel-mint)"',
    'color:"#000", bg:"var(--pastel-yellow)", darkBg:"var(--pastel-yellow)"',
]

def replace_color(match):
    replace_color.i += 1
    return roadmap_colors[replace_color.i % len(roadmap_colors)]
replace_color.i = -1

content = re.sub(r'color:"#[0-9a-fA-F]+",\s*bg:"#[0-9a-fA-F]+",\s*darkBg:"#[0-9a-fA-F]+"', replace_color, content)

# Write back to both files so they are fixed and updated
output_files = [
    '/Users/mayankthakur/Documents/open-source/Personal/learning📚/Interview-Prep/frontend-roadmap.html',
    '/Users/mayankthakur/Documents/open-source/Personal/learning📚/Interview-Prep/frontend-roadmap 2.html'
]

for out_f in output_files:
    with open(out_f, 'w', encoding='utf-8') as f:
        f.write(content)

print("Fixed!")
