import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

interface NavItem {
  path: string;
  title: string;
  subtitle: string;
  icon: string;
}

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

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }

  onNavClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target?.closest?.('a')) {
      this.closeMobileMenu();
    }
  }

  // Available implementations for toggling
  currentImplementation = 0;
  implementations = [
    { name: 'Classic Services + RxJS', icon: '🔄' },
    { name: 'Smart/Dumb Components', icon: '🎭' },
    { name: 'Signals Architecture', icon: '⚡' },
    { name: 'Facade Pattern', icon: '🏢' }
  ];

  // Route mappings for titles
  private routeTitles: { [key: string]: { title: string, subtitle: string } } = {
    '/playground': {
      title: 'Architecture Playground',
      subtitle: 'Interactive exploration of Angular architectural patterns'
    },
    '/playground/performance-lab': {
      title: 'Performance Lab',
      subtitle: 'Compare change detection strategies: Default vs OnPush vs Manual'
    },
    '/playground/state-management': {
      title: 'State Management',
      subtitle: 'Different approaches to managing state in Angular applications'
    },
    '/playground/signals-vs-observables': {
      title: 'Signals vs Observables',
      subtitle: 'Compare Angular Signals with RxJS Observables'
    },
    '/playground/smart-dumb-components': {
      title: 'Smart/Dumb Components',
      subtitle: 'Container/Presenter pattern implementation'
    },
    '/playground/facade-pattern': {
      title: 'Facade Pattern',
      subtitle: 'Simplifying complex subsystems with a unified interface'
    },
    '/playground/security': {
      title: 'Security',
      subtitle: 'Angular security best practices and patterns'
    },
    '/playground/accessibility': {
      title: 'Accessibility',
      subtitle: 'Building accessible Angular applications'
    },
    '/playground/comparisons': {
      title: 'Pattern Comparisons',
      subtitle: 'Compare different architectural patterns side by side'
    }
  };

  constructor(private router: Router) {}

  ngOnInit() {
    // Watch route changes to update titles - FIXED TYPE ERROR
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updatePageInfo(event.url);
    });

    // Initial update
    this.updatePageInfo(this.router.url);
  }

  private updatePageInfo(url: string) {
    // Check if we're on a specific topic or the dashboard
    const isDashboard = url === '/playground' || url === '/playground/';

    this.routerOutletActive = !isDashboard;
    this.showHeader = !isDashboard;

    // Find matching title or use default
    const routeInfo = this.routeTitles[url] || this.routeTitles['/playground'];
    this.currentTitle = routeInfo.title;
    this.currentSubtitle = routeInfo.subtitle;
  }

  toggleImplementation() {
    this.currentImplementation = (this.currentImplementation + 1) % this.implementations.length;
    // Here you would trigger the actual implementation switch
    console.log('Switched to:', this.implementations[this.currentImplementation].name);
  }

  resetDemo() {
    // Reset any active demo state
    console.log('Demo reset');
    // You would implement actual reset logic here
  }
}
