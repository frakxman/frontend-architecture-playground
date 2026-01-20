import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { PortfolioFooterComponent } from '../../footer/portfolio-footer/portfolio-footer.component';

@Component({
  selector: 'app-portfolio-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    HeaderComponent,
    PortfolioFooterComponent
  ],
  templateUrl: './portfolio-layout.component.html',
  styleUrl: './portfolio-layout.component.scss'
})
export class PortfolioLayoutComponent {}
