# Frontend Architecture Playground

An advanced **Angular portfolio application** designed to demonstrate real-world frontend architecture decisions, performance optimization, and modern UI practices.

This project is intentionally **over-engineered for learning and interview demonstration purposes**, not as a tutorial app.

---

## 🎯 Purpose

This project serves as:

* 🧪 A **technical playground** to experiment with Angular architecture patterns
* 💼 A **portfolio-grade application** for mid–senior frontend roles
* 🧭 A **reference implementation** for hybrid Angular applications
* 🚀 A showcase of **performance-first UI design** (glassmorphism + motion)

---

## 🧠 Architecture Philosophy

This application reflects **real-world Angular evolution**, where projects rarely start greenfield.

It intentionally combines:

* **NgModule-based architecture**
  Used for legacy-style or enterprise feature isolation

* **Standalone Components & Routes**
  Used for modern, scalable, and tree-shakable features

> This mirrors production Angular apps that migrate incrementally rather than rewriting everything at once.

---

## 🧩 Application Structure

```
src/app
├── playground/        # NgModule-based features (architecture demos)
├── portfolio/         # Standalone feature (personal portfolio)
├── core/              # Singleton services, guards, interceptors
├── shared/            # Reusable UI components & utilities
├── layouts/           # App & feature-level layouts
├── styles/            # Design tokens, utilities, themes
└── app.routes.ts      # Root routing (standalone)
```

### Folder responsibilities

| Folder     | Responsibility                                 |
| ---------- | ---------------------------------------------- |
| core       | App-wide singletons and cross-cutting concerns |
| shared     | Stateless UI components and helpers            |
| playground | Architecture experiments and demos             |
| portfolio  | Production-ready, standalone feature           |
| layouts    | Structural UI composition                      |
| styles     | Global design system and tokens                |

---

## 🎨 Design System

The UI is built on a **minimal dark glassmorphism system**, powered by CSS variables.

### Design principles

* Single source of truth via CSS custom properties
* Low-contrast surfaces for visual hierarchy
* Motion used only for feedback and transitions
* GPU-friendly effects (no layout thrashing)

### Core tokens

* Color tokens (`--color-bg`, `--color-surface`, `--color-accent`)
* Spacing scale (`--space-sm → --space-xl`)
* Effect tokens (blur, borders)

---

## ✨ UI & Micro‑interactions

The interface focuses on **subtle, purposeful motion**:

* Hover lift and soft glow on interactive elements
* Focus-visible accessibility styles
* Transition-only animations (`opacity`, `transform`)
* Reduced motion friendly

No animation impacts layout or performance-critical paths.

---

## ⚡ Performance Strategy

Performance is treated as a **first-class concern**.

### Key optimizations

* Lazy-loaded routes and features
* Standalone components for better tree-shaking
* Limited usage of `backdrop-filter`
* No expensive animation properties
* Font loading optimized with `display=swap`

### Targets

* LCP < 2.5s
* CLS ≈ 0
* Minimal JS bundle size

---

## 🧭 Routing Strategy

* Root routing uses **standalone configuration**
* Feature-level routing is lazy-loaded
* Layouts are applied per feature, not globally

This keeps navigation predictable and scalable.

---

## 🧪 Why this project matters

This repository demonstrates:

* Architectural decision-making
* Trade-offs between legacy and modern Angular
* Clean separation of concerns
* Performance-aware UI development
* Production-level polish

It is designed to be **explained in interviews**, not just run.

---

## 🚀 Getting Started

```bash
npm install
ng serve
```

Build for production:

```bash
ng build --configuration production
```

---

## 📌 Notes for Reviewers

This project prioritizes **clarity, scalability, and reasoning** over feature count.

Every architectural choice is intentional and can be explained.

---

## 📄 License

MIT

