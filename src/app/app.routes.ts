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
        loadChildren: () =>
          import('./portfolio/portfolio.routes')
            .then(m => m.PORTFOLIO_ROUTES)
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

