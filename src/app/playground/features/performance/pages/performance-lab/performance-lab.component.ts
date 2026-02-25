// performance-lab.component.ts
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { MockDataService } from '../../services/mock-data.service';
import { PerformanceService } from '../../services/performance-service.service';
import { FpsService } from '../../services/fps-service.service';

import { ComponentMetric, Item } from '../../models/performance.types';

@Component({
  selector: 'app-performance-lab',
  templateUrl: './performance-lab.component.html',
  styleUrls: ['./performance-lab.component.css'],
})
export class PerformanceLabComponent implements OnInit, OnDestroy {
  // Estrategia seleccionada
  selectedStrategy: 'default' | 'onpush' | 'zoneless' = 'default';

  // Métricas en vivo
  fps: number = 60;
  fpsHistory: number[] = Array(20).fill(60);
  frameDrop: number = 0;
  renderTime: number = 4.2;
  cpuUsage: number = 23;
  memoryUsage: number = 42;
  heapSize: number = 128;
  changeDetectionCount: number = 0;
  totalRenders: number = 1248;
  unnecessaryRenders: number = 978;
  unnecessaryRendersPercent: number = 78;

  // Valores para demostraciones
  defaultValue: number = 0;
  onPushValue: number = 0;
  zonelessValue: string = 'Esperando acción...';

  // Contadores de renders
  defaultRenders: number = 0;
  onPushRenders: number = 0;

  // Métricas de comparación
  baselineRenders: number = 0;
  baselineRenderTime: number = 12;
  onpushRenders: number = 0;
  onpushRenderTime: number = 3;
  performanceGain: number = 75;

  // TrackBy demo
  withoutTrackByOps: number = 0;
  withTrackByOps: number = 0;

  // Items para las listas
  items$: Observable<Item[]>;
  items: Item[] = [];

  // Heat map data
  componentMetrics: ComponentMetric[] = [
    { name: 'Header', renderCount: 124, lastRenderTime: 2, colorIntensity: 20 },
    { name: 'FPS Counter', renderCount: 856, lastRenderTime: 1, colorIntensity: 85 },
    { name: 'Default List', renderCount: 1250, lastRenderTime: 12, colorIntensity: 100 },
    { name: 'OnPush List', renderCount: 42, lastRenderTime: 3, colorIntensity: 10 },
    { name: 'TrackBy Demo', renderCount: 312, lastRenderTime: 5, colorIntensity: 45 },
    { name: 'Controls', renderCount: 18, lastRenderTime: 1, colorIntensity: 5 },
  ];

  // Controles
  autoUpdate: boolean = true;
  updateInterval: number = 500;
  performanceScore: number = 78;
  performanceScoreColor: string = 'conic-gradient(#00ff88 0deg 280deg, #444 280deg 360deg)';
  performanceMessage: string = 'Bueno, pero puedes optimizar más con OnPush';

  // Score mapping
  private scoreMessages = {
    low: 'Necesita optimización urgente',
    medium: 'Rendimiento aceptable, puede mejorar',
    high: '¡Excelente! Uso óptimo de detección de cambios',
  };

  private subscriptions: Subscription = new Subscription();

  constructor(
    private performanceService: PerformanceService,
    private fpsService: FpsService,
    private mockDataService: MockDataService,
    private cdr: ChangeDetectorRef
  ) {
    // Inicializar items
    this.items$ = this.mockDataService.getItems().pipe(
      map(items => this.items = items)
    );
  }

