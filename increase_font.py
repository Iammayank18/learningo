import re

input_files = [
    '/Users/mayankthakur/Documents/open-source/Personal/learning📚/Interview-Prep/frontend-roadmap.html',
    '/Users/mayankthakur/Documents/open-source/Personal/learning📚/Interview-Prep/frontend-roadmap 2.html'
]

replacements = [
    (r'(\.phase-title\s*\{[^}]*?font-size:\s*)15px', r'\g<1>17px'),
    (r'(\.phase-subtitle\s*\{[^}]*?font-size:\s*)12px', r'\g<1>13px'),
    (r'(\.topic-section-title\s*\{[^}]*?font-size:\s*)11px', r'\g<1>13px'),
    (r'(\.topic-name\s*\{[^}]*?font-size:\s*)13px', r'\g<1>15px'),
    (r'(\.topic-desc\s*\{[^}]*?font-size:\s*)11px', r'\g<1>13px'),
    (r'(\.faang-tag\s*\{[^}]*?font-size:\s*)10px', r'\g<1>11px'),
    (r'(\.info-btn\s*\{[^}]*?width:\s*)20px([^}]*?height:\s*)20px([^}]*?font-size:\s*)11px', r'\g<1>24px\g<2>24px\g<3>13px'),
    (r'(\.resource-link\s*\{[^}]*?font-size:\s*)11px', r'\g<1>13px'),
    (r'(\.tip-bar\s*\{[^}]*?font-size:\s*)12px', r'\g<1>14px'),
    (r'(\.sidebar-title\s*\{[^}]*?font-size:\s*)15px', r'\g<1>17px'),
    (r'(\.sidebar-phase\s*\{[^}]*?font-size:\s*)11px', r'\g<1>13px'),
    (r'(\.info-block-text\s*\{[^}]*?font-size:\s*)13px', r'\g<1>15px'),
    (r'(\.key-point\s*\{[^}]*?font-size:\s*)12\.5px', r'\g<1>14px')
]

for filepath in input_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    for pattern, repl in replacements:
        content = re.sub(pattern, repl, content, flags=re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Font sizes increased")
