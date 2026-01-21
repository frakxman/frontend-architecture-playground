import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PerformanceLabComponent } from './pages/performance-lab/performance-lab.component';
import { BaselineListComponent } from './sections/baseline-list/baseline-list.component';
import { OnPushListComponent } from './sections/onpush-list/onpush-list.component';
import { TrackByListComponent } from './sections/trackby-list/trackby-list.component';
import { ManualSubscribeComponent } from './sections/manual-subscribe/manual-subscribe.component';
import { AsyncPipeComponent } from './sections/async-pipe/async-pipe.component';

const routes: Routes = [
  {
    path: '',
    component: PerformanceLabComponent,
    children: [
      { path: '', redirectTo: 'baseline', pathMatch: 'full' },
      { path: 'baseline', component: BaselineListComponent },
      { path: 'onpush', component: OnPushListComponent },
      { path: 'trackby', component: TrackByListComponent },
      { path: 'manual-subscribe', component: ManualSubscribeComponent },
      { path: 'async-pipe', component: AsyncPipeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformanceRoutingModule { }
