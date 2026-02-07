import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaygroundLayoutComponent } from './layout/containers/playground-layout/playground-layout.component';

const routes: Routes = [
  {
    path: '',
    component: PlaygroundLayoutComponent,
    children: [
      {
        path: 'concepts',
        loadChildren: () => import('./features/concepts/concepts.module').then(m => m.ConceptsModule)
      },
      {
        path: 'performance',
        loadChildren: () => import('./features/performance/performance.module').then(m => m.PerformanceModule)
      },
      {
        path: 'state-management',
        loadChildren: () => import('./features/state-management-lab/state-management-lab.module').then(m => m.StateManagementLabModule)
      },
      {
        path: 'signals-vs-observables',
        loadChildren: () => import('./features/signals-lab/signals-lab.module').then(m => m.SignalsLabModule)
      },
      { path: '', redirectTo: 'concepts/overview', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaygroundRoutingModule { }
