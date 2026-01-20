import { Injectable } from '@angular/core';
import { interval, map, shareReplay } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MockDataService {

  generateItems(count = 5000) {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      name: `Item #${i}`,
      value: Math.random()
    }));
  }

  // ❌ Cold observable (each subscription runs again)
  readonly coldStream$ = interval(1000).pipe(
    map(v => `Cold value ${v}`)
  );

  // ✅ Hot shared observable
  readonly sharedStream$ = this.coldStream$.pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );
}
