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
      title: 'SaaS POS Platform',
      description: 'Multi-tenant POS system with modular frontend architecture.',
      stack: ['Angular', 'Vue', 'TypeScript', 'PostgreSQL'],
      highlight: 'Scaled to support SaaS model',
      link: ''
    },
    {
      title: 'E-commerce Platform',
      description: 'Fullstack e-commerce solution.',
      stack: ['Angular', 'NestJS', 'REST'],
      highlight: 'Delivered production-ready features',
      link: ''
    },
    {
      title: 'Frontend Architecture Playground',
      description: 'Architecture comparison and experimentation platform.',
      stack: ['Angular', 'Standalone', 'Modules'],
      highlight: 'Demonstrates architectural decision-making',
      link: '/playground/concepts/overview',
      isInternal: true
    },
    {
      title: 'Amyules Landing Page',
      description: 'Modern, responsive landing page with smooth animations and interactive elements.',
      stack: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
      highlight: 'Clean UI/UX with engaging visual storytelling',
      link: 'https://frakxman.github.io/Amyules/'
    },
    {
      title: 'Frikerx.dev Portfolio',
      description: 'Personal portfolio showcasing multimedia and development work.',
      stack: ['HTML', 'CSS', 'JavaScript'],
      highlight: 'Creative portfolio with multimedia integration',
      link: 'https://frakxman.github.io/frikerx.dev/'
    }
  ];
}
