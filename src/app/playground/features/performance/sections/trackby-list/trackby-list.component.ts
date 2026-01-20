import { Component } from '@angular/core';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-trackby-list',
  templateUrl: './trackby-list.component.html'
})
export class TrackByListComponent {
  items = this.data.generateItems();

  constructor(private data: MockDataService) {}

  shuffle() {
    this.items = [...this.items];
  }

  trackById(_: number, item: any) {
    return item.id;
  }
}
