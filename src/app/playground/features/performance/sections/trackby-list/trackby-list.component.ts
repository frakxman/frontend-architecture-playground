// trackby-list.component.ts
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Item } from '../../models/performance.types';

@Component({
  selector: 'app-trackby-list',
  templateUrl: './trackby-list.component.html',
  styleUrls: ['./trackby-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrackbyListComponent {
  @Input() items: Item[] = [];
  @Input() useTrackBy: boolean = false;

  // Propiedades que necesita el template
  isListVisible: boolean = false;
  domUpdateCount: number = 0;
  renderCount: number = 0;

  // Métodos que necesita el template
  loadItems(): void {
    this.isListVisible = true;
    this.domUpdateCount = 0;
    this.renderCount++;
  }

  shuffleItems(): void {
    // Crear nueva referencia del array para trigger cambio
    this.items = [...this.items].sort(() => Math.random() - 0.5);
    this.domUpdateCount += this.useTrackBy ? 1 : this.items.length;
    this.renderCount++;
  }

  reset(): void {
    this.isListVisible = false;
    this.domUpdateCount = 0;
    this.renderCount = 0;
  }

  // Con trackBy - solo actualiza items que cambian
  trackByFn(index: number, item: Item): number {
    return item.id;
  }

  // Sin trackBy - Angular usa la identidad del objeto
  // (siempre actualiza todo)

  getIntensity(value: number): string {
    const intensity = Math.floor(value * 100);
    return `linear-gradient(90deg, rgba(0,255,136,0.2) ${intensity}%, transparent ${intensity}%)`;
  }
}
