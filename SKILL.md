---
name: learntrack-ai-tracker-engine
description: Advanced engineering playbook, agent skills integration guide, design system directives, and architectural patterns for LearnTrack AI (AI Progress Engine).
---

# LearnTrack AI — Advanced Full-Stack Architecture & Agent Skills Operating Playbook

## 1. Project Vision & Core Mandate
**LearnTrack AI (AI Progress Engine)** is a state-of-the-art web application designed to shift academic progress measurement from raw study hours to **demonstrated conceptual understanding** through AI-assisted evaluations powered by Google Gemini AI.

---

## 2. Integrated Agent Skills Operating Framework

This repository embeds specialized agent skills located in `.agents/skills/`. When performing tasks on this codebase, the agent and development team MUST inspect and execute the following skills:

```
                  ┌──────────────────────────────────────────────────────────┐
                  │          LearnTrack AI Agent Skills Engine               │
                  └────────────────────────────┬─────────────────────────────┘
                                               │
     ┌──────────────────┬──────────────────────┼──────────────────────┬──────────────────┐
     ▼                  ▼                      ▼                      ▼                  ▼
┌───────────┐  ┌──────────────────┐  ┌───────────────────┐  ┌──────────────────┐  ┌─────────────┐
│ frontend- │  │  tailwindcss &   │  │ vercel-comp-     │  │ react-component- │  │  writing-   │
│  design   │  │ responsive-des.  │  │    patterns       │  │   performance    │  │ guidelines  │
└─────┬─────┘  └────────┬─────────┘  └─────────┬─────────┘  └────────┬─────────┘  └──────┬──────┘
      │                 │                      │                     │                   │
      ▼                 ▼                      ▼                     ▼                   ▼
┌───────────┐  ┌──────────────────┐  ┌───────────────────┐  ┌──────────────────┐  ┌─────────────┐
│  Visual   │  │ CSS Tokens, v4   │  │ Compound Dialogs, │  │ Memoization &    │  │ Active Verb │
│ Identity  │  │ Breakpoints & UI │  │ Slot Architecture │  │ Render Reduction │  │ Microcopy   │
└───────────┘  └──────────────────┘  └───────────────────┘  └──────────────────┘  └─────────────┘
```

### Detailed Agent Skills Catalog & Trigger Protocols

