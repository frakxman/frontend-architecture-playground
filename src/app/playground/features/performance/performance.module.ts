import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MockDataService } from "./services/mock-data.service";

import { PerformanceLabComponent } from "./pages/performance-lab/performance-lab.component";
import { BaselineListComponent } from "./sections/baseline-list/baseline-list.component";
import { OnPushListComponent } from "./sections/onpush-list/onpush-list.component";
import { TrackByListComponent } from "./sections/trackby-list/trackby-list.component";

@NgModule({
  declarations: [
    PerformanceLabComponent,
    BaselineListComponent,
    OnPushListComponent,
    TrackByListComponent
  ],
  imports: [CommonModule],
  providers: [MockDataService]
})
export class PerformanceModule {}
