// mock-data.service.ts
import { Injectable } from '@angular/core';
import { Observable, interval, BehaviorSubject, combineLatest } from 'rxjs';
import { map, shareReplay, tap, startWith, switchMap } from 'rxjs/operators';

import { DataUpdateConfig, Item } from '../models/performance.types';

@Injectable({ providedIn: 'root' })
export class MockDataService {
  // ========================================
  // CONFIGURACIÓN
  // ========================================

  private defaultConfig: DataUpdateConfig = {
    interval: 500,
    itemsToUpdate: 3,
    valueVariation: 0.3
  };

  // ========================================
  // STATE - BehaviorSubjects para control
  // ========================================

  private configSubject = new BehaviorSubject<DataUpdateConfig>(this.defaultConfig);
  config$ = this.configSubject.asObservable();

  private itemsSubject = new BehaviorSubject<Item[]>(this.generateItems(100));
  items$ = this.itemsSubject.asObservable();

  private updateCounterSubject = new BehaviorSubject<number>(0);
  updateCounter$ = this.updateCounterSubject.asObservable();

  // ========================================
  // STREAMS CONFIGURABLES
  // ========================================

  /**
   * Stream frío - cada suscripción genera nuevos datos
   * Útil para demostrar el problema de múltiples suscripciones
   */
  coldStream$ = interval(1000).pipe(
    map(v => `❌ Cold value ${v} (nueva suscripción = nuevo stream)`),
    tap(value => console.log('📡 Cold stream emitted:', value))
  );

