import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'playground',
    loadChildren: () =>
      import('./playground/playground.module')
        .then(m => m.PlaygroundModule)
  },
  {
    path: 'me',
    loadChildren: () =>
      import('./portfolio/portfolio.routes')
        .then(r => r.PORTFOLIO_ROUTES)
  }
];
