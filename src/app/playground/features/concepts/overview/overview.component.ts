// overview.component.ts - Versión mejorada
import { Component, OnInit } from '@angular/core';

interface LabCard {
  title: string;
  description: string;
  icon: string;
  badge: string;
  badgeClass?: string;
  route: string;
  metric: { value: string; label: string };
  color: 'performance' | 'state' | 'signals' | 'hydration';
}

interface ConceptCard {
  title: string;
  description: string;
  icon: string;
  route: string;
  tags: string[];
}

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  // Datos estructurados para mejor mantenibilidad
  labs: LabCard[] = [
    {
      title: 'Performance Lab',
      description: 'Compare change detection strategies with real-time FPS monitoring, component heat maps, and CPU usage tracking.',
      icon: '⚡',
      badge: 'Hot',
      badgeClass: '',
      route: '/playground/performance',
      metric: { value: '85%', label: 'Performance Gain' },
      color: 'performance'
    },
    {
      title: 'State Management',
      description: 'Compare different state management patterns: Services, NgRx, Signals, and Context API with visual data flow diagrams.',
      icon: '🔄',
      badge: 'New',
      badgeClass: 'badge-new',
      route: '/playground/state-management',
      metric: { value: '3', label: 'Patterns Compared' },
      color: 'state'
    },
    {
      title: 'Signals vs Observables',
      description: 'Visual comparison of Angular Signals vs RxJS Observables with dependency graphs and update propagation animations.',
      icon: '📡',
      badge: 'Modern',
      badgeClass: '',
      route: '/playground/signals-vs-observables',
      metric: { value: '92%', label: 'Less Renders' },
      color: 'signals'
    },
    {
      title: 'Hydration & SSR/SSG',
      description: 'Compare CSR, SSR, and SSG strategies with Core Web Vitals tracking and hydration visualization.',
      icon: '🌊',
      badge: 'Production',
      badgeClass: '',
      route: '/playground/hydration', // Nota: Necesitarás crear esta ruta
      metric: { value: '0.3s', label: 'First Paint' },
      color: 'hydration'
    }
  ];

  concepts: ConceptCard[] = [
    {
      title: 'Smart/Dumb Components',
      description: 'Separation of concerns with container and presentational components',
      icon: '🎭',
      route: '/playground/concepts/architecture-concepts',
      tags: ['Reusability', 'Testability', 'Maintainability']
    },
    {
      title: 'Facade Pattern',
      description: 'Simplify complex subsystems with a unified interface',
      icon: '🏢',
      route: '/playground/concepts/facade-pattern', // Nota: Crear esta ruta
      tags: ['Abstraction', 'Decoupling', 'Simplified API']
    },
    {
      title: 'Feature Modules',
      description: 'Organize code by feature with lazy loading capabilities',
      icon: '🧩',
      route: '/playground/concepts/feature-modules', // Nota: Crear esta ruta
      tags: ['Lazy Loading', 'Code Splitting', 'Team Scaling']
    },
    {
      title: 'Container/Presenter',
      description: 'Stateful containers with stateless presentational components',
      icon: '📦',
      route: '/playground/concepts/container-presenter', // Nota: Crear esta ruta
      tags: ['State Management', 'UI Logic Separation', 'Component Reuse']
    }
  ];

  fpsBars = [
    { height: 100, critical: false },
    { height: 95, critical: false },
    { height: 92, critical: false },
    { height: 60, critical: true },
    { height: 45, critical: true },
    { height: 85, critical: false },
    { height: 100, critical: false }
  ];

  constructor() { }

  ngOnInit(): void {
    // Inicializar animaciones o datos si es necesario
    this.simulateLiveData();
  }

  private simulateLiveData(): void {
    // Simular datos en vivo para las métricas
    setInterval(() => {
      this.fpsBars = this.fpsBars.map((bar, index) => ({
        height: Math.max(30, Math.min(100, bar.height + (Math.random() * 10 - 5))),
        critical: bar.height < 50
      }));
    }, 2000);
  }

  // Método para trackBy en *ngFor
  trackByLab(index: number, lab: LabCard): string {
    return lab.title;
  }

  trackByConcept(index: number, concept: ConceptCard): string {
    return concept.title;
  }
}
