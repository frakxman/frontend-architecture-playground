// fps.service.ts
import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable, interval, Subject } from 'rxjs';
import { takeUntil, map, distinctUntilChanged, throttleTime } from 'rxjs/operators';

export interface FPSMetrics {
  currentFPS: number;
  averageFPS: number;
  minFPS: number;
  maxFPS: number;
  fpsHistory: number[];
  frameTime: number; // tiempo por frame en ms
  frameDrop: number; // frames caídos por segundo
  jank: number; // frames que tardan más de 16.67ms (60fps)
  timestamp: Date;
}

export interface FrameTiming {
  frameId: number;
  startTime: number;
  endTime: number;
  duration: number;
  isJank: boolean; // si dura más de 16.67ms
}

@Injectable({
  providedIn: 'root'
})
export class FpsService {
  // ========================================
  // CONSTANTES
  // ========================================

  private readonly TARGET_FPS = 60;
  private readonly TARGET_FRAME_TIME = 1000 / 60; // 16.67ms
  private readonly HISTORY_LENGTH = 120; // 2 segundos a 60fps
  private readonly SAMPLE_INTERVAL = 100; // ms entre muestras

  // ========================================
  // STATE
  // ========================================

  private fpsSubject = new BehaviorSubject<FPSMetrics>(this.getInitialMetrics());
  fps$: Observable<FPSMetrics> = this.fpsSubject.asObservable();

  private frameTimingsSubject = new BehaviorSubject<FrameTiming[]>([]);
  frameTimings$ = this.frameTimingsSubject.asObservable();

  private isMonitoringSubject = new BehaviorSubject<boolean>(false);
  isMonitoring$ = this.isMonitoringSubject.asObservable();

  // Stream de FPS en tiempo real (solo el valor numérico)
  currentFPS$: Observable<number> = this.fps$.pipe(
    map(metrics => metrics.currentFPS),
    distinctUntilChanged(),
    throttleTime(50) // evitar demasiadas emisiones
  );

  private destroy$ = new Subject<void>();

  // Variables internas para cálculo
  private frameCount = 0;
  private lastSecond = Date.now();
  private frames: FrameTiming[] = [];
  private frameId = 0;
  private lastFrameTime = performance.now();
  private animationFrameId: number | null = null;

  // Historial
  private fpsReadings: number[] = [];
  private frameTimes: number[] = [];

  constructor(private ngZone: NgZone) {
    this.initializeMonitoring();
  }

  // ========================================
  // INICIALIZACIÓN
  // ========================================

  private getInitialMetrics(): FPSMetrics {
    return {
      currentFPS: 60,
      averageFPS: 60,
      minFPS: 60,
      maxFPS: 60,
      fpsHistory: Array(20).fill(60),
      frameTime: 16.67,
      frameDrop: 0,
      jank: 0,
      timestamp: new Date()
    };
  }

