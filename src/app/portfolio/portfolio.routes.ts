import { Routes } from '@angular/router';

export const PORTFOLIO_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./portfolio-page/portfolio-page.component')
        .then(m => m.PortfolioPageComponent),
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
