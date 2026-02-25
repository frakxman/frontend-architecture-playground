// components/heat-map/heat-map.component.ts
import { Component, Input } from '@angular/core';
import { ComponentMetric } from '../../models/performance.types';

@Component({
  selector: 'app-heat-map',
  templateUrl: './heat-map.component.html',
  styleUrls: ['./heat-map.component.css']
})
export class HeatMapComponent {
  @Input() components: ComponentMetric[] = []; // <-- USAR ComponentMetric

  getIntensityClass(intensity: number): string {
    if (intensity < 30) return 'low';
    if (intensity < 70) return 'medium';
    return 'high';
  }

  getHeatColor(intensity: number): string {
    // De verde (bajo) a rojo (alto)
    const r = Math.min(255, Math.floor(255 * (intensity / 100)));
    const g = Math.min(255, Math.floor(255 * (1 - intensity / 100)));
    return `rgb(${r}, ${g}, 0)`;
  }
}
