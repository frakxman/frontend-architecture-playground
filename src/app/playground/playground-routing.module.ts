import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerformanceLabComponent } from './performance-lab/performance-lab.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'performance-lab',
    pathMatch: 'full'
  },
  {
    path: 'performance-lab',
    component: PerformanceLabComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaygroundRoutingModule { }
