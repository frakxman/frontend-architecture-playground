import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { MockDataService } from '../../services/mock-data.service';
import { ComponentMetric, Item } from '../../models/performance.types';

const STRATEGY_INFO: Record<string, { title: string; description: string; bullets: string[] }> = {
  default: {
    title: 'Default Strategy',
    description: 'Angular checks every component in the tree on each event (click, timer, XHR). Simple but can be costly for large apps.',
    bullets: [
      'Checks all components on every event',
      'Easy to use — works out of the box',
      'Can cause unnecessary renders in large trees',
    ],
  },
  onpush: {
    title: 'OnPush Strategy',
    description: 'Angular skips the component unless an @Input() changes by reference, an internal event fires, or an Observable emits.',
    bullets: [
      'Only checks when @Input() reference changes',
      'Requires immutable data patterns',
      'Reduces unnecessary renders by up to 95%',
    ],
  },
  zoneless: {
    title: 'Zoneless (Angular 18+)',
    description: 'Removes Zone.js entirely. You control when change detection runs via signals or markForCheck().',
    bullets: [
      'No Zone.js — ~25% smaller bundle',
      'Maximum performance, full control',
      'Requires explicit change detection triggers',
    ],
  },
};

@Component({
  selector: 'app-performance-lab',
  templateUrl: './performance-lab.component.html',
  styleUrls: ['./performance-lab.component.css'],
})
export class PerformanceLabComponent implements OnInit, OnDestroy {

  // Strategy
  selectedStrategy: 'default' | 'onpush' | 'zoneless' = 'default';
  strategyInfo = STRATEGY_INFO['default'];

  // Live metrics
  fps = 60;
  fpsHistory: number[] = Array(20).fill(60);
  frameDrop = 0;
  renderTime = 4.2;
  cpuUsage = 23;
  memoryUsage = 42;
  heapSize = 128;
  changeDetectionCount = 0;
  totalRenders = 0;
  unnecessaryRenders = 0;

  get unnecessaryRendersPercent(): number {
    if (this.totalRenders === 0) return 0;
    return Math.round((this.unnecessaryRenders / this.totalRenders) * 100);
  }

  // Demo values
  defaultValue = 0;
  onPushValue = 0;
  zonelessValue = 'Waiting for action...';
  defaultRenders = 0;
  onPushRenders = 0;

  // Comparison metrics
  baselineRenders = 0;
  baselineRenderTime = 12;
  onpushRenders = 0;
  onpushRenderTime = 3;
  performanceGain = 75;

  // TrackBy demo
  withoutTrackByOps = 0;
  withTrackByOps = 0;

  // Items
  items$!: Observable<Item[]>;
  items: Item[] = [];

  // Heat map
  componentMetrics: ComponentMetric[] = [
    { name: 'Header',       renderCount: 12,  lastRenderTime: 2,  colorIntensity: 5  },
    { name: 'FPS Counter',  renderCount: 60,  lastRenderTime: 1,  colorIntensity: 30 },
    { name: 'Default List', renderCount: 100, lastRenderTime: 12, colorIntensity: 50 },
    { name: 'OnPush List',  renderCount: 4,   lastRenderTime: 3,  colorIntensity: 5  },
    { name: 'TrackBy Demo', renderCount: 20,  lastRenderTime: 5,  colorIntensity: 15 },
    { name: 'Controls',     renderCount: 2,   lastRenderTime: 1,  colorIntensity: 2  },
  ];

  // Controls
  autoUpdate = true;
  updateInterval = 500;
  performanceScore = 0;
  performanceScoreColor = '';
  performanceMessage = '';

  private subscriptions = new Subscription();
  private autoUpdateSub?: Subscription;

  constructor(
    private mockDataService: MockDataService,
    private cdr: ChangeDetectorRef
  ) {
    this.items$ = this.mockDataService.getItems().pipe(
      tap(items => this.items = items)
    );
  }

  ngOnInit(): void {
    this.startMetricsSimulation();
    this.startFpsMonitoring();
    this.restartAutoUpdate();
    this.calculatePerformanceScore();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.autoUpdateSub?.unsubscribe();
  }

  // ── Strategy ────────────────────────────────────────────────────────────

  selectStrategy(strategy: 'default' | 'onpush' | 'zoneless'): void {
    this.selectedStrategy = strategy;
    this.strategyInfo = STRATEGY_INFO[strategy];
    this.calculatePerformanceScore();
  }

  // ── Demo actions ─────────────────────────────────────────────────────────

  incrementDefault(): void {
    this.defaultValue++;
    this.defaultRenders++;
    this.totalRenders++;
    this.unnecessaryRenders++;
    this.updateHeatMap('Default List', 1);
  }

  incrementOnPush(): void {
    this.onPushValue++;
    this.onPushRenders++;
    // Mutation: in a real OnPush child this would NOT trigger re-render
  }

  updateOnPushWithNewRef(): void {
    this.onPushValue = this.onPushValue + 1;
    this.onPushRenders++;
    this.totalRenders++;
    this.updateHeatMap('OnPush List', 1);
  }

  updateZoneless(): void {
    this.zonelessValue = `Updated without detection: ${new Date().toLocaleTimeString()}`;
    // In real zoneless mode this would NOT update the view automatically
  }

  updateZonelessAndDetect(): void {
    this.zonelessValue = `✅ Detected: ${new Date().toLocaleTimeString()}`;
    this.cdr.detectChanges();
    this.totalRenders++;
  }

  // ── List actions ─────────────────────────────────────────────────────────

