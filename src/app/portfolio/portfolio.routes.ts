import { Routes } from '@angular/router';
import { PortfolioLayoutComponent } from './layout/portfolio-layout/portfolio-layout.component';

export const PORTFOLIO_ROUTES: Routes = [
  {
    path: '',
    component: PortfolioLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'about',
        pathMatch: 'full'
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./pages/about/about.component')
            .then(c => c.AboutComponent)
      },
      {
        path: 'experience',
        loadComponent: () =>
          import('./pages/experience/experience.component')
            .then(c => c.ExperienceComponent)
      },
      {
        path: 'projects',
        loadComponent: () =>
          import('./pages/projects/projects.component')
            .then(c => c.ProjectsComponent)
      }
    ]
  }
];
