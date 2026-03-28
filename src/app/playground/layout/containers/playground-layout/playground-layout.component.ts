import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PLAYGROUND_FUTURE_FEATURES } from '../../../playground-future-features.registry';

@Component({
  selector: 'app-playground-layout',
  templateUrl: './playground-layout.component.html',
  styleUrls: ['./playground-layout.component.css']
})
export class PlaygroundLayoutComponent implements OnInit {

  // Current page info
  currentTitle = 'Architecture Playground';
  currentSubtitle = 'Interactive exploration of Angular architectural patterns';
  showHeader = true;
  routerOutletActive = false;
  mobileMenuOpen = false;
  isRedirecting = false;

  // Available implementations for toggling
  currentImplementation = 0;
  implementations = [
    { name: 'Classic Services + RxJS', icon: '🔄' },
    { name: 'Smart/Dumb Components', icon: '🎭' },
    { name: 'Signals Architecture', icon: '⚡' },
    { name: 'Facade Pattern', icon: '🏢' }
  ];

  // Route mappings for titles con flag isLab
  private routeTitles: { [key: string]: {
    title: string,
    subtitle: string,
    isLab?: boolean
  } } = {
    '/playground': {
      title: 'Architecture Playground',
      subtitle: 'Interactive exploration of Angular architectural patterns',
      isLab: false
    },
    '/playground/concepts/overview': {
      title: 'Overview',
      subtitle: 'Getting started with Angular Architecture',
      isLab: false // ← NO es Lab
    },
    '/playground/concepts/architecture-concepts': {
      title: 'Architecture Concepts',
      subtitle: 'Core architectural patterns and principles',
      isLab: false // ← NO es Lab
    },
    '/playground/performance': {
      title: 'Performance Lab',
      subtitle: 'Compare change detection strategies: Default vs OnPush vs Manual',
      isLab: true // ← SÍ es Lab
    },
    '/playground/state-management': {
      title: 'State Management',
      subtitle: 'Different approaches to managing state in Angular applications',
      isLab: true // ← SÍ es Lab
    },
    '/playground/signals-vs-observables': {
      title: 'Signals vs Observables',
      subtitle: 'Compare Angular Signals with RxJS Observables',
      isLab: true // ← SÍ es Lab
    }
  };

  constructor(private router: Router) {
    for (const f of PLAYGROUND_FUTURE_FEATURES) {
      this.routeTitles[`/playground/${f.path}`] = {
        title: f.title,
        subtitle: f.subtitle,
        isLab: false
      };
    }
  }

  ngOnInit() {
    // Detectar redirecciones
    this.router.events.pipe(
      filter((event: Event): event is NavigationStart => event instanceof NavigationStart)
    ).subscribe((event: NavigationStart) => {
      if (event.url === '/playground' || event.url === '/playground/') {
        this.isRedirecting = true;
      }
    });

    // Watch route changes
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isRedirecting = false;
      this.updatePageInfo(event.url);
    });

    this.updatePageInfo(this.router.url);
  }

  ngOnDestroy(): void {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  /** Coincidencia por prefijo (rutas hijas) cuando no hay clave exacta en routeTitles */
  private matchRouteByPrefix(
    url: string
  ): { title: string; subtitle: string; isLab?: boolean } | undefined {
    const entries = Object.entries(this.routeTitles)
      .filter(([key]) => key !== '/playground')
      .sort(([a], [b]) => b.length - a.length);

    for (const [key, info] of entries) {
      if (url === key || url.startsWith(`${key}/`)) {
        return info;
      }
    }
    return undefined;
  }

  private updatePageInfo(url: string) {
    const path = url.replace(/\/$/, '') || '/';
    // Check if we're on dashboard (and not redirecting)
    const isDashboard =
      (path === '/playground' || path === '/playground/') && !this.isRedirecting;

    this.routerOutletActive = !isDashboard;

    // Get route info (exact match; trailing slash normalized above)
    const routeInfo =
      this.routeTitles[path] ||
      this.matchRouteByPrefix(path) ||
      this.routeTitles['/playground'];
    this.currentTitle = routeInfo.title;
    this.currentSubtitle = routeInfo.subtitle;

    // MOSTRAR HEADER solo si es Lab y no es dashboard
    this.showHeader = routeInfo.isLab === true && !isDashboard;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    this.syncBodyScrollLock();
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
    this.syncBodyScrollLock();
  }

  /** Evita scroll del documento detrás del drawer en móvil */
  private syncBodyScrollLock(): void {
    if (typeof document === 'undefined') {
      return;
    }
    document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : '';
  }

  onNavClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target?.closest?.('a')) {
      this.closeMobileMenu();
    }
  }

  toggleImplementation() {
    this.currentImplementation = (this.currentImplementation + 1) % this.implementations.length;
    console.log('Switched to:', this.implementations[this.currentImplementation].name);
  }

  resetDemo() {
    console.log('Demo reset');
  }
}
