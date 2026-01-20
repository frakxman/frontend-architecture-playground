import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MockDataService {

  generateItems(count = 5000) {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      name: `Item #${i}`,
      value: Math.random()
    }));
  }
}
