import { Component, Input } from '@angular/core';
import { ComponentMetric } from '../../models/performance.types';

@Component({
  selector: 'app-heat-map',
  templateUrl: './heat-map.component.html',
  styleUrls: ['./heat-map.component.css']
})
export class HeatMapComponent {
  @Input() components: ComponentMetric[] = [];

  get sorted(): ComponentMetric[] {
    return [...this.components].sort((a, b) => b.colorIntensity - a.colorIntensity);
  }

  getHeatColor(intensity: number): string {
    if (intensity < 30) {
      // cool: dark blue → teal
      const t = intensity / 30;
      return `rgba(${Math.floor(30 + t * 20)}, ${Math.floor(80 + t * 100)}, ${Math.floor(180 + t * 40)}, 0.15)`;
    } else if (intensity < 70) {
      // warm: amber
      const t = (intensity - 30) / 40;
      return `rgba(${Math.floor(180 + t * 60)}, ${Math.floor(120 - t * 60)}, 0, 0.18)`;
    } else {
      // hot: red
      const t = (intensity - 70) / 30;
      return `rgba(${Math.floor(220 + t * 35)}, ${Math.floor(50 - t * 30)}, 0, ${0.2 + t * 0.15})`;
    }
  }

  getBorderColor(intensity: number): string {
    if (intensity < 30)  return `rgba(59, 130, 246, ${0.15 + intensity / 100})`;
    if (intensity < 70)  return `rgba(245, 158, 11, ${0.2 + (intensity - 30) / 100})`;
    return `rgba(239, 68, 68, ${0.3 + (intensity - 70) / 100})`;
  }

  getBarColor(intensity: number): string {
    if (intensity < 30)  return '#3b82f6';
    if (intensity < 70)  return '#f59e0b';
    return '#ef4444';
  }

  getLabel(intensity: number): { text: string; cls: string } {
    if (intensity < 30)  return { text: 'Cool',   cls: 'label--cool' };
    if (intensity < 70)  return { text: 'Warm',   cls: 'label--warm' };
    if (intensity < 90)  return { text: 'Hot',    cls: 'label--hot'  };
    return               { text: 'Critical', cls: 'label--critical' };
  }

  trackByName(_: number, c: ComponentMetric): string {
    return c.name;
  }
}
