import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaygroundRoutingModule } from './playground-routing.module';
import { PerformanceLabComponent } from './performance-lab/performance-lab.component';


@NgModule({
  declarations: [
    PerformanceLabComponent
  ],
  imports: [
    CommonModule,
    PlaygroundRoutingModule
  ]
})
export class PlaygroundModule { }
