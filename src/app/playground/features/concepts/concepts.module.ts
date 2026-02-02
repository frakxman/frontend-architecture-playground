import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConceptsRoutingModule } from './concepts-routing.module';

import { OverviewComponent } from './overview/overview.component';
import { ArchitectureConceptsComponent } from './architecture-concepts/architecture-concepts.component';

@NgModule({
  declarations: [
    OverviewComponent,
    ArchitectureConceptsComponent
  ],
  imports: [
    CommonModule,
    ConceptsRoutingModule
  ]
})
export class ConceptsModule { }
