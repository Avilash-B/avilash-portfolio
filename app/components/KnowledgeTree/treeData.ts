/**
 * Data model for the Knowledge Tree.
 * Adding a new technology, project or root only requires editing this file.
 */

export interface SkillNode {
  id: string
  name: string
  branchId: string
  years: number
  proficiency: number // 0-100
  description: string
  favoriteFeatures: string[]
  projects: string[] // project ids
  relatedSkills: string[] // skill ids
  architectureNotes?: string
  github?: string
  liveDemo?: string
}

export interface BranchNode {
  id: string
  name: string
  color: string
  skills: string[] // skill ids, ordered along the branch
}

export interface ProjectLeaf {
  id: string
  name: string
  branchId: string // branch the leaf hangs from
  skills: string[] // skill ids used by the project
  description: string
}

export interface RootNode {
  id: string
  name: string
}

export interface TreeData {
  trunkTitle: string
  trunkSubtitle: string
  roots: RootNode[]
  branches: BranchNode[]
  skills: Record<string, SkillNode>
  projects: ProjectLeaf[]
}

export const treeData: TreeData = {
  trunkTitle: 'Avilash Bharti',
  trunkSubtitle: 'Senior Full Stack Engineer',

  roots: [
    { id: 'csharp', name: 'C#' },
    { id: 'javascript', name: 'JavaScript' },
    { id: 'typescript-root', name: 'TypeScript' },
    { id: 'sql', name: 'SQL' },
    { id: 'git', name: 'Git' },
    { id: 'html', name: 'HTML' },
    { id: 'css', name: 'CSS' },
  ],

  branches: [
    {
      id: 'frontend',
      name: 'Frontend',
      color: '#4fc3f7',
      skills: ['react', 'typescript', 'mui', 'vite', 'tanstack-query'],
    },
    {
      id: 'backend',
      name: 'Backend',
      color: '#9575cd',
      skills: ['dotnet', 'aspnet-core', 'postgresql', 'kafka', 'redis'],
    },
    {
      id: 'architecture',
      name: 'Architecture',
      color: '#4dd0e1',
      skills: ['clean-architecture', 'cqrs', 'event-driven', 'microservices', 'background-workers'],
    },
    {
      id: 'cloud-devops',
      name: 'Cloud & DevOps',
      color: '#ffb74d',
      skills: ['docker', 'linux', 'azure', 'coolify', 'cloudflare'],
    },
    {
      id: 'ai-engineering',
      name: 'AI Engineering',
      color: '#f06292',
      skills: ['claude-code', 'github-copilot', 'cursor', 'windsurf', 'kiro'],
    },
  ],

  skills: {
    react: {
      id: 'react', name: 'React', branchId: 'frontend', years: 5, proficiency: 92,
      description: 'Primary UI library for building component-driven, performant interfaces.',
      favoriteFeatures: ['Hooks', 'Concurrent rendering', 'Server components'],
      projects: ['rx-vector', 'portfolio'], relatedSkills: ['typescript', 'mui', 'tanstack-query', 'vite'],
    },
    typescript: {
      id: 'typescript', name: 'TypeScript', branchId: 'frontend', years: 6, proficiency: 94,
      description: 'Strict typing across the whole stack, from UI state to API contracts.',
      favoriteFeatures: ['Discriminated unions', 'Generics', 'Type inference'],
      projects: ['rx-vector', 'intermex', 'portfolio'], relatedSkills: ['react', 'dotnet'],
    },
    mui: {
      id: 'mui', name: 'MUI', branchId: 'frontend', years: 4, proficiency: 88,
      description: 'Design-system foundation with deep theme customisation.',
      favoriteFeatures: ['sx prop', 'Theme overrides', 'CSS variables'],
      projects: ['portfolio', 'rx-vector'], relatedSkills: ['react'],
    },
    vite: {
      id: 'vite', name: 'Vite', branchId: 'frontend', years: 3, proficiency: 85,
      description: 'Lightning-fast dev server and build tooling for SPA workloads.',
      favoriteFeatures: ['Instant HMR', 'esbuild pre-bundling', 'Plugin API'],
      projects: ['rx-vector'], relatedSkills: ['react', 'typescript'],
    },
    'tanstack-query': {
      id: 'tanstack-query', name: 'TanStack Query', branchId: 'frontend', years: 3, proficiency: 87,
      description: 'Server-state management: caching, invalidation and optimistic updates.',
      favoriteFeatures: ['Query invalidation', 'Optimistic updates', 'Infinite queries'],
      projects: ['rx-vector'], relatedSkills: ['react', 'aspnet-core'],
    },

    dotnet: {
      id: 'dotnet', name: '.NET', branchId: 'backend', years: 8, proficiency: 95,
      description: 'Core platform for high-throughput backend services.',
      favoriteFeatures: ['Minimal APIs', 'Source generators', 'Span<T> performance'],
      projects: ['rx-vector', 'intermex'], relatedSkills: ['aspnet-core', 'clean-architecture'],
    },
    'aspnet-core': {
      id: 'aspnet-core', name: 'ASP.NET Core', branchId: 'backend', years: 7, proficiency: 93,
      description: 'REST APIs, middleware pipelines and real-time services.',
      favoriteFeatures: ['Middleware pipeline', 'DI container', 'SignalR'],
      projects: ['rx-vector', 'intermex'], relatedSkills: ['dotnet', 'postgresql', 'cqrs'],
    },
    postgresql: {
      id: 'postgresql', name: 'PostgreSQL', branchId: 'backend', years: 5, proficiency: 88,
      description: 'Relational store of choice: JSONB, window functions, partitioning.',
      favoriteFeatures: ['JSONB', 'CTEs', 'Logical replication'],
      projects: ['rx-vector'], relatedSkills: ['aspnet-core', 'kafka'],
    },
    kafka: {
      id: 'kafka', name: 'Kafka', branchId: 'backend', years: 4, proficiency: 84,
      description: 'Event backbone for asynchronous, decoupled service communication.',
      favoriteFeatures: ['Consumer groups', 'Exactly-once semantics', 'Compacted topics'],
      projects: ['intermex'], relatedSkills: ['event-driven', 'postgresql', 'microservices'],
    },
    redis: {
      id: 'redis', name: 'Redis', branchId: 'backend', years: 4, proficiency: 85,
      description: 'Caching, distributed locks and pub/sub for hot paths.',
      favoriteFeatures: ['Pub/Sub', 'Sorted sets', 'Lua scripting'],
      projects: ['intermex', 'rx-vector'], relatedSkills: ['aspnet-core', 'microservices'],
    },

    'clean-architecture': {
      id: 'clean-architecture', name: 'Clean Architecture', branchId: 'architecture', years: 6, proficiency: 90,
      description: 'Dependency-inverted layering keeping domains framework-agnostic.',
      favoriteFeatures: ['Use-case slices', 'Testable domains', 'Ports & adapters'],
      projects: ['rx-vector', 'intermex'], relatedSkills: ['dotnet', 'cqrs'],
    },
    cqrs: {
      id: 'cqrs', name: 'CQRS', branchId: 'architecture', years: 5, proficiency: 87,
      description: 'Separated read/write models for scalability and clarity.',
      favoriteFeatures: ['Thin queries', 'Command validation', 'Read replicas'],
      projects: ['intermex'], relatedSkills: ['clean-architecture', 'event-driven'],
    },
    'event-driven': {
      id: 'event-driven', name: 'Event Driven', branchId: 'architecture', years: 5, proficiency: 86,
      description: 'Choreographed systems built on domain events and outbox patterns.',
      favoriteFeatures: ['Outbox pattern', 'Sagas', 'Idempotent consumers'],
      projects: ['intermex'], relatedSkills: ['kafka', 'cqrs', 'microservices'],
    },
    microservices: {
      id: 'microservices', name: 'Microservices', branchId: 'architecture', years: 5, proficiency: 85,
      description: 'Independently deployable services with clear ownership boundaries.',
      favoriteFeatures: ['Bounded contexts', 'API gateways', 'Service discovery'],
      projects: ['intermex'], relatedSkills: ['docker', 'kafka', 'event-driven'],
    },
    'background-workers': {
      id: 'background-workers', name: 'Background Workers', branchId: 'architecture', years: 6, proficiency: 89,
      description: 'Long-running processors, schedulers and queue consumers.',
      favoriteFeatures: ['Hosted services', 'Channels', 'Graceful shutdown'],
      projects: ['rx-vector', 'intermex'], relatedSkills: ['dotnet', 'kafka', 'redis'],
    },

    docker: {
      id: 'docker', name: 'Docker', branchId: 'cloud-devops', years: 5, proficiency: 88,
      description: 'Containerised builds and runtime parity from dev to prod.',
      favoriteFeatures: ['Multi-stage builds', 'Compose', 'BuildKit caching'],
      projects: ['rx-vector', 'intermex', 'portfolio'], relatedSkills: ['linux', 'coolify', 'microservices'],
    },
    linux: {
      id: 'linux', name: 'Linux', branchId: 'cloud-devops', years: 6, proficiency: 84,
      description: 'Server administration, shell tooling and process debugging.',
      favoriteFeatures: ['systemd', 'Networking tools', 'Shell scripting'],
      projects: ['rx-vector', 'portfolio'], relatedSkills: ['docker', 'coolify'],
    },
    azure: {
      id: 'azure', name: 'Azure', branchId: 'cloud-devops', years: 5, proficiency: 86,
      description: 'Cloud workloads: App Services, Functions, Service Bus, DevOps pipelines.',
      favoriteFeatures: ['App Services', 'Service Bus', 'Bicep IaC'],
      projects: ['intermex'], relatedSkills: ['dotnet', 'docker'],
    },
    coolify: {
      id: 'coolify', name: 'Coolify', branchId: 'cloud-devops', years: 2, proficiency: 80,
      description: 'Self-hosted PaaS running my personal projects and this portfolio.',
      favoriteFeatures: ['Git deploys', 'Built-in proxies', 'One-click databases'],
      projects: ['portfolio', 'rx-vector'], relatedSkills: ['docker', 'linux', 'cloudflare'],
    },
    cloudflare: {
      id: 'cloudflare', name: 'Cloudflare', branchId: 'cloud-devops', years: 3, proficiency: 82,
      description: 'DNS, CDN, tunnels and edge security in front of everything I ship.',
      favoriteFeatures: ['Tunnels', 'Edge caching', 'WAF rules'],
      projects: ['portfolio', 'rx-vector'], relatedSkills: ['coolify', 'linux'],
    },

    'claude-code': {
      id: 'claude-code', name: 'Claude Code', branchId: 'ai-engineering', years: 1, proficiency: 90,
      description: 'Agentic pair-programming: multi-file refactors, reviews and automation.',
      favoriteFeatures: ['Agentic workflows', 'Skills & hooks', 'Deep codebase context'],
      projects: ['portfolio', 'rx-vector'], relatedSkills: ['github-copilot', 'cursor'],
    },
    'github-copilot': {
      id: 'github-copilot', name: 'GitHub Copilot', branchId: 'ai-engineering', years: 3, proficiency: 88,
      description: 'Inline completions and chat woven into everyday editing.',
      favoriteFeatures: ['Inline completions', 'Workspace chat', 'PR summaries'],
      projects: ['intermex', 'rx-vector'], relatedSkills: ['claude-code', 'cursor'],
    },
    cursor: {
      id: 'cursor', name: 'Cursor', branchId: 'ai-engineering', years: 2, proficiency: 85,
      description: 'AI-first editor for rapid prototyping and codebase Q&A.',
      favoriteFeatures: ['Composer', 'Codebase indexing', 'Tab completions'],
      projects: ['rx-vector'], relatedSkills: ['claude-code', 'windsurf'],
    },
    windsurf: {
      id: 'windsurf', name: 'Windsurf', branchId: 'ai-engineering', years: 1, proficiency: 78,
      description: 'Agentic IDE flows for exploratory builds.',
      favoriteFeatures: ['Cascade agent', 'Flow awareness', 'Terminal integration'],
      projects: ['portfolio'], relatedSkills: ['cursor', 'kiro'],
    },
    kiro: {
      id: 'kiro', name: 'Kiro', branchId: 'ai-engineering', years: 1, proficiency: 75,
      description: 'Spec-driven AI development: requirements to design to tasks.',
      favoriteFeatures: ['Spec workflows', 'Steering files', 'Agent hooks'],
      projects: ['portfolio'], relatedSkills: ['windsurf', 'claude-code'],
    },
  },

  projects: [
    {
      id: 'rx-vector', name: 'Rx Vector', branchId: 'backend',
      skills: ['react', 'typescript', 'mui', 'vite', 'tanstack-query', 'dotnet', 'aspnet-core', 'postgresql', 'redis', 'clean-architecture', 'background-workers', 'docker', 'linux', 'coolify', 'cloudflare', 'claude-code', 'cursor'],
      description: 'Full-stack pharmacy platform with a .NET core and a React front-end.',
    },
    {
      id: 'intermex', name: 'Intermex', branchId: 'architecture',
      skills: ['typescript', 'dotnet', 'aspnet-core', 'kafka', 'redis', 'clean-architecture', 'cqrs', 'event-driven', 'microservices', 'background-workers', 'azure', 'docker', 'github-copilot'],
      description: 'Event-driven remittance microservices processing high-volume transactions.',
    },
    {
      id: 'portfolio', name: 'Portfolio Website', branchId: 'frontend',
      skills: ['react', 'typescript', 'mui', 'docker', 'linux', 'coolify', 'cloudflare', 'claude-code', 'windsurf', 'kiro'],
      description: 'This site: Next.js, MUI, a Three.js shader background and a living knowledge tree.',
    },
  ],
}
