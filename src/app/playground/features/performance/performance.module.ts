import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PerformanceRoutingModule } from './performance-routing.module';
// Pages
import { PerformanceLabComponent } from './pages/performance-lab/performance-lab.component';

// Components
import { BaselineListComponent } from './sections/baseline-list/baseline-list.component';
import { OnpushListComponent } from './sections/onpush-list/onpush-list.component';
import { TrackbyListComponent } from './sections/trackby-list/trackby-list.component';
import { HeatMapComponent } from './sections/heat-map/heat-map.component';
import { FpsCounterComponent } from './sections/fps-counter/fps-counter.component';
import { StrategyComparisonComponent } from './sections/strategy-comparison/strategy-comparison.component';

@NgModule({
  declarations: [
    // Pages
    PerformanceLabComponent,
    // Components
    BaselineListComponent,
    OnpushListComponent,
    TrackbyListComponent,
    HeatMapComponent,
    FpsCounterComponent,
    StrategyComparisonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    // Routing
    PerformanceRoutingModule
  ]
})
export class PerformanceModule { }