| Skill Name | Path | Trigger Scenarios | Actionable Instructions & Usage Rules |
|---|---|---|---|
| **`frontend-design`** | [SKILL.md](file:///.agents/skills/frontend-design/SKILL.md) | UI creation, layout redesign, hero banners, dark mode aesthetic choices | **How to use**: View `SKILL.md` before designing. Enforce custom visual identity (glassmorphism backdrop blur, vibrant HSL gradients, signature card hover lifts). Never produce generic white/gray templates. |
| **`tailwindcss`** | [SKILL.md](file:///.agents/skills/tailwindcss/SKILL.md) | Styling components, theme customization, CSS directives | **How to use**: Utilize Tailwind CSS v4 directives (`@import "tailwindcss";` & `@theme`). Use CSS-first theme variables for colors, dark mode variants (`dark:`), and glass utilities. |
| **`responsive-design`** | [SKILL.md](file:///.agents/skills/responsive-design/SKILL.md) | Mobile adaptation, responsive grid layouts, breakpoints | **How to use**: Implement mobile-first layouts using fluid grids (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`), collapsible sidebar drawers, and container queries for cards. |
| **`vercel-composition-patterns`** | [SKILL.md](file:///.agents/skills/vercel-composition-patterns/SKILL.md) | Component architecture, modal dialogs, data tables | **How to use**: Avoid boolean prop proliferation. Build compound components (e.g. `<QuizCard.Header>`, `<QuizCard.Body>`, `<QuizCard.Footer>`) with clean React 19 slot composition. |
| **`react-component-performance`** | [SKILL.md](file:///.agents/skills/react-component-performance/SKILL.md) | Timed quiz attempts, live charts, long list rendering | **How to use**: Prevent unneeded re-renders during active quiz timers by memoizing callbacks (`useCallback`), wrapping chart datasets in `useMemo`, and lazy-loading heavy route components. |
| **`accessibility-review`** | [SKILL.md](file:///.agents/skills/accessibility-review/SKILL.md) | Modal dialogs, quiz attempt option buttons, keyboard focus | **How to use**: Audit WCAG 2.1 AA compliance. Ensure visible focus rings (`focus:ring-2`), proper ARIA roles (`role="dialog"`, `aria-label`), and sufficient color contrast ratios. |
| **`qa`** | [SKILL.md](file:///.agents/skills/qa/SKILL.md) | End-to-end user workflows, testing auth & quiz attempt flows | **How to use**: Run systematic QA sessions. Verify user journeys (Splash -> Login -> Space -> Generate Quiz -> Attempt -> Results -> Analytics -> Recommendations). |
| **`writing-guidelines`** | [SKILL.md](file:///.agents/skills/writing-guidelines/SKILL.md) | Button labels, empty state copy, error feedback toasts | **How to use**: Enforce human-centric active voice ("Generate Quiz Now", "Save Study Session", "Start Attempt"). Avoid technical jargon in user error toasts. |
| **`find-skills`** | [SKILL.md](file:///.agents/skills/find-skills/SKILL.md) | Extending agent capabilities or discovering new skill folders | **How to use**: Search `.agents/skills/` directory and `skills.json` when adding new domain tools or automated capabilities. |

---

## 3. How the Agent Uses Skills During Workflows

When the agent is tasked with implementing or modifying features, it must follow this 4-step execution algorithm:

```
Step 1: Skill Discovery ──> Step 2: Inspection ──> Step 3: Synthesis ──> Step 4: Verification
(Check .agents/skills)     (view_file SKILL.md)    (Write Code)          (npm run build & lint)
```

1. **Step 1: Skill Discovery & Matching**: Match user prompt requirements against available skill descriptions in `.agents/skills/`.
2. **Step 2: File Reading**: Execute `view_file` on the target `SKILL.md` (e.g. `.agents/skills/frontend-design/SKILL.md`) to read detailed directives prior to editing code.
3. **Step 3: Synthesis & Code Writing**: Apply the skill's specific design tokens, composition patterns, and performance optimizations directly into source files.
4. **Step 4: Verification**: Run validation commands (`npm run build`, `npm run lint`) to guarantee complete compliance.

---

## 4. Full-Stack Architecture & Module Directives

### A. Frontend Layer (React 19 + Vite + Tailwind v4 + Zustand)
- **Routing**: `React Router v7` mapping all 30 pages across 8 modules (`App.jsx`).
- **Global State**: `useStore.js` managing Auth, Learning Spaces, Timetable, Quizzes, Analytics, Recommendations, and Dark/Light themes.
- **Design Tokens**: Defined in `src/index.css` with HSL color scales, custom scrollbars, and keyframe animations (`shimmer-btn`, `animate-fade-in-up`).

### B. Backend Layer (Node.js + Express.js + Prisma ORM + Gemini AI)
- **Database Schema**: 9 Prisma entities (`User`, `LearningSpace`, `Topic`, `Schedule`, `Quiz`, `Question`, `QuizAttempt`, `Recommendation`, `Notification`) in `prisma/schema.prisma`.
- **API Controllers**: Express routes for Auth (JWT + bcrypt), Spaces CRUD, Timetables, Gemini Quiz Generation, PDF Uploads (Multer), Analytics, and Recommendations.
- **AI Engine Service**: Gemini API wrapper performing question generation, PDF text extraction parsing, and weak-topic diagnostics.

---

## 5. 8-Module Page Directory & Skill Mapping Matrix

| Module | Total Pages | Key Routes | Active Agent Skills Applied |
|---|---|---|---|
| **1. Authentication** | 4 Pages | `/splash`, `/login`, `/register`, `/forgot-password` | `frontend-design`, `writing-guidelines` |
| **2. Dashboard** | 3 Pages | `/dashboard`, `/notifications`, `/search` | `frontend-design`, `responsive-design`, `accessibility-review` |
| **3. Learning Management** | 5 Pages | `/learning-spaces`, `/learning-spaces/new`, `/learning-spaces/:id/edit`, `/timetable`, `/timetable/new` | `vercel-composition-patterns`, `tailwindcss` |
| **4. Quiz & Assessment** | 7 Pages | `/quizzes`, `/quizzes/generate`, `/quizzes/:id/instructions`, `/quizzes/:id/attempt`, `/quizzes/:id/result`, `/quizzes/:id/review`, `/quizzes/history` | `react-component-performance`, `accessibility-review`, `qa` |
| **5. Analytics & AI** | 3 Pages | `/analytics`, `/analytics/subject/:id`, `/analytics/report` | `frontend-design`, `react-component-performance` |
| **6. AI Recommendations** | 2 Pages | `/recommendations`, `/recommendations/:id` | `writing-guidelines`, `frontend-design` |
| **7. User Profile** | 3 Pages | `/profile`, `/profile/edit`, `/settings` | `tailwindcss`, `accessibility-review` |
| **8. System Pages** | 3 Pages | `/loading`, `*` (404), `/coming-soon` | `frontend-design`, `writing-guidelines` |

---

## 6. Development Quality Control Checklist

Before declaring any feature complete:
- [ ] Read relevant `SKILL.md` files from `.agents/skills/`.
- [ ] Ensure mobile-first responsive layout adaptation across all viewport sizes.
- [ ] Confirm dark mode styling functions seamlessly without unstyled white flashes.
- [ ] Run `npm run build` inside `frontend` and verify zero JSX/TypeScript build errors.
- [ ] Run `npm run lint` and verify zero ESLint errors or warnings.