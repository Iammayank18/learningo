import type { MessageKey } from '../lib/i18n'

export interface Stage {
  titleKey: MessageKey
  blurbKey: MessageKey
  courses: string[]
}
export interface Roadmap {
  id: string
  titleKey: MessageKey
  icon: string
  hue: string
  taglineKey: MessageKey
  audienceKey: MessageKey
  stages: Stage[]
}

/** Hand-curated learning tracks. Each stage points at courses that already exist in the app. */
export const roadmaps: Roadmap[] = [
  {
    id: 'frontend', titleKey: 'roadmap.frontend.title', icon: '🎨', hue: 'blue',
    taglineKey: 'roadmap.frontend.tagline', audienceKey: 'roadmap.frontend.audience',
    stages: [
      { titleKey: 'roadmap.frontend.stage.web.title', blurbKey: 'roadmap.frontend.stage.web.blurb', courses: ['css-mastery', 'js-mastery', 'web-protocols'] },
      { titleKey: 'roadmap.frontend.stage.types.title', blurbKey: 'roadmap.frontend.stage.types.blurb', courses: ['typescript-mastery'] },
      { titleKey: 'roadmap.frontend.stage.react.title', blurbKey: 'roadmap.frontend.stage.react.blurb', courses: ['react-mastery', 'build-mini-react'] },
      { titleKey: 'roadmap.frontend.stage.framework.title', blurbKey: 'roadmap.frontend.stage.framework.blurb', courses: ['nextjs'] },
      { titleKey: 'roadmap.frontend.stage.quality.title', blurbKey: 'roadmap.frontend.stage.quality.blurb', courses: ['performance', 'testing'] },
      { titleKey: 'roadmap.frontend.stage.design.title', blurbKey: 'roadmap.frontend.stage.design.blurb', courses: ['frontend-system-design'] },
      { titleKey: 'roadmap.frontend.stage.practice.title', blurbKey: 'roadmap.frontend.stage.practice.blurb', courses: ['machine-coding', 'react-machine-coding', 'dsa'] },
    ],
  },
  {
    id: 'backend', titleKey: 'roadmap.backend.title', icon: '🛠️', hue: 'green',
    taglineKey: 'roadmap.backend.tagline', audienceKey: 'roadmap.backend.audience',
    stages: [
      { titleKey: 'roadmap.backend.stage.cs.title', blurbKey: 'roadmap.backend.stage.cs.blurb', courses: ['os-fundamentals', 'web-protocols', 'dsa'] },
      { titleKey: 'roadmap.backend.stage.node.title', blurbKey: 'roadmap.backend.stage.node.blurb', courses: ['js-mastery', 'nodejs-internals'] },
      { titleKey: 'roadmap.backend.stage.data.title', blurbKey: 'roadmap.backend.stage.data.blurb', courses: ['api-design', 'database'] },
      { titleKey: 'roadmap.backend.stage.concurrency.title', blurbKey: 'roadmap.backend.stage.concurrency.blurb', courses: ['concurrency', 'oop', 'design-patterns'] },
      { titleKey: 'roadmap.backend.stage.secure.title', blurbKey: 'roadmap.backend.stage.secure.blurb', courses: ['security', 'observability', 'testing'] },
      { titleKey: 'roadmap.backend.stage.scale.title', blurbKey: 'roadmap.backend.stage.scale.blurb', courses: ['system-design', 'microservices'] },
      { titleKey: 'roadmap.backend.stage.ship.title', blurbKey: 'roadmap.backend.stage.ship.blurb', courses: ['devops', 'backend-machine-coding'] },
    ],
  },
  {
    id: 'ai-native', titleKey: 'roadmap.ai.title', icon: '🤖', hue: 'violet',
    taglineKey: 'roadmap.ai.tagline', audienceKey: 'roadmap.ai.audience',
    stages: [
      { titleKey: 'roadmap.ai.stage.base.title', blurbKey: 'roadmap.ai.stage.base.blurb', courses: ['js-mastery', 'typescript-mastery', 'api-design'] },
      { titleKey: 'roadmap.ai.stage.agents.title', blurbKey: 'roadmap.ai.stage.agents.blurb', courses: ['ai-agents'] },
      { titleKey: 'roadmap.ai.stage.design.title', blurbKey: 'roadmap.ai.stage.design.blurb', courses: ['ai-system-design'] },
      { titleKey: 'roadmap.ai.stage.rag.title', blurbKey: 'roadmap.ai.stage.rag.blurb', courses: ['build-rag', 'build-voice-rag', 'build-git-rag'] },
      { titleKey: 'roadmap.ai.stage.agent.title', blurbKey: 'roadmap.ai.stage.agent.blurb', courses: ['build-opencode'] },
      { titleKey: 'roadmap.ai.stage.prod.title', blurbKey: 'roadmap.ai.stage.prod.blurb', courses: ['security', 'observability', 'devops'] },
    ],
  },
  {
    id: 'fullstack', titleKey: 'roadmap.fullstack.title', icon: '🧩', hue: 'orange',
    taglineKey: 'roadmap.fullstack.tagline', audienceKey: 'roadmap.fullstack.audience',
    stages: [
      { titleKey: 'roadmap.fullstack.stage.base.title', blurbKey: 'roadmap.fullstack.stage.base.blurb', courses: ['css-mastery', 'js-mastery', 'typescript-mastery'] },
      { titleKey: 'roadmap.fullstack.stage.react.title', blurbKey: 'roadmap.fullstack.stage.react.blurb', courses: ['react-mastery', 'nextjs'] },
      { titleKey: 'roadmap.fullstack.stage.backend.title', blurbKey: 'roadmap.fullstack.stage.backend.blurb', courses: ['nodejs-internals', 'api-design', 'database'] },
      { titleKey: 'roadmap.fullstack.stage.projects.title', blurbKey: 'roadmap.fullstack.stage.projects.blurb', courses: ['fullstack', 'real-world-scenarios'] },
      { titleKey: 'roadmap.fullstack.stage.deploy.title', blurbKey: 'roadmap.fullstack.stage.deploy.blurb', courses: ['security', 'testing', 'devops'] },
      { titleKey: 'roadmap.fullstack.stage.interview.title', blurbKey: 'roadmap.fullstack.stage.interview.blurb', courses: ['machine-coding', 'react-machine-coding', 'system-design'] },
    ],
  },
  {
    id: 'devops', titleKey: 'roadmap.devops.title', icon: '☁️', hue: 'teal',
    taglineKey: 'roadmap.devops.tagline', audienceKey: 'roadmap.devops.audience',
    stages: [
      { titleKey: 'roadmap.devops.stage.systems.title', blurbKey: 'roadmap.devops.stage.systems.blurb', courses: ['os-fundamentals', 'web-protocols'] },
      { titleKey: 'roadmap.devops.stage.core.title', blurbKey: 'roadmap.devops.stage.core.blurb', courses: ['devops'] },
      { titleKey: 'roadmap.devops.stage.security.title', blurbKey: 'roadmap.devops.stage.security.blurb', courses: ['security'] },
      { titleKey: 'roadmap.devops.stage.observe.title', blurbKey: 'roadmap.devops.stage.observe.blurb', courses: ['observability', 'performance'] },
      { titleKey: 'roadmap.devops.stage.distributed.title', blurbKey: 'roadmap.devops.stage.distributed.blurb', courses: ['concurrency', 'microservices'] },
      { titleKey: 'roadmap.devops.stage.design.title', blurbKey: 'roadmap.devops.stage.design.blurb', courses: ['system-design'] },
    ],
  },
  {
    id: 'architect', titleKey: 'roadmap.architect.title', icon: '🏛️', hue: 'red',
    taglineKey: 'roadmap.architect.tagline', audienceKey: 'roadmap.architect.audience',
    stages: [
      { titleKey: 'roadmap.architect.stage.design.title', blurbKey: 'roadmap.architect.stage.design.blurb', courses: ['oop', 'design-patterns'] },
      { titleKey: 'roadmap.architect.stage.data.title', blurbKey: 'roadmap.architect.stage.data.blurb', courses: ['database', 'concurrency'] },
      { titleKey: 'roadmap.architect.stage.distributed.title', blurbKey: 'roadmap.architect.stage.distributed.blurb', courses: ['system-design', 'microservices'] },
      { titleKey: 'roadmap.architect.stage.feai.title', blurbKey: 'roadmap.architect.stage.feai.blurb', courses: ['frontend-system-design', 'ai-system-design'] },
      { titleKey: 'roadmap.architect.stage.operate.title', blurbKey: 'roadmap.architect.stage.operate.blurb', courses: ['observability', 'security', 'devops'] },
    ],
  },
  {
    id: 'interview-sprint', titleKey: 'roadmap.sprint.title', icon: '⚡', hue: 'amber',
    taglineKey: 'roadmap.sprint.tagline', audienceKey: 'roadmap.sprint.audience',
    stages: [
      { titleKey: 'roadmap.sprint.stage.dsa.title', blurbKey: 'roadmap.sprint.stage.dsa.blurb', courses: ['dsa'] },
      { titleKey: 'roadmap.sprint.stage.machine.title', blurbKey: 'roadmap.sprint.stage.machine.blurb', courses: ['machine-coding', 'react-machine-coding', 'backend-machine-coding'] },
      { titleKey: 'roadmap.sprint.stage.design.title', blurbKey: 'roadmap.sprint.stage.design.blurb', courses: ['system-design', 'real-world-scenarios'] },
    ],
  },
]
export const roadmapOf = (id: string) => roadmaps.find((r) => r.id === id)