  private initializeMonitoring(): void {
    // Iniciar monitoreo periódico
    this.ngZone.runOutsideAngular(() => {
      interval(this.SAMPLE_INTERVAL)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.updateMetrics();
        });
    });

    // Iniciar monitoreo de requestAnimationFrame
    this.startAnimationFrameMonitoring();
  }

  // ========================================
  // MONITOREO CON REQUESTANIMATIONFRAME
  // ========================================

  private startAnimationFrameMonitoring(): void {
    this.isMonitoringSubject.next(true);

    const measureFrame = (currentTime: number) => {
      if (!this.isMonitoringSubject.value) return;

      // Calcular duración del frame
      const frameDuration = currentTime - this.lastFrameTime;
      this.lastFrameTime = currentTime;

      // Registrar timing del frame
      const timing: FrameTiming = {
        frameId: this.frameId++,
        startTime: this.lastFrameTime,
        endTime: currentTime,
        duration: frameDuration,
        isJank: frameDuration > this.TARGET_FRAME_TIME * 1.5 // 25ms como umbral de jank
      };

      this.frames.push(timing);
      if (this.frames.length > this.HISTORY_LENGTH) {
        this.frames.shift();
      }

      this.frameTimes.push(frameDuration);
      if (this.frameTimes.length > this.HISTORY_LENGTH) {
        this.frameTimes.shift();
      }

      // Actualizar frame count para cálculo de FPS
      this.frameCount++;

      // Calcular FPS cada segundo
      const now = Date.now();
      if (now - this.lastSecond >= 1000) {
        const fps = this.frameCount;
        this.fpsReadings.push(fps);
        if (this.fpsReadings.length > 60) { // mantener último minuto
          this.fpsReadings.shift();
        }

        // Resetear contadores
        this.frameCount = 0;
        this.lastSecond = now;
      }

      // Continuar monitoreo
      this.animationFrameId = requestAnimationFrame(measureFrame);
    };

    this.ngZone.runOutsideAngular(() => {
      this.animationFrameId = requestAnimationFrame(measureFrame);
    });
  }

  // ========================================
  // ACTUALIZACIÓN DE MÉTRICAS
  // ========================================

  private updateMetrics(): void {
    const current = this.fpsSubject.value;

    // Calcular FPS actual (basado en últimos frames)
    const recentFrames = this.frameTimes.slice(-10);
    const avgFrameTime = recentFrames.length > 0
      ? recentFrames.reduce((a, b) => a + b, 0) / recentFrames.length
      : this.TARGET_FRAME_TIME;

    const currentFPS = avgFrameTime > 0
      ? Math.min(60, Math.round(1000 / avgFrameTime))
      : 60;

    // Calcular estadísticas
    const validFPS = this.fpsReadings.length > 0 ? this.fpsReadings : [60];
    const averageFPS = Math.round(
      validFPS.reduce((a, b) => a + b, 0) / validFPS.length
    );
    const minFPS = Math.min(...validFPS, 60);
    const maxFPS = Math.max(...validFPS, 60);

    // Calcular frame drop
    const expectedFrames = 60;
    const actualFrames = currentFPS;
    const frameDrop = Math.max(0, expectedFrames - actualFrames);

    // Calcular jank (frames que tardan más de 16.67ms)
    const recentFrameTimings = this.frameTimingsSubject.value.slice(-30);
    const jank = recentFrameTimings.filter(f => f.isJank).length;

    // Actualizar historial
    const fpsHistory = [...current.fpsHistory.slice(1), currentFPS];

    const newMetrics: FPSMetrics = {
      currentFPS,
      averageFPS,
      minFPS,
      maxFPS,
      fpsHistory,
      frameTime: +avgFrameTime.toFixed(2),
      frameDrop,
      jank,
      timestamp: new Date()
    };

    this.fpsSubject.next(newMetrics);
    this.frameTimingsSubject.next([...this.frames]);
  }

  // ========================================
  // MÉTODOS PÚBLICOS
  // ========================================

  /**
   * Inicia el monitoreo de FPS
   */
  startMonitoring(): void {
    if (this.isMonitoringSubject.value) return;

    this.isMonitoringSubject.next(true);
    this.resetMetrics();
    this.startAnimationFrameMonitoring();
  }

  /**
   * Detiene el monitoreo de FPS
   */
  stopMonitoring(): void {
    this.isMonitoringSubject.next(false);

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  /**
   * Reinicia todas las métricas
   */
  resetMetrics(): void {
    this.frameCount = 0;
    this.lastSecond = Date.now();
    this.frames = [];
    this.frameTimes = [];
    this.fpsReadings = [];
    this.frameId = 0;
    this.lastFrameTime = performance.now();

    this.fpsSubject.next(this.getInitialMetrics());
    this.frameTimingsSubject.next([]);
  }

  /**
   * Obtiene estadísticas detalladas de FPS
   */
  getDetailedStats(): {
    stability: 'excelente' | 'bueno' | 'regular' | 'malo';
    variance: number;
    percentile95: number;
    percentile5: number;
    recommendation: string;
  } {
    const metrics = this.fpsSubject.value;
    const readings = this.fpsReadings;

    if (readings.length < 10) {
      return {
        stability: 'bueno',
        variance: 0,
        percentile95: 60,
        percentile5: 55,
        recommendation: 'Continúa monitoreando para obtener más datos'
      };
    }

    // Calcular varianza (estabilidad)
    const avg = readings.reduce((a, b) => a + b, 0) / readings.length;
    const variance = Math.sqrt(
      readings.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / readings.length
    );

    // Calcular percentiles
    const sorted = [...readings].sort((a, b) => a - b);
    const p5Index = Math.floor(sorted.length * 0.05);
    const p95Index = Math.floor(sorted.length * 0.95);
    const percentile5 = sorted[p5Index] || 0;
    const percentile95 = sorted[p95Index] || 60;

    // Determinar estabilidad
    let stability: 'excelente' | 'bueno' | 'regular' | 'malo';
    let recommendation: string;

    if (metrics.averageFPS >= 58 && variance < 2) {
      stability = 'excelente';
      recommendation = 'Rendimiento excepcional. La aplicación mantiene 60fps estables.';
    } else if (metrics.averageFPS >= 55 && variance < 5) {
      stability = 'bueno';
      recommendation = 'Buen rendimiento. Pequeñas variaciones pero dentro de lo aceptable.';
    } else if (metrics.averageFPS >= 45 && variance < 10) {
      stability = 'regular';
      recommendation = 'Rendimiento aceptable. Considera optimizar componentes pesados.';
    } else {
      stability = 'malo';
      recommendation = 'Rendimiento pobre. Revisa bucles innecesarios y usa OnPush + trackBy.';
    }

    return {
      stability,
      variance: +variance.toFixed(2),
      percentile95,
      percentile5,
      recommendation
    };
  }

  /**
   * Simula una carga pesada para ver efecto en FPS
   */
  simulateHeavyLoad(duration: number = 2000): void {
    const endTime = Date.now() + duration;

    const heavyComputation = () => {
      if (Date.now() < endTime) {
        // Computación pesada
        for (let i = 0; i < 1000000; i++) {
          Math.sqrt(Math.random() * 1000000);
        }

        // Continuar inmediatamente (no usar requestAnimationFrame)
        setTimeout(heavyComputation, 0);
      }
    };

    this.ngZone.runOutsideAngular(() => {
      heavyComputation();
    });
  }

  /**
   * Verifica si el FPS actual es saludable
   */
  isHealthy(): boolean {
    return this.fpsSubject.value.currentFPS >= 50;
  }

  /**
   * Obtiene el porcentaje de frames caídos
   */
  getFrameDropPercentage(): number {
    const metrics = this.fpsSubject.value;
    return Math.round((metrics.frameDrop / 60) * 100);
  }

  // ========================================
  // UTILIDADES
  // ========================================

  /**
   * Obtiene un mensaje descriptivo del estado actual
   */
  getStatusMessage(): string {
    const metrics = this.fpsSubject.value;

    if (metrics.currentFPS >= 55) {
      return '🎯 Fluido - Experiencia óptima';
    } else if (metrics.currentFPS >= 45) {
      return '⚡ Aceptable - Pequeñas caídas ocasionales';
    } else if (metrics.currentFPS >= 30) {
      return '⚠️ Perceptible - La interfaz puede sentirse lenta';
    } else {
      return '❌ Crítico - Experiencia degradada';
    }
  }

  /**
   * Obtiene color basado en FPS para UI
   */
  getFPSColor(fps?: number): string {
    const value = fps || this.fpsSubject.value.currentFPS;

    if (value >= 50) return '#00ff88'; // verde
    if (value >= 30) return '#ffaa00'; // amarillo/naranja
    return '#ff4444'; // rojo
  }

  // ========================================
  // CLEANUP
  // ========================================

  destroy(): void {
    this.stopMonitoring();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
