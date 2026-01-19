import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { pageTransition } from '../animations/page-transition.animation';

@Component({
  selector: 'app-portfolio-page',
  standalone: true,
  imports: [RouterOutlet],
  animations: [pageTransition],
  template: `
    <section
      class="portfolio-layout"
      [@pageTransition]="outlet.activatedRoute?.routeConfig?.path"
    >
      <router-outlet #outlet="outlet" />
    </section>
  `
})
export class PortfolioPageComponent {}