  /**
   * Stream caliente - compartido entre suscripciones
   * Útil para demostrar la solución con shareReplay
   */
  sharedStream$ = this.coldStream$.pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );

  /**
   * Stream de items que se actualiza periódicamente según configuración
   * Perfecto para demostrar Default vs OnPush - VERSIÓN CORREGIDA
   */
  liveItems$: Observable<Item[]> = combineLatest([
    this.items$,
    this.config$
  ]).pipe(
    switchMap(([items, config]) => {
      // Crear un observable que emite cada 'interval' ms
      return interval(config.interval).pipe(
        map(() => {
          const currentItems = this.itemsSubject.value;
          return this.updateRandomItems(currentItems, config);
        }),
        startWith(items), // Emitir inmediatamente con los items actuales
        tap(updatedItems => {
          this.itemsSubject.next(updatedItems);
          this.updateCounterSubject.next(this.updateCounterSubject.value + 1);
        })
      );
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  /**
   * Versión simplificada para uso directo
   */
  simpleLiveItems$: Observable<Item[]> = interval(500).pipe(
    map(() => {
      const currentItems = this.itemsSubject.value;
      return this.updateRandomItems(currentItems, this.configSubject.value);
    }),
    tap(updatedItems => {
      this.itemsSubject.next(updatedItems);
      this.updateCounterSubject.next(this.updateCounterSubject.value + 1);
    }),
    startWith(this.generateItems(100)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  // ========================================
  // MÉTODOS DE GENERACIÓN
  // ========================================

  /**
   * Genera items con estructura más rica para demostraciones
   */
  generateItems(count: number = 50): Item[] {
    const categories: ('A' | 'B' | 'C')[] = ['A', 'B', 'C'];
    const now = new Date();

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      name: `Item #${i.toString().padStart(3, '0')}`,
      value: Math.random(),
      category: categories[Math.floor(Math.random() * categories.length)],
      timestamp: new Date(now.getTime() - Math.random() * 86400000), // random en último día
      isActive: Math.random() > 0.3,
      metadata: {
        created: new Date(now.getTime() - Math.random() * 604800000), // random en última semana
        updated: now,
        version: 1
      }
    }));
  }

  /**
   * Genera un solo item aleatorio
   */
  generateRandomItem(id?: number): Item {
    const categories: ('A' | 'B' | 'C')[] = ['A', 'B', 'C'];
    const newId = id ?? Math.floor(Math.random() * 10000);

    return {
      id: newId,
      name: `Item #${newId.toString().padStart(3, '0')}`,
      value: Math.random(),
      category: categories[Math.floor(Math.random() * categories.length)],
      timestamp: new Date(),
      isActive: Math.random() > 0.3,
      metadata: {
        created: new Date(),
        updated: new Date(),
        version: 1
      }
    };
  }

  // ========================================
  // MÉTODOS DE ACCESO - CORREGIDOS
  // ========================================

  /**
   * Obtiene items (versión Observable)
   */
  getItems(): Observable<Item[]> {
    return this.items$; 
  }

  /**
   * Obtiene items (versión sincrónica)
   */
  getItemsSync(): Item[] {
    return this.itemsSubject.value;
  }

  /**
   * Actualiza la lista completa de items
   */
  updateItems(newItems: Item[]): void {
    this.itemsSubject.next(newItems);
    this.updateCounterSubject.next(this.updateCounterSubject.value + 1);
  }

  // ========================================
  // MÉTODOS DE ACTUALIZACIÓN
  // ========================================

  /**
   * Actualiza items aleatorios - DEMOSTRACIÓN DE INMUTABILIDAD
   * Crea NUEVA REFERENCIA para el array y para los items modificados
   */
  updateRandomItems(items: Item[], config: DataUpdateConfig): Item[] {
    // Crear nuevo array (nueva referencia)
    const updatedItems = [...items];

    // Determinar qué índices actualizar
    const indicesToUpdate = new Set<number>();
    while (indicesToUpdate.size < config.itemsToUpdate && indicesToUpdate.size < items.length) {
      indicesToUpdate.add(Math.floor(Math.random() * items.length));
    }

    // Actualizar items seleccionados (creando nuevas referencias)
    indicesToUpdate.forEach(index => {
      const originalItem = items[index];

      // Crear nuevo item (nueva referencia) con valores actualizados
      updatedItems[index] = {
        ...originalItem,
        value: this.clampValue(originalItem.value + (Math.random() * 2 - 1) * config.valueVariation),
        timestamp: new Date(),
        metadata: {
          ...originalItem.metadata,
          updated: new Date(),
          version: originalItem.metadata.version + 1
        }
      };
    });

    return updatedItems;
  }

  /**
   * Actualiza un item específico por ID
   */
  updateItemById(id: number, changes: Partial<Item>): void {
    const currentItems = this.itemsSubject.value;
    const index = currentItems.findIndex(item => item.id === id);

    if (index !== -1) {
      const updatedItems = [...currentItems];
      updatedItems[index] = {
        ...currentItems[index],
        ...changes,
        metadata: {
          ...currentItems[index].metadata,
          updated: new Date(),
          version: currentItems[index].metadata.version + 1
        }
      };

      this.itemsSubject.next(updatedItems);
      this.updateCounterSubject.next(this.updateCounterSubject.value + 1);
    }
  }

  /**
   * Añade un nuevo item
   */
  addItem(item?: Partial<Item>): void {
    const currentItems = this.itemsSubject.value;
    const newId = Math.max(...currentItems.map(i => i.id), 0) + 1;

    const newItem: Item = {
      id: newId,
      name: `Item #${newId.toString().padStart(3, '0')}`,
      value: Math.random(),
      category: 'A',
      timestamp: new Date(),
      isActive: true,
      metadata: {
        created: new Date(),
        updated: new Date(),
        version: 1
      },
      ...item
    };

    this.itemsSubject.next([...currentItems, newItem]);
    this.updateCounterSubject.next(this.updateCounterSubject.value + 1);
  }

  /**
   * Elimina un item por ID
   */
  removeItem(id: number): void {
    const currentItems = this.itemsSubject.value;
    this.itemsSubject.next(currentItems.filter(item => item.id !== id));
    this.updateCounterSubject.next(this.updateCounterSubject.value + 1);
  }

  // ========================================
  // MÉTODOS DE CONFIGURACIÓN
  // ========================================

  /**
   * Actualiza configuración de updates
   */
  updateConfig(config: Partial<DataUpdateConfig>): void {
    this.configSubject.next({
      ...this.configSubject.value,
      ...config
    });
  }

  /**
   * Cambia intervalo de actualización
   */
  setUpdateInterval(ms: number): void {
    this.updateConfig({ interval: ms });
  }

  /**
   * Cambia cantidad de items a actualizar por ciclo
   */
  setItemsToUpdate(count: number): void {
    this.updateConfig({ itemsToUpdate: count });
  }

  // ========================================
  // MÉTODOS DE RESET
  // ========================================

  /**
   * Reinicia los datos a estado inicial
   */
  resetToInitial(count: number = 100): void {
    this.itemsSubject.next(this.generateItems(count));
    this.updateCounterSubject.next(0);
    this.configSubject.next(this.defaultConfig);
  }

  /**
   * Reinicia solo los contadores
   */
  resetCounters(): void {
    this.updateCounterSubject.next(0);
  }

  // ========================================
  // UTILIDADES
  // ========================================

  private clampValue(value: number): number {
    return Math.max(0, Math.min(1, value));
  }

  /**
   * Obtiene estadísticas de los datos actuales
   */
  getStats(): {
    totalItems: number;
    activeItems: number;
    averageValue: number;
    categories: Record<string, number>;
    lastUpdate: Date;
  } {
    const items = this.itemsSubject.value;
    const activeItems = items.filter(i => i.isActive).length;
    const avgValue = items.reduce((acc, i) => acc + i.value, 0) / items.length;

    const categories = items.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalItems: items.length,
      activeItems,
      averageValue: +avgValue.toFixed(3),
      categories,
      lastUpdate: new Date()
    };
  }

  /**
   * Crea streams con diferentes estrategias para demostración
   */
  getDemoStreams() {
    return {
      // Stream que muta el mismo array (mala práctica)
      mutable$: interval(1000).pipe(
        map(() => {
          const items = this.itemsSubject.value;
          items.forEach(item => item.value = Math.random()); // MUTACIÓN DIRECTA
          return items;
        })
      ),

      // Stream que crea nueva referencia (buena práctica)
      immutable$: interval(1000).pipe(
        map(() => {
          const items = this.itemsSubject.value;
          return items.map(item => ({  // NUEVA REFERENCIA
            ...item,
            value: Math.random()
          }));
        })
      ),

      // Stream que solo actualiza items modificados (óptimo)
      optimized$: interval(1000).pipe(
        map(() => {
          const items = this.itemsSubject.value;
          const indexToUpdate = Math.floor(Math.random() * items.length);

          return items.map((item, index) =>
            index === indexToUpdate
              ? { ...item, value: Math.random() } // NUEVA REFERENCIA SOLO PARA ESTE
              : item // MISMA REFERENCIA PARA EL RESTO
          );
        })
      )
    };
  }
}