  addRandomItem(): void {
    const newId = this.items.length > 0
      ? Math.max(...this.items.map(i => i.id)) + 1
      : 0;

    const newItem: Item = {
      id: newId,
      name: `Item ${this.items.length + 1}`,
      value: Math.floor(Math.random() * 100),
      category: (['A', 'B', 'C'] as const)[Math.floor(Math.random() * 3)],
      timestamp: new Date(),
      isActive: true,
      metadata: { created: new Date(), updated: new Date(), version: 1 },
    };

    this.items = [...this.items, newItem];
    this.mockDataService.updateItems(this.items);
    this.withoutTrackByOps += this.items.length;
    this.withTrackByOps += 1;
  }

  updateRandomItem(): void {
    if (this.items.length === 0) return;
    const index = Math.floor(Math.random() * this.items.length);
    this.items = [
      ...this.items.slice(0, index),
      { ...this.items[index], value: Math.floor(Math.random() * 100) },
      ...this.items.slice(index + 1),
    ];
    this.mockDataService.updateItems(this.items);
    this.withoutTrackByOps += this.items.length;
    this.withTrackByOps += 1;
  }

  // ── Interval control ─────────────────────────────────────────────────────

  onIntervalChange(): void {
    this.restartAutoUpdate();
  }

  private restartAutoUpdate(): void {
    this.autoUpdateSub?.unsubscribe();
    this.autoUpdateSub = interval(this.updateInterval).subscribe(() => {
      if (!this.autoUpdate) return;

      this.updateRandomItem();
      this.baselineRenders += this.items.length || 100;
      this.onpushRenders += 1;

      if (this.baselineRenders > 0) {
        const totalBaseline = this.baselineRenders * this.baselineRenderTime;
        const totalOnpush = this.onpushRenders * this.onpushRenderTime;
        this.performanceGain = Math.min(99, Math.floor(100 - (totalOnpush / totalBaseline) * 100));
      }
    });
  }

  // ── Metrics ──────────────────────────────────────────────────────────────

  private startMetricsSimulation(): void {
    const sub = interval(1000).subscribe(() => {
      this.cpuUsage = Math.floor(20 + Math.random() * 30);
      this.memoryUsage = Math.floor(35 + Math.random() * 20);
      this.changeDetectionCount = Math.floor(40 + Math.random() * 60);
      this.renderTime = +(3 + Math.random() * 8).toFixed(1);
      this.frameDrop = this.cpuUsage > 70 ? 15 : this.cpuUsage > 50 ? 8 : 2;
      this.updateHeatMapsFromUsage();
      this.calculatePerformanceScore();
    });
    this.subscriptions.add(sub);
  }

  private startFpsMonitoring(): void {
    const sub = interval(100).subscribe(() => {
      let base = this.selectedStrategy === 'default'  ? 45 + Math.floor(Math.random() * 15)
               : this.selectedStrategy === 'onpush'   ? 55 + Math.floor(Math.random() * 10)
               :                                        58 + Math.floor(Math.random() * 7);

      if (this.cpuUsage > 80) base = Math.max(20, base - 15);
      else if (this.cpuUsage > 60) base = Math.max(30, base - 8);

      this.fps = base;
      this.fpsHistory = [...this.fpsHistory.slice(1), base];
    });
    this.subscriptions.add(sub);
  }

  private updateHeatMap(name: string, increment: number): void {
    const comp = this.componentMetrics.find(c => c.name === name);
    if (comp) {
      comp.renderCount += increment;
      comp.colorIntensity = Math.min(100, comp.colorIntensity + increment * 2);
    }
  }

  private updateHeatMapsFromUsage(): void {
    this.componentMetrics.forEach(comp => {
      if (comp.name === 'FPS Counter') {
        comp.colorIntensity = Math.min(100, Math.floor((this.fps / 60) * 100));
      } else if (comp.name === 'Default List') {
        comp.colorIntensity = Math.min(100, Math.floor(this.baselineRenders / 20));
      } else if (comp.name === 'OnPush List') {
        comp.colorIntensity = Math.min(100, Math.floor(this.onpushRenders / 5));
      }
    });
  }

  private calculatePerformanceScore(): void {
    let score = 100;
    score -= Math.min(30, this.unnecessaryRenders / 10);
    if (this.fps < 30) score -= 20;
    else if (this.fps < 45) score -= 10;
    if (this.selectedStrategy === 'onpush')   score += 10;
    if (this.selectedStrategy === 'zoneless') score += 15;

    this.performanceScore = Math.max(0, Math.min(100, Math.floor(score)));

    const degrees = (this.performanceScore / 100) * 360;
    this.performanceScoreColor = `conic-gradient(#00ff88 0deg ${degrees}deg, #444 ${degrees}deg 360deg)`;

    this.performanceMessage =
      this.performanceScore < 40 ? 'Needs urgent optimization' :
      this.performanceScore < 70 ? 'Acceptable — can be improved with OnPush' :
                                   'Excellent! Optimal change detection usage';
  }

  resetMetrics(): void {
    this.baselineRenders = 0;
    this.onpushRenders = 0;
    this.defaultRenders = 0;
    this.onPushRenders = 0;
    this.totalRenders = 0;
    this.unnecessaryRenders = 0;
    this.withoutTrackByOps = 0;
    this.withTrackByOps = 0;
    this.componentMetrics.forEach(c => { c.renderCount = 0; c.colorIntensity = 0; });
    this.calculatePerformanceScore();
  }

  // ── Getters ──────────────────────────────────────────────────────────────

  get fpsStatus(): string {
    return this.fps >= 50 ? 'Smooth' : this.fps >= 30 ? 'Okay' : 'Laggy';
  }

  get fpsStatusClass(): string {
    return this.fps >= 50 ? 'good' : this.fps >= 30 ? 'warning' : 'bad';
  }
}
