import { Routes } from '@angular/router';
import { PortfolioComponent } from './portfolio/portfolio.component';

export const PORTFOLIO_ROUTES: Routes = [
  {
    path: '',
    component: PortfolioComponent,
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
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./pages/contact/contact.component')
            .then(c => c.ContactComponent)
      }
    ]
  }
];
