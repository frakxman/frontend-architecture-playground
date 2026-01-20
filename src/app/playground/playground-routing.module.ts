import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaygroundLayoutComponent } from './layouts/playground-layout/playground-layout.component';

const routes: Routes = [
  {
    path: '',
    component: PlaygroundLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'performance',
        pathMatch: 'full'
      },
      {
        path: 'performance',
        loadChildren: () =>
          import('./features/performance/performance.module')
            .then(m => m.PerformanceModule)
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaygroundRoutingModule { }
