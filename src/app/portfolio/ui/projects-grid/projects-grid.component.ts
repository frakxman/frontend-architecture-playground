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
      description: 'Multi-tenant point-of-sale system serving hundreds of merchants. Led the frontend architecture — designed a modular Angular + Vue component library shared across multiple product surfaces, with strict separation of concerns and OnPush change detection throughout.',
      stack: ['Angular', 'Vue', 'TypeScript', 'RxJS', 'PostgreSQL'],
      highlight: '60% reduction in component duplication · multi-tenant architecture',
      link: ''
    },
    {
      title: 'E-commerce Platform',
      description: 'Fullstack e-commerce solution built from scratch. Angular SPA with a NestJS REST API and PostgreSQL backend. Owned the complete delivery cycle — from database schema design to production deployment — including checkout flow, product catalog, and order management.',
      stack: ['Angular', 'NestJS', 'PostgreSQL', 'REST API', 'TypeScript'],
      highlight: 'Full ownership · delivered end-to-end in 6 months',
      link: ''
    },
    {
      title: 'Amyules Landing Page',
      description: 'Modern, responsive landing page with smooth CSS animations and interactive elements. Focus on visual storytelling and mobile-first responsive design.',
      stack: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
      highlight: 'Clean UI/UX · engaging visual storytelling',
      link: 'https://frakxman.github.io/Amyules/'
    }
  ];
}