  ngOnInit(): void {
    this.startMetricsSimulation();
    this.startFpsMonitoring();
    this.startAutoUpdate();
    this.calculatePerformanceScore();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  // ========================================
  // MÉTODOS DE ESTRATEGIA
  // ========================================

  selectStrategy(strategy: 'default' | 'onpush' | 'zoneless'): void {
    this.selectedStrategy = strategy;

    // Explicación didáctica que se muestra en consola (podrías mostrarla en UI)
    const explanations = {
      default: `🔄 Default Strategy: Angular verifica TODOS los componentes cuando:
• Cualquier evento ocurre (click, timer, XHR)
• Cualquier @Input() cambia (incluso si es la misma referencia)
• Ideal para apps pequeñas, pero puede ser ineficiente en listas grandes`,

      onpush: `⚡ OnPush Strategy: Angular verifica SOLO cuando:
• @Input() cambia por NUEVA REFERENCIA (inmutabilidad)
• Eventos del componente (click, etc.)
• Observables emiten (con async pipe)
• markForCheck() se llama manualmente
• Reduce renders innecesarios hasta 95%`,

      zoneless: `🚀 Zoneless (Experimental): Angular 18+ sin Zone.js
• Tú controlas manualmente la detección con ChangeDetectorRef
• Bundle size -25%
• Máxima performance pero más código
• Ideal para apps críticas de rendimiento`
    };

    console.log(explanations[strategy]);

    // Aquí podrías mostrar un tooltip o modal con la explicación
    this.showStrategyExplanation(strategy);
  }

  private showStrategyExplanation(strategy: string): void {
    // Implementar si quieres mostrar un modal/toast
  }

  // ========================================
  // MÉTODOS DE DEMOSTRACIÓN
  // ========================================

  incrementDefault(): void {
    this.defaultValue++;
    this.defaultRenders++;
    this.totalRenders++;
    this.updateHeatMap('Default List', 1);
  }

  incrementOnPush(): void {
    // Esto NO debería actualizar la vista si estamos en OnPush
    // porque estamos mutando el valor, no creando una nueva referencia
    this.onPushValue++;
    this.onPushRenders++;

    // En un componente OnPush real, esto no actualizaría la vista
    // Pero aquí lo contamos para demostración
  }

  updateOnPushWithNewRef(): void {
    // Esto SÍ actualiza la vista porque creamos una nueva referencia
    this.onPushValue = this.onPushValue + 1;
    this.onPushRenders++;
    this.totalRenders++;
    this.updateHeatMap('OnPush List', 1);
  }

  updateZoneless(): void {
    this.zonelessValue = `Actualizado sin detección: ${new Date().toLocaleTimeString()}`;
    // En modo zoneless, esto no actualiza la vista automáticamente
  }

  updateZonelessAndDetect(): void {
    this.zonelessValue = `✅ Con detección: ${new Date().toLocaleTimeString()}`;
    // Forzar detección de cambios (simula markForCheck)
    this.cdr.detectChanges();
    this.totalRenders++;
  }

  // ========================================
  // MÉTODOS DE LISTAS
  // ========================================

  addRandomItem(): void {

     const newId = this.items.length > 0
    ? Math.max(...this.items.map(i => i.id)) + 1
    : 0;

    const newItem: Item = {
      id: newId,
      name: `Item ${this.items.length + 1}`,
      value: Math.floor(Math.random() * 100),
      category: ['A', 'B', 'C'][Math.floor(Math.random() * 3)] as 'A' | 'B' | 'C',
      timestamp: new Date(),
      isActive: true,
      metadata: {
        created: new Date(),
        updated: new Date(),
        version: 1
      }
    };

    this.items = [...this.items, newItem]; // Nueva referencia para OnPush
    this.mockDataService.updateItems(this.items);

    // Actualizar métricas
    this.withoutTrackByOps += 101; // Simula recreación de todos los items
    this.withTrackByOps += 1; // Simula solo el nuevo item
  }

  updateRandomItem(): void {
    if (this.items.length === 0) return;

    const index = Math.floor(Math.random() * this.items.length);
    const updatedItem = {
      ...this.items[index],
      value: Math.floor(Math.random() * 100),
    };

    // Crear nueva lista con el item actualizado (inmutabilidad)
    this.items = [
      ...this.items.slice(0, index),
      updatedItem,
      ...this.items.slice(index + 1)
    ];

    this.mockDataService.updateItems(this.items);

    // Actualizar métricas
    this.withoutTrackByOps += 100; // Recrea todo
    this.withTrackByOps += 1; // Solo actualiza el item modificado
  }

  // ========================================
  // MÉTODOS DE MÉTRICAS
  // ========================================

  private startMetricsSimulation(): void {
    const metricsSub = interval(1000).subscribe(() => {
      // Simular cambios en las métricas
      this.cpuUsage = Math.floor(20 + Math.random() * 30);
      this.memoryUsage = Math.floor(35 + Math.random() * 20);
      this.changeDetectionCount = Math.floor(40 + Math.random() * 60);
      this.renderTime = +(3 + Math.random() * 8).toFixed(1);

      // Calcular frame drop basado en CPU
      this.frameDrop = this.cpuUsage > 70 ? 15 : this.cpuUsage > 50 ? 8 : 2;

      // Actualizar heat map basado en renders
      this.updateHeatMapsFromUsage();
    });

    this.subscriptions.add(metricsSub);
  }

  private startFpsMonitoring(): void {
    const fpsSub = interval(100).subscribe(() => {
      // Simular FPS que varía según CPU y estrategia
      let baseFps = 60;

      if (this.selectedStrategy === 'default') {
        baseFps = 45 + Math.floor(Math.random() * 15);
      } else if (this.selectedStrategy === 'onpush') {
        baseFps = 55 + Math.floor(Math.random() * 10);
      } else {
        baseFps = 58 + Math.floor(Math.random() * 7);
      }

      // Reducir FPS si CPU está alto
      if (this.cpuUsage > 80) baseFps = Math.max(20, baseFps - 15);
      else if (this.cpuUsage > 60) baseFps = Math.max(30, baseFps - 8);

      this.fps = baseFps;

      // Actualizar historial
      this.fpsHistory = [...this.fpsHistory.slice(1), baseFps];
    });

    this.subscriptions.add(fpsSub);
  }

  private startAutoUpdate(): void {
    const autoSub = interval(this.updateInterval).subscribe(() => {
      if (this.autoUpdate) {
        this.updateRandomItem();

        // Incrementar contadores de baseline/onpush para la comparación
        this.baselineRenders += 100; // Simula render de todos los items
        this.onpushRenders += 1; // Simula render solo del item cambiado

        // Calcular gain
        const totalBaseline = this.baselineRenders * this.baselineRenderTime;
        const totalOnpush = this.onpushRenders * this.onpushRenderTime;
        this.performanceGain = Math.floor(100 - (totalOnpush / totalBaseline) * 100);
      }
    });

    this.subscriptions.add(autoSub);
  }

  private updateHeatMap(componentName: string, increment: number): void {
    const component = this.componentMetrics.find(c => c.name === componentName);
    if (component) {
      component.renderCount += increment;
      component.colorIntensity = Math.min(100, component.colorIntensity + increment);
    }
  }

  private updateHeatMapsFromUsage(): void {
    // Actualizar intensidades basadas en uso
    this.componentMetrics.forEach(comp => {
      if (comp.name === 'FPS Counter') {
        comp.colorIntensity = Math.min(100, Math.floor(this.fps / 60 * 100));
      } else if (comp.name === 'Default List') {
        comp.colorIntensity = Math.min(100, this.baselineRenders / 10);
      } else if (comp.name === 'OnPush List') {
        comp.colorIntensity = Math.min(100, this.onpushRenders / 10);
      }
    });
  }

  private calculatePerformanceScore(): void {
    // Fórmula simple para puntuación
    let score = 100;

    // Penalizar por renders innecesarios
    score -= this.unnecessaryRenders / 50;

    // Penalizar por FPS bajo
    if (this.fps < 30) score -= 20;
    else if (this.fps < 45) score -= 10;

    // Bonus por estrategia óptima
    if (this.selectedStrategy === 'onpush') score += 10;
    if (this.selectedStrategy === 'zoneless') score += 15;

    // Asegurar rango 0-100
    this.performanceScore = Math.max(0, Math.min(100, Math.floor(score)));

    // Color para círculo (gradiente)
    const degrees = (this.performanceScore / 100) * 360;
    this.performanceScoreColor = `conic-gradient(#00ff88 0deg ${degrees}deg, #444 ${degrees}deg 360deg)`;

    // Mensaje
    if (this.performanceScore < 40) {
      this.performanceMessage = this.scoreMessages.low;
    } else if (this.performanceScore < 70) {
      this.performanceMessage = this.scoreMessages.medium;
    } else {
      this.performanceMessage = this.scoreMessages.high;
    }
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

    this.componentMetrics.forEach(c => {
      c.renderCount = 0;
      c.colorIntensity = 0;
    });

    this.calculatePerformanceScore();
  }

  // ========================================
  // GETTERS PARA EL TEMPLATE
  // ========================================

  get fpsStatus(): string {
    if (this.fps >= 50) return 'Smooth';
    if (this.fps >= 30) return 'Okay';
    return 'Laggy';
  }

  get fpsStatusClass(): string {
    if (this.fps >= 50) return 'good';
    if (this.fps >= 30) return 'warning';
    return 'bad';
  }
}
