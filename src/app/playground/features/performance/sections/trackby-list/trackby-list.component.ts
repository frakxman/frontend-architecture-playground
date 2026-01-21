import { Component } from '@angular/core';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-trackby-list',
  templateUrl: './trackby-list.component.html',
  styleUrls: ['./trackby-list.component.css']
})
export class TrackByListComponent {
  items: any[] = [];
  renderCount = 0;
  domUpdateCount = 0;
  isListVisible = false;

  constructor(private mockData: MockDataService) {}

  ngDoCheck() {
    this.renderCount++;
  }

  loadItems() {
    this.items = this.mockData.generateItems(1000);
    this.isListVisible = true;
  }

  shuffleItems() {
    // Shuffle the array to show trackBy preventing DOM recreation
    this.items = this.items
      .map(item => ({ ...item, value: Math.random() }))
      .sort(() => Math.random() - 0.5);
    this.domUpdateCount++;
  }

  trackByFn(index: number, item: any): number {
    return item.id; // Track by unique ID instead of object reference
  }

  reset() {
    this.items = [];
    this.renderCount = 0;
    this.domUpdateCount = 0;
    this.isListVisible = false;
  }
}
