import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-onpush-list',
  templateUrl: './onpush-list.component.html',
  styleUrls: ['./onpush-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnPushListComponent {
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
    this.cdr.markForCheck();
  }

  triggerChangeWrong() {
    // This WON'T trigger re-render with OnPush (mutating array)
    this.items[0] = { ...this.items[0], name: 'MUTATED!' };
  }

  triggerChangeCorrect() {
    // This WILL trigger re-render (new reference)
    this.items = [...this.items];
    this.cdr.markForCheck();
  }

  reset() {
    this.items = [];
    this.renderCount = 0;
    this.isListVisible = false;
    this.cdr.markForCheck();
  }
}
