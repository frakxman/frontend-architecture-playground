import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerformanceLabComponent } from './pages/performance-lab/performance-lab.component';

const routes: Routes = [
  {
    path: '',
    component: PerformanceLabComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformanceRoutingModule { }
