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
      highlight: 'Scaled to support SaaS model'
    },
    {
      title: 'E-commerce Platform',
      description: 'Fullstack e-commerce solution.',
      stack: ['Angular', 'NestJS', 'REST'],
      highlight: 'Delivered production-ready features'
    },
    {
      title: 'Frontend Architecture Playground',
      description: 'Architecture comparison and experimentation platform.',
      stack: ['Angular', 'Standalone', 'Modules'],
      highlight: 'Demonstrates architectural decision-making'
    }
  ];
}
