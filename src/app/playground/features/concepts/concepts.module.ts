import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ConceptsRoutingModule } from './concepts-routing.module';

// Components that exist in your file tree
import { OverviewComponent } from '../concepts/overview/overview.component';
import { ArchitectureConceptsComponent } from '../concepts/architecture-concepts/architecture-concepts.component';

@NgModule({
  declarations: [
    OverviewComponent,
    ArchitectureConceptsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ConceptsRoutingModule
  ]
})
export class ConceptsModule { }
