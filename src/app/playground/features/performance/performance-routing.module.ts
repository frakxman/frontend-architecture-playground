import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerformanceLabComponent } from './pages/performance-lab/performance-lab.component';

const routes: Routes = [
  {
    path: '',  // Ruta: /playground/performance
    component: PerformanceLabComponent
  }
];

@NgModule({  // ← ¡ESTO FALTA!
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformanceRoutingModule { }
