import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  // Mock data for animations
  fpsBars = [
    { height: 100, critical: false },
    { height: 95, critical: false },
    { height: 92, critical: false },
    { height: 60, critical: true },
    { height: 45, critical: true },
    { height: 85, critical: false },
    { height: 100, critical: false }
  ];

  labs = [
    {
      title: 'Performance Lab',
      description: 'Compare change detection strategies...',
      icon: '⚡',
      badge: 'Hot',
      color: 'performance',
      metric: { value: '85%', label: 'Performance Gain' },
      route: '/playground/performance-lab'
    },
    // ... otros labs
  ];

  concepts = [
    {
      title: 'Smart/Dumb Components',
      description: 'Separation of concerns...',
      icon: '🎭',
      route: '/playground/concepts/architecture-concepts'
    },
    // ... otros conceptos
  ];

  constructor() { }

  ngOnInit(): void { }

  // Si necesitas navegar programáticamente
  navigateToLab(route: string): void {
    // La navegación se maneja con routerLink en el HTML
    console.log('Navigating to:', route);
  }
}
