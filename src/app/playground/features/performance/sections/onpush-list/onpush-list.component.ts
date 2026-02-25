// onpush-list.component.ts
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Item } from '../../models/performance.types';

@Component({
  selector: 'app-onpush-list',
  templateUrl: './onpush-list.component.html',
  styleUrls: ['./onpush-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnpushListComponent {
  @Input() items: Item[] = [];

  // Propiedades que necesita el template
  isListVisible: boolean = false;
  renderCount: number = 0;

  // Métodos que necesita el template
  loadItems(): void {
    this.isListVisible = true;
    this.renderCount++;
  }

  triggerChangeWrong(): void {
    // Esta mutación NO debería actualizar la vista en OnPush
    if (this.items.length > 0) {
      this.items[0].value = Math.random();
    }
  }

  triggerChangeCorrect(): void {
    // Esta SÍ actualiza la vista porque crea nueva referencia
    if (this.items.length > 0) {
      this.items = [
        { ...this.items[0], value: Math.random() },
        ...this.items.slice(1)
      ];
      this.renderCount++;
    }
  }

  reset(): void {
    this.isListVisible = false;
    this.renderCount = 0;
  }

  trackByFn(index: number, item: Item): number {
    return item.id;
  }

  getIntensity(value: number): string {
    const intensity = Math.floor(value * 100);
    return `linear-gradient(90deg, rgba(0,255,136,0.2) ${intensity}%, transparent ${intensity}%)`;
  }
}
