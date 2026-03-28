import { Routes } from '@angular/router';

/**
 * Single source of truth for playground routes that are not implemented yet.
 * Each entry gets a real route + placeholder page until you swap in a feature module.
 */
export interface PlaygroundFutureFeatureDef {
  path: string;
  title: string;
  subtitle: string;
}

export const PLAYGROUND_FUTURE_FEATURES: readonly PlaygroundFutureFeatureDef[] = [
  {
    path: 'hydration',
    title: 'Hydration & SSR',
    subtitle: 'Server-side rendering, hydration, and transfer state patterns.'
  },
  {
    path: 'smart-dumb-components',
    title: 'Smart / Dumb Components',
    subtitle: 'Separate container logic from presentational UI.'
  },
  {
    path: 'facade-pattern',
    title: 'Facade Pattern',
    subtitle: 'A stable API over services and state for feature areas.'
  },
  {
    path: 'container-presenter',
    title: 'Container / Presenter',
    subtitle: 'Classic split between data orchestration and dumb views.'
  },
  {
    path: 'feature-modules',
    title: 'Feature Modules',
    subtitle: 'Organizing NgModules vs standalone features and lazy boundaries.'
  },
  {
    path: 'security',
    title: 'Security',
    subtitle: 'XSS, tokens, interceptors, and safe patterns in Angular.'
  },
  {
    path: 'accessibility',
    title: 'Accessibility',
    subtitle: 'A11y checks, focus management, and inclusive UI.'
  },
  {
    path: 'testing-strategies',
    title: 'Testing Strategies',
    subtitle: 'Unit, component, and integration testing approaches.'
  },
  {
    path: 'bundle-optimization',
    title: 'Bundle Optimization',
    subtitle: 'Code splitting, budgets, and delivery performance.'
  },
  {
    path: 'comparisons',
    title: 'Pattern Comparisons',
    subtitle: 'Side-by-side evaluation of architectural trade-offs.'
  },
  {
    path: 'benchmarks',
    title: 'Performance Benchmarks',
    subtitle: 'Measuring render cost, bundle size, and runtime behavior.'
  },
  {
    path: 'decision-tree',
    title: 'Decision Tree',
    subtitle: 'Choose patterns based on constraints and team context.'
  }
];

const loadFuturePlaceholder = () =>
  import('./features/future-feature-placeholder/future-feature-placeholder.component').then(
    m => m.FutureFeaturePlaceholderComponent
  );

/** Child routes registered under `/playground` before the default redirect. */
export const PLAYGROUND_FUTURE_ROUTES: Routes = PLAYGROUND_FUTURE_FEATURES.map(
  ({ path, title, subtitle }) => ({
    path,
    loadComponent: loadFuturePlaceholder,
    data: { title, subtitle, isLab: false, roadmap: true }
  })
);
