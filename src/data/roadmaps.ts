export interface Stage { title: string; blurb: string; courses: string[] }
export interface Roadmap {
  id: string
  title: string
  icon: string
  hue: string
  tagline: string
  audience: string
  stages: Stage[]
}

/** Hand-curated learning tracks. Each stage points at courses that already exist in the app. */
export const roadmaps: Roadmap[] = [
  {
    id: 'frontend', title: 'Frontend Engineer', icon: '🎨', hue: 'blue',
    tagline: 'HTML/CSS se React, Next.js aur frontend system design tak.',
    audience: 'Web UI banane wale, FE interviews ki taiyari',
    stages: [
      { title: 'Web ki neev', blurb: 'Browser kaise kaam karta hai, CSS layout aur JavaScript ki gehraai.', courses: ['css-mastery', 'js-mastery', 'web-protocols'] },
      { title: 'Type-safe code', blurb: 'TypeScript se bugs compile time par pakdo.', courses: ['typescript-mastery'] },
      { title: 'React', blurb: 'Hooks, rendering, state — aur andar se kaise chalta hai.', courses: ['react-mastery', 'build-mini-react'] },
      { title: 'Framework & rendering', blurb: 'SSR, SSG, routing, data fetching.', courses: ['nextjs'] },
      { title: 'Quality & speed', blurb: 'Fast aur reliable UI: performance aur testing.', courses: ['performance', 'testing'] },
      { title: 'Design karna seekho', blurb: 'Frontend system design rounds ke liye.', courses: ['frontend-system-design'] },
      { title: 'Interview practice', blurb: 'Machine coding aur DSA drills.', courses: ['machine-coding', 'dsa'] },
    ],
  },
  {
    id: 'backend', title: 'Backend Engineer', icon: '🛠️', hue: 'green',
    tagline: 'APIs, databases, concurrency aur production-grade services.',
    audience: 'Server-side devs, backend SDE interviews',
    stages: [
      { title: 'CS ki neev', blurb: 'OS, networking aur DSA — har backend ka base.', courses: ['os-fundamentals', 'web-protocols', 'dsa'] },
      { title: 'Node.js', blurb: 'Event loop, streams, internals.', courses: ['js-mastery', 'nodejs-internals'] },
      { title: 'APIs & data', blurb: 'API design aur databases deeply.', courses: ['api-design', 'database'] },
      { title: 'Concurrency & OOP', blurb: 'Threads, locks, races; clean OOP design.', courses: ['concurrency', 'oop', 'design-patterns'] },
      { title: 'Secure & observable', blurb: 'Security, logging, metrics, tracing.', courses: ['security', 'observability', 'testing'] },
      { title: 'Scale karna', blurb: 'System design aur microservices.', courses: ['system-design', 'microservices'] },
      { title: 'Ship & practice', blurb: 'Deploy karna aur machine coding.', courses: ['devops', 'backend-machine-coding'] },
    ],
  },
  {
    id: 'ai-native', title: 'AI-native Engineer', icon: '🤖', hue: 'violet',
    tagline: 'Agents, RAG aur LLM apps — ground-up banao aur production mein chalao.',
    audience: 'AI products banane wale, AI engineer roles',
    stages: [
      { title: 'Base skills', blurb: 'JS/TS aur API sense — AI apps ki zaroorat.', courses: ['js-mastery', 'typescript-mastery', 'api-design'] },
      { title: 'Agents', blurb: 'Tool calling, loops, memory, evals.', courses: ['ai-agents'] },
      { title: 'AI system design', blurb: 'RAG, caching, cost, latency, guardrails.', courses: ['ai-system-design'] },
      { title: 'Build: RAG projects', blurb: 'Hands-on: codebase RAG, voice RAG, git RAG.', courses: ['build-rag', 'build-voice-rag', 'build-git-rag'] },
      { title: 'Build: coding agent', blurb: 'Mini-opencode jaisa agent khud banao.', courses: ['build-opencode'] },
      { title: 'Production ready', blurb: 'AI apps ko secure, observable aur deployable banao.', courses: ['security', 'observability', 'devops'] },
    ],
  },
  {
    id: 'fullstack', title: 'Full-stack Engineer', icon: '🧩', hue: 'orange',
    tagline: 'UI se database tak — poora product khud ship karo.',
    audience: 'Product-minded devs, startups, freelancers',
    stages: [
      { title: 'Frontend base', blurb: 'CSS, JS aur TypeScript.', courses: ['css-mastery', 'js-mastery', 'typescript-mastery'] },
      { title: 'React & Next.js', blurb: 'Modern UI + server rendering.', courses: ['react-mastery', 'nextjs'] },
      { title: 'Backend & data', blurb: 'Node, APIs aur databases.', courses: ['nodejs-internals', 'api-design', 'database'] },
      { title: 'Real projects', blurb: 'End-to-end fullstack builds.', courses: ['fullstack', 'real-world-scenarios'] },
      { title: 'Security & deploy', blurb: 'Safe aur live.', courses: ['security', 'testing', 'devops'] },
      { title: 'Interview mode', blurb: 'Machine coding aur system design.', courses: ['machine-coding', 'system-design'] },
    ],
  },
  {
    id: 'devops', title: 'DevOps / SRE', icon: '☁️', hue: 'teal',
    tagline: 'Containers, CI/CD, cloud, reliability aur observability.',
    audience: 'DevOps, SRE, platform engineers',
    stages: [
      { title: 'Systems base', blurb: 'OS aur networking ki samajh.', courses: ['os-fundamentals', 'web-protocols'] },
      { title: 'DevOps core', blurb: 'CI/CD, Docker, Kubernetes, IaC, AWS.', courses: ['devops'] },
      { title: 'Security', blurb: 'Secure pipelines, containers, cloud.', courses: ['security'] },
      { title: 'Observe & perform', blurb: 'Metrics, logs, traces, performance.', courses: ['observability', 'performance'] },
      { title: 'Distributed systems', blurb: 'Concurrency aur microservices.', courses: ['concurrency', 'microservices'] },
      { title: 'Design reviews', blurb: 'System design rounds.', courses: ['system-design'] },
    ],
  },
  {
    id: 'architect', title: 'Software Architect', icon: '🏛️', hue: 'red',
    tagline: 'Trade-offs, patterns aur large-scale system design.',
    audience: 'Senior / staff engineers, design interviews',
    stages: [
      { title: 'Design fundamentals', blurb: 'OOP aur design patterns.', courses: ['oop', 'design-patterns'] },
      { title: 'Data & concurrency', blurb: 'Databases aur concurrent systems.', courses: ['database', 'concurrency'] },
      { title: 'Distributed design', blurb: 'System design problems aur microservices.', courses: ['system-design', 'microservices'] },
      { title: 'Frontend & AI design', blurb: 'FE system design aur AI system design.', courses: ['frontend-system-design', 'ai-system-design'] },
      { title: 'Operate it', blurb: 'Observability, security aur DevOps.', courses: ['observability', 'security', 'devops'] },
    ],
  },
  {
    id: 'interview-sprint', title: 'Interview Sprint', icon: '⚡', hue: 'amber',
    tagline: 'Interview ke 2-3 hafte pehle — sirf high-yield practice.',
    audience: 'Jinke interviews paas hain',
    stages: [
      { title: 'DSA warm-up', blurb: 'Patterns aur problem solving.', courses: ['dsa'] },
      { title: 'Machine coding', blurb: 'Time-boxed builds.', courses: ['machine-coding', 'backend-machine-coding'] },
      { title: 'Design rounds', blurb: 'System design + real-world scenarios.', courses: ['system-design', 'real-world-scenarios'] },
    ],
  },
]
export const roadmapOf = (id: string) => roadmaps.find((r) => r.id === id)
