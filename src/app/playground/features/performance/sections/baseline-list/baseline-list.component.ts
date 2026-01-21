import { Component, ChangeDetectorRef } from '@angular/core';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-baseline-list',
  templateUrl: './baseline-list.component.html',
  styleUrls: ['./baseline-list.component.css']
})
export class BaselineListComponent {
  items: any[] = [];
  renderCount = 0;
  isListVisible = false;

  constructor(
    private mockData: MockDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngDoCheck() {
    this.renderCount++;
  }

  loadItems() {
    this.items = this.mockData.generateItems(1000);
    this.isListVisible = true;
  }

  triggerChange() {
    // This will trigger change detection across the entire component tree
    this.items = [...this.items];
  }

  reset() {
    this.items = [];
    this.renderCount = 0;
    this.isListVisible = false;
  }
}
