import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-onpush-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './onpush-list.component.html'
})
export class OnPushListComponent {
  items = this.data.generateItems();

  constructor(private data: MockDataService) {}

  shuffle() {
    this.items = [...this.items];
  }
}
