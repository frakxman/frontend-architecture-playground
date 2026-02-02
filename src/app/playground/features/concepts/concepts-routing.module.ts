import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { ArchitectureConceptsComponent } from './architecture-concepts/architecture-concepts.component';

const routes: Routes = [
  { path: 'overview', component: OverviewComponent },
  { path: 'architecture-concepts', component: ArchitectureConceptsComponent },
  { path: '', redirectTo: 'overview', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConceptsRoutingModule { }
