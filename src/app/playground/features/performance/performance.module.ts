import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PerformanceRoutingModule } from './performance-routing.module';

import { PerformanceLabComponent } from './pages/performance-lab/performance-lab.component';
import { AsyncPipeComponent } from './sections/async-pipe/async-pipe.component';
import { BaselineListComponent } from './sections/baseline-list/baseline-list.component';
import { ManualSubscribeComponent } from './sections/manual-subscribe/manual-subscribe.component';
import { OnPushListComponent } from './sections/onpush-list/onpush-list.component';
import { RxjsLabComponent } from './sections/rxjs-lab/rxjs-lab.component';
import { TrackByListComponent } from './sections/trackby-list/trackby-list.component';

@NgModule({
  declarations: [
    PerformanceLabComponent,
    AsyncPipeComponent,
    BaselineListComponent,
    ManualSubscribeComponent,
    OnPushListComponent,
    RxjsLabComponent,
    TrackByListComponent
  ],
  imports: [
    CommonModule,  
    RouterModule,
    PerformanceRoutingModule
  ]
})
export class PerformanceModule { }
