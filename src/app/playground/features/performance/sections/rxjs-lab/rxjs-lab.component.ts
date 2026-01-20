import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-rxjs-lab',
  templateUrl: './rxjs-lab.component.html',
  styleUrls: ['./rxjs-lab.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RxjsLabComponent {
  cold$ = this.data.coldStream$;
  shared$ = this.data.sharedStream$;

  constructor(private data: MockDataService) {}
}
