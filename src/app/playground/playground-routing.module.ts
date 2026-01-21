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
        redirectTo: 'performance-lab',
        pathMatch: 'full'
      },
      {
        path: 'performance-lab',
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
