import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../project-card/project-card.component';

@Component({
  standalone: true,
  selector: 'app-projects-grid',
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './projects-grid.component.html',
  styleUrls: ['./projects-grid.component.scss']
})
export class ProjectsGridComponent {
  projects = [
    {
      title: 'Angular Architecture Playground',
      description: 'Interactive platform for exploring Angular internals — performance benchmarks with real-time FPS monitoring, Signals vs Observables side-by-side, and state management pattern comparisons. Built as a live portfolio of architecture decisions.',
      stack: ['Angular 17', 'Signals', 'RxJS', 'TypeScript', 'Lazy Loading'],
      highlight: '3 interactive labs · change detection · state management · signals',
      link: '/playground/concepts/overview',
      isInternal: true
    },
    {
      title: 'SaaS POS Platform',
      description: 'Multi-tenant point-of-sale system at Syscomp de Colombia. Led frontend architecture — modular Angular + Vue component library shared across multiple product surfaces, with OnPush change detection and a strategic migration from MySQL to PostgreSQL.',
      stack: ['Angular', 'Vue', 'TypeScript', 'RxJS', 'PostgreSQL'],
      highlight: 'Improved maintainability · faster feature delivery · 15% engagement increase',
      link: ''
    },
    {
      title: 'E-commerce Platform',
      description: 'Fullstack e-commerce solution built from scratch. Angular SPA with a NestJS REST API and PostgreSQL backend. Owned the complete delivery cycle — from database schema design to production deployment — including checkout flow, product catalog, and order management.',
      stack: ['Angular', 'NestJS', 'PostgreSQL', 'REST API', 'TypeScript'],
      highlight: 'Full ownership · delivered end-to-end in 6 months',
      link: ''
    }
  ];
}
