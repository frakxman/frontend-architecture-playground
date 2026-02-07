import { Component } from '@angular/core';

@Component({
  selector: 'app-signals-lab',
  template: `
    <div class="signals-lab">
      <h2>Signals vs Observables</h2>
      <p>Compare Angular Signals with RxJS Observables</p>
      <div class="placeholder">
        <p>Signals lab content coming soon...</p>
        <p>Route: /playground/signals-vs-observables</p>
      </div>
    </div>
  `,
  styles: [`
    .signals-lab {
      padding: 2rem;
    }
    .placeholder {
      background: rgba(136, 0, 255, 0.1);
      border: 1px dashed #8800ff;
      border-radius: 12px;
      padding: 3rem;
      text-align: center;
      margin-top: 2rem;
      color: #8800ff;
    }
    h2 {
      color: #8800ff;
      margin-bottom: 1rem;
    }
  `]
})
export class SignalsLabComponent { }
