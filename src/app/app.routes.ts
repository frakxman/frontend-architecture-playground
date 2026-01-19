import { Routes } from '@angular/router';
import { AppShellComponent } from './shell/app-shell.component';

export const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      {
        path: '',
        redirectTo: 'portfolio',
        pathMatch: 'full'
      },
      {
        path: 'portfolio',
        loadComponent: () =>
          import('./portfolio/portfolio/portfolio.component')
            .then(m => m.PortfolioComponent)
      },
      {
        path: 'playground',
        loadChildren: () =>
          import('./playground/playground.module')
            .then(m => m.PlaygroundModule)
      }
    ]
  }
];
