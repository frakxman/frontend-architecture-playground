import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PerformanceRoutingModule } from "./performance-routing.module";

import { MockDataService } from "./services/mock-data.service";

import { PerformanceLabComponent } from "./pages/performance-lab/performance-lab.component";
import { BaselineListComponent } from "./sections/baseline-list/baseline-list.component";
import { OnPushListComponent } from "./sections/onpush-list/onpush-list.component";
import { TrackByListComponent } from "./sections/trackby-list/trackby-list.component";
import { RxjsLabComponent } from "./sections/rxjs-lab/rxjs-lab.component";
import { ManualSubscribeComponent } from "./sections/manual-subscribe/manual-subscribe.component";
import { AsyncPipeComponent } from "./sections/async-pipe/async-pipe.component";

@NgModule({
  declarations: [
    PerformanceLabComponent,
    BaselineListComponent,
    OnPushListComponent,
    TrackByListComponent,
    RxjsLabComponent,
    AsyncPipeComponent,
    ManualSubscribeComponent,
  ],
  imports: [
    CommonModule,
    PerformanceRoutingModule
  ],
  providers: [MockDataService]
})
export class PerformanceModule {
  constructor() {
    console.log('🚀 PerformanceModule loaded!');
  }
}
