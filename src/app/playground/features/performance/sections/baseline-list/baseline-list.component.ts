import { Component, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { Item } from '../../models/performance.types';

@Component({
  selector: 'app-baseline-list',
  templateUrl: './baseline-list.component.html',
  styleUrls: ['./baseline-list.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class BaselineListComponent implements OnChanges {
  @Input() items: Item[] = [];

  renderCount: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.renderCount++;
    }
  }

  trackByFn(index: number, item: Item): number {
    return item.id;
  }

  getIntensity(value: number): string {
    const intensity = Math.floor(value * 100);
    return `linear-gradient(90deg, rgba(0,255,136,0.2) ${intensity}%, transparent ${intensity}%)`;
  }
}
