import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-portfolio-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
  ],
  templateUrl: './portfolio-layout.component.html',
  styleUrl: './portfolio-layout.component.scss'
})
export class PortfolioLayoutComponent {}
