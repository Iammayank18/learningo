files = [
    '/Users/mayankthakur/Documents/open-source/Personal/learning📚/Interview-Prep/frontend-roadmap.html',
    '/Users/mayankthakur/Documents/open-source/Personal/learning📚/Interview-Prep/frontend-roadmap 2.html'
]

topics_p2_target = '              { id: "j6", name: "Modules (ESM/CJS)", desc: "import/export, dynamic import, tree shaking" },'
topics_p2_replace = topics_p2_target + """
              { id: "j11", name: "Polyfills & internals", desc: "implement map/reduce, Promise.all, bind", faang: true },
              { id: "j12", name: "Deep clone", desc: "circular refs, Date, Map, Set handling" },"""

topics_p3_target = '              { id: "r6", name: "Error boundaries", desc: "componentDidCatch, error fallback UI" },'
topics_p3_replace = topics_p3_target + """
              { id: "r7", name: "Hooks implementation", desc: "usePrevious, useDebounce, useLocalStorage", faang: true },
              { id: "r8", name: "Virtual DOM & Reconciliation", desc: "Fiber tree, diffing heuristics, keys" },"""

topics_p9_target = '              { id: "adv7", name: "Symbols & metaprogramming", desc: "well-known symbols, iterator protocol, toPrimitive" },'
topics_p9_replace = topics_p9_target + """
              { id: "adv8", name: "Event delegation", desc: "bubbling vs capturing, stopPropagation", faang: true },"""

section_p7_target = '          {\n            name: "Coding rounds", topics: ['
section_p7_replace = """          {
            name: "Machine Coding (UI)", topics: [
              { id: "mc1", name: "Autocomplete / Typeahead", desc: "debounce, cache, a11y, keyboard nav", faang: true },
              { id: "mc2", name: "Image Carousel", desc: "infinite loop, swipe gestures, CSS transforms", faang: true },
              { id: "mc3", name: "Star Rating Widget", desc: "hover states, half-stars, accessibility" },
            ]
          },
""" + section_p7_target

topic_info_target = '    const TOPIC_INFO = {'
topic_info_replace = topic_info_target + """
      j11: { what: "Polyfills are fallback implementations of modern features. Writing them from scratch (like Promise.all or Array.prototype.reduce) tests your deep understanding of JS internals.", why: "FAANG (especially Meta) heavily asks candidates to implement native methods. It proves you understand how the language works under the hood.", points: ["Promise.all: return new Promise, track resolved count, resolve when count === length", "reduce: initialize accumulator, handle optional initialValue, loop and apply callback", "bind: return a closure that calls the original fn using apply() with the bound 'this'", "It's not just about making it work; handle edge cases like empty arrays or non-functions"] },
      j12: { what: "A deep clone creates a fully independent copy of an object, including all nested objects, unlike the spread operator (...obj) which only does a shallow copy.", why: "Writing a deep clone function is a classic interview question. It tests recursion, type checking, and handling edge cases like circular references.", points: ["structuredClone() is the modern native way, but interviewers want you to write it", "Use a WeakMap to track already-copied objects to prevent infinite loops on circular refs", "Handle special object types: Date, RegExp, Map, Set", "Check typeof obj !== 'object' or obj === null for base cases"] },
      r7: { what: "Custom hooks encapsulate reusable stateful logic. Interviewers often ask you to implement standard utility hooks like usePrevious, useDebounce, or useThrottle from scratch.", why: "It demonstrates advanced React knowledge, particularly the interaction between useEffect, useRef, and closures.", points: ["usePrevious: store current value in a ref inside useEffect; return the ref (which holds the previous value during render)", "useDebounce: use useEffect to set a timeout that updates state, return the debounced state, clear timeout on cleanup", "useLocalStorage: initialize state lazily reading from localStorage, update localStorage in useEffect", "Test your hooks mentally: what happens on re-render? What if dependencies change?"] },
      r8: { what: "The Virtual DOM is a lightweight JS representation of the real DOM. Reconciliation is the process of diffing the old VDOM with the new one to calculate minimal DOM updates.", why: "FAANG expects senior React devs to understand React's rendering engine (Fiber), why it's fast, and how to optimize it.", points: ["Fiber architecture allows React to pause, resume, or abort rendering work (Concurrent React)", "Diffing heuristic: elements of different types tear down the whole tree", "Keys: React uses keys to match children in lists; using index as key breaks state if the list order changes", "Real DOM updates are batched and applied in the 'commit' phase"] },
      adv8: { what: "Event delegation is attaching a single event listener to a parent element to handle events for multiple children, utilizing event bubbling.", why: "Attaching 1000 listeners to 1000 list items consumes massive memory. Attaching 1 listener to the <ul> is highly performant. A mandatory topic for vanilla JS interviews.", points: ["Event flow: Capture phase (down) -> Target -> Bubble phase (up)", "e.target is the element clicked; e.currentTarget is the element with the listener", "Use e.target.closest('.item') to find the exact child element that triggered the event", "e.stopPropagation() stops bubbling; e.preventDefault() stops default browser behavior"] },
      mc1: { what: "Building an Autocomplete/Typeahead component involves an input field that fetches and displays suggestions as the user types.", why: "This is the #1 most common Machine Coding question at FAANG. It touches network, performance, UI, and accessibility.", points: ["Debounce the API call to avoid spamming the server on every keystroke", "Implement a cache (Map or object) to store results for previously typed queries", "Keyboard navigation is crucial: Up/Down arrows to highlight, Enter to select", "Handle race conditions: if a slow request resolves after a fast one, ignore the slow one"] },
      mc2: { what: "An image carousel (or slider) displays a series of images, allowing the user to navigate through them via buttons or swipe gestures.", why: "Tests CSS layout skills, state management, and handling animations/transitions efficiently without layout thrashing.", points: ["Use Flexbox for a horizontal row of images and overflow: hidden on the container", "Use CSS transform: translateX() instead of left/margin for 60fps animations", "For infinite looping, clone the first and last images and jump seamlessly when reaching the end", "Handle touch events (touchstart, touchmove, touchend) for mobile swiping"] },
      mc3: { what: "A star rating widget lets users select a rating from 1 to 5 stars, often supporting hover states and half-stars.", why: "A frequent warm-up UI coding question. Tests DOM manipulation, event handling, and CSS styling (like filling stars partially).", points: ["Use event delegation on the container for mouseover, mouseout, and click", "Visual state vs persisted state: hover changes visual state temporarily, click locks it in", "Accessibility: use radio buttons under the hood, or aria-valuemax / aria-valuenow", "For half-stars, calculate the mouse position relative to the star element's width"] },
"""

for filepath in files:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check if already added to avoid duplication
        if "id: \"j11\"" not in content:
            content = content.replace(topics_p2_target, topics_p2_replace)
        if "id: \"r7\"" not in content:
            content = content.replace(topics_p3_target, topics_p3_replace)
        if "id: \"adv8\"" not in content:
            content = content.replace(topics_p9_target, topics_p9_replace)
        if "Machine Coding (UI)" not in content:
            content = content.replace(section_p7_target, section_p7_replace)
        if "mc1: { what:" not in content:
            content = content.replace(topic_info_target, topic_info_replace)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
            
        print(f"Successfully updated {filepath}")

    except Exception as e:
        print(f"Error updating {filepath}: {e}")
