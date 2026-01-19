# Frontend Architecture Playground

An advanced Angular application designed to demonstrate
real-world frontend architecture patterns, performance strategies,
and modern Angular evolution.

## 🎯 Purpose
This project serves as:
- A technical playground for Angular architecture
- A portfolio-grade application for senior frontend roles
- A reference for hybrid Angular applications (NgModules + Standalone)

## 🧠 Architecture Philosophy
This project intentionally combines:
- **NgModule-based architecture** for enterprise & legacy patterns
- **Standalone components** for modern, scalable Angular

This mirrors real-world Angular applications undergoing gradual migration.

## 🧩 Application Structure

src/app
├── playground/        # NgModule-based features
├── portfolio/         # Standalone components (personal profile)
├── core/              # Singleton services, guards, interceptors
├── shared/            # Reusable UI & utilities
└── app.routes.ts      # Root routing (standalone)

## 🛠 Tech Stack
- Angular (latest)
- TypeScript
- RxJS
- SCSS
- Angular Router (lazy-loaded)
