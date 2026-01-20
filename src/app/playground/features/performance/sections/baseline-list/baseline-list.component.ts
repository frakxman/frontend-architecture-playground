import { Component } from '@angular/core';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-baseline-list',
  templateUrl: './baseline-list.component.html'
})
export class BaselineListComponent {
  items = this.data.generateItems();

  constructor(private data: MockDataService) {}

  shuffle() {
    this.items = [...this.items];
  }
}
