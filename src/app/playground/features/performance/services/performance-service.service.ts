// performance.service.ts
import { Injectable, NgZone, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, Observable, interval, Subject } from 'rxjs';
import { map, takeUntil, tap, throttleTime, distinctUntilChanged } from 'rxjs/operators';

export interface PerformanceMetrics {
  fps: number;
  fpsHistory: number[];
  frameDrop: number;
  renderTime: number;
  cpuUsage: number;
  memoryUsage: number;
  heapSize: number;
  changeDetectionCount: number;
  totalRenders: number;
  unnecessaryRenders: number;
  unnecessaryRendersPercent: number;
  timestamp: Date;
}

export interface ComponentRenderMetric {
  componentName: string;
  renderCount: number;
  lastRenderTime: number;
  renderDuration: number;
  changeDetectionStrategy: 'Default' | 'OnPush' | 'Zoneless';
}

export interface StrategyComparison {
  strategy: 'default' | 'onpush' | 'zoneless';
  renderCount: number;
  avgRenderTime: number;
  memoryFootprint: number;
  cpuImpact: number;
  domOperations: number;
}

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  // ========================================
  // STATE MANAGEMENT - BehaviorSubjects
  // ========================================

  private metricsSubject = new BehaviorSubject<PerformanceMetrics>(this.getInitialMetrics());
  metrics$: Observable<PerformanceMetrics> = this.metricsSubject.asObservable();

  private componentMetricsSubject = new BehaviorSubject<ComponentRenderMetric[]>([]);
  componentMetrics$ = this.componentMetricsSubject.asObservable();

  private strategyComparisonSubject = new BehaviorSubject<StrategyComparison>({
    strategy: 'default',
    renderCount: 0,
    avgRenderTime: 0,
    memoryFootprint: 0,
    cpuImpact: 0,
    domOperations: 0
  });
  strategyComparison$ = this.strategyComparisonSubject.asObservable();

  private destroy$ = new Subject<void>();

  // Historial para cálculos
  private renderTimes: number[] = [];
  private fpsReadings: number[] = [];
  private componentMetrics: Map<string, ComponentRenderMetric> = new Map();

  // Configuración
  private simulationInterval = 100; // ms
  private historyLength = 60; // 60 lecturas para gráficas

  constructor(private ngZone: NgZone) {
    this.initializeMetrics();
    this.startMetricsCollection();
  }

  // ========================================
  // INICIALIZACIÓN
  // ========================================

  private getInitialMetrics(): PerformanceMetrics {
    return {
      fps: 60,
      fpsHistory: Array(20).fill(60),
      frameDrop: 0,
      renderTime: 4.2,
      cpuUsage: 23,
      memoryUsage: 42,
      heapSize: 128,
      changeDetectionCount: 0,
      totalRenders: 1248,
      unnecessaryRenders: 978,
      unnecessaryRendersPercent: 78,
      timestamp: new Date()
    };
  }

  private initializeMetrics(): void {
    // Registrar algunos componentes de ejemplo
    const initialComponents: ComponentRenderMetric[] = [
      {
        componentName: 'Header',
        renderCount: 124,
        lastRenderTime: Date.now() - 5000,
        renderDuration: 2,
        changeDetectionStrategy: 'Default'
      },
      {
        componentName: 'FPS Counter',
        renderCount: 856,
        lastRenderTime: Date.now() - 100,
        renderDuration: 1,
        changeDetectionStrategy: 'OnPush'
      },
      {
        componentName: 'Default List',
        renderCount: 1250,
        lastRenderTime: Date.now() - 50,
        renderDuration: 12,
        changeDetectionStrategy: 'Default'
      },
      {
        componentName: 'OnPush List',
        renderCount: 42,
        lastRenderTime: Date.now() - 2000,
        renderDuration: 3,
        changeDetectionStrategy: 'OnPush'
      },
      {
        componentName: 'TrackBy Demo',
        renderCount: 312,
        lastRenderTime: Date.now() - 500,
        renderDuration: 5,
        changeDetectionStrategy: 'Default'
      },
      {
        componentName: 'Controls',
        renderCount: 18,
        lastRenderTime: Date.now() - 10000,
        renderDuration: 1,
        changeDetectionStrategy: 'Default'
      }
    ];

    initialComponents.forEach(comp => {
      this.componentMetrics.set(comp.componentName, comp);
    });

    this.componentMetricsSubject.next(initialComponents);
  }

  // ========================================
  // COLECCIÓN DE MÉTRICAS
  // ========================================

  private startMetricsCollection(): void {
    // Usamos NgZone.runOutsideAngular para no disparar detección de cambios innecesaria
    this.ngZone.runOutsideAngular(() => {
      interval(this.simulationInterval)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.updateMetrics();
        });
    });
  }

  private updateMetrics(): void {
    const current = this.metricsSubject.value;

    // Simular cambios realistas en las métricas
    const newMetrics: PerformanceMetrics = {
      ...current,
      fps: this.calculateFPS(),
      frameDrop: this.calculateFrameDrop(),
      renderTime: this.calculateRenderTime(),
      cpuUsage: this.calculateCPUUsage(),
      memoryUsage: this.calculateMemoryUsage(),
      changeDetectionCount: this.calculateChangeDetectionCount(),
      timestamp: new Date()
    };

    // Actualizar historial de FPS
    newMetrics.fpsHistory = [...current.fpsHistory.slice(1), newMetrics.fps];

    // Calcular renders innecesarios basados en estrategia
    newMetrics.unnecessaryRenders = this.calculateUnnecessaryRenders();
    newMetrics.totalRenders += Math.floor(Math.random() * 3); // Incremento aleatorio

    newMetrics.unnecessaryRendersPercent = Math.floor(
      (newMetrics.unnecessaryRenders / Math.max(1, newMetrics.totalRenders)) * 100
    );

    this.metricsSubject.next(newMetrics);
  }

  // ========================================
  // CÁLCULOS DE MÉTRICAS INDIVIDUALES
  // ========================================

  private calculateFPS(): number {
    // Base FPS con variación natural
    let baseFPS = 60;

    // Factores que afectan FPS
    const cpuFactor = this.metricsSubject.value.cpuUsage / 100;
    const renderFactor = this.metricsSubject.value.renderTime / 16.67; // 16.67ms = 60fps

    // Aplicar factores
    baseFPS = Math.max(20, Math.min(60, 60 * (1 - cpuFactor * 0.5) * (1 - renderFactor * 0.3)));

    // Añadir variación aleatoria
    const randomVariation = (Math.random() * 4) - 2; // -2 a +2 FPS

    return Math.round(baseFPS + randomVariation);
  }

  private calculateFrameDrop(): number {
    const fps = this.metricsSubject.value.fps;
    // Frame drop es inversamente proporcional a FPS
    return Math.max(0, Math.min(30, Math.floor((60 - fps) * 1.5)));
  }

  private calculateRenderTime(): number {
    const baseTime = 4.2;
    const cpuLoad = this.metricsSubject.value.cpuUsage / 100;

    // Render time aumenta con CPU load
    const variation = (Math.random() * 3) - 1.5; // -1.5 a +1.5 ms

    return +(baseTime * (1 + cpuLoad * 0.5) + variation).toFixed(1);
  }

  private calculateCPUUsage(): number {
    const current = this.metricsSubject.value.cpuUsage;

    // Cambio gradual de CPU (máximo ±5% por tick)
    const change = (Math.random() * 10) - 5;
    let newCPU = current + change;

    // Mantener en rango razonable
    newCPU = Math.max(15, Math.min(95, newCPU));

    return Math.floor(newCPU);
  }

  private calculateMemoryUsage(): number {
    const current = this.metricsSubject.value.memoryUsage;

    // Memoria tiende a aumentar gradualmente
    const trend = 0.2;
    const random = (Math.random() * 2) - 0.5;

    let newMemory = current + trend + random;

    // Ocasionalmente el garbage collector reduce memoria
    if (Math.random() < 0.05) { // 5% chance
      newMemory = newMemory * 0.7;
    }

    return Math.floor(Math.max(20, Math.min(180, newMemory)));
  }

  private calculateChangeDetectionCount(): number {
    const baseCount = 40;
    const cpuFactor = this.metricsSubject.value.cpuUsage / 50;

    return Math.floor(baseCount * (0.8 + Math.random() * 0.4) * cpuFactor);
  }

  private calculateUnnecessaryRenders(): number {
    // Los renders innecesarios dependen de la estrategia activa
    // Esto será actualizado por el componente según la estrategia seleccionada
    const current = this.metricsSubject.value;
    return Math.floor(current.totalRenders * 0.78); // 78% innecesarios por defecto
  }

  // ========================================
  // MÉTODOS PÚBLICOS PARA REGISTRO DE RENDERS
  // ========================================

  /**
   * Registra un render de componente para métricas
   */
  registerComponentRender(
    componentName: string,
    strategy: 'Default' | 'OnPush' | 'Zoneless',
    renderDuration: number
  ): void {
    const existing = this.componentMetrics.get(componentName);

    const metric: ComponentRenderMetric = {
      componentName,
      renderCount: (existing?.renderCount || 0) + 1,
      lastRenderTime: Date.now(),
      renderDuration,
      changeDetectionStrategy: strategy
    };

    this.componentMetrics.set(componentName, metric);
    this.componentMetricsSubject.next(Array.from(this.componentMetrics.values()));

    // Actualizar contadores globales
    const current = this.metricsSubject.value;
    current.totalRenders++;

    // Determinar si fue innecesario (simplificación)
    if (strategy === 'Default' && Math.random() > 0.3) {
      current.unnecessaryRenders++;
    }

    this.metricsSubject.next(current);

    // Guardar tiempo de render para estadísticas
    this.renderTimes.push(renderDuration);
    if (this.renderTimes.length > 100) {
      this.renderTimes.shift();
    }
  }

  /**
   * Actualiza la comparación de estrategias
   */
  updateStrategyComparison(strategy: 'default' | 'onpush' | 'zoneless'): void {
    const current = this.strategyComparisonSubject.value;

    // Simular diferentes métricas según estrategia
    let renderCount, avgRenderTime, memoryFootprint, cpuImpact, domOperations;

    switch(strategy) {
      case 'default':
        renderCount = Math.floor(1000 + Math.random() * 500);
        avgRenderTime = 12 + Math.random() * 4;
        memoryFootprint = 85 + Math.random() * 15;
        cpuImpact = 65 + Math.random() * 20;
        domOperations = renderCount * 10;
        break;
      case 'onpush':
        renderCount = Math.floor(100 + Math.random() * 50);
        avgRenderTime = 3 + Math.random() * 2;
        memoryFootprint = 42 + Math.random() * 8;
        cpuImpact = 23 + Math.random() * 7;
        domOperations = renderCount * 2;
        break;
      case 'zoneless':
        renderCount = Math.floor(50 + Math.random() * 30);
        avgRenderTime = 1.5 + Math.random() * 1;
        memoryFootprint = 28 + Math.random() * 5;
        cpuImpact = 15 + Math.random() * 5;
        domOperations = renderCount * 1;
        break;
    }

    this.strategyComparisonSubject.next({
      strategy,
      renderCount,
      avgRenderTime: +avgRenderTime.toFixed(1),
      memoryFootprint: Math.floor(memoryFootprint),
      cpuImpact: Math.floor(cpuImpact),
      domOperations
    });
  }

  /**
   * Reinicia todas las métricas
   */
  resetAllMetrics(): void {
    // Reiniciar metrics
    this.metricsSubject.next(this.getInitialMetrics());

    // Reiniciar componentes
    this.componentMetrics.clear();
    this.componentMetricsSubject.next([]);

    // Reiniciar historiales
    this.renderTimes = [];
    this.fpsReadings = [];

    // Reiniciar comparación
    this.strategyComparisonSubject.next({
      strategy: 'default',
      renderCount: 0,
      avgRenderTime: 0,
      memoryFootprint: 0,
      cpuImpact: 0,
      domOperations: 0
    });
  }

  // ========================================
  // MÉTODOS DE ANÁLISIS
  // ========================================

  /**
   * Obtiene estadísticas de renderizado
   */
  getRenderStats(): {
    avgRenderTime: number;
    maxRenderTime: number;
    minRenderTime: number;
    totalRenders: number;
  } {
    const times = this.renderTimes;

    if (times.length === 0) {
      return {
        avgRenderTime: 0,
        maxRenderTime: 0,
        minRenderTime: 0,
        totalRenders: 0
      };
    }

    return {
      avgRenderTime: times.reduce((a, b) => a + b, 0) / times.length,
      maxRenderTime: Math.max(...times),
      minRenderTime: Math.min(...times),
      totalRenders: times.length
    };
  }

  /**
   * Obtiene recomendaciones basadas en métricas actuales
   */
  getOptimizationRecommendations(): string[] {
    const metrics = this.metricsSubject.value;
    const recommendations: string[] = [];

    if (metrics.unnecessaryRendersPercent > 50) {
      recommendations.push('Considera usar OnPush strategy para reducir renders innecesarios');
    }

    if (metrics.fps < 45) {
      recommendations.push('Bajo FPS detectado. Revisa componentes con renders pesados');
    }

    if (metrics.cpuUsage > 70) {
      recommendations.push('Alto uso de CPU. Implementa trackBy en listas grandes');
    }

    const heavyComponents = Array.from(this.componentMetrics.values())
      .filter(c => c.renderDuration > 10)
      .map(c => c.componentName);

    if (heavyComponents.length > 0) {
      recommendations.push(`Componentes lentos: ${heavyComponents.join(', ')}. Considera optimizarlos`);
    }

    return recommendations;
  }

  // ========================================
  // CLEANUP
  // ========================================

  /**
   * Limpia suscripciones (llamar en ngOnDestroy del servicio si es necesario)
   */
  destroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
