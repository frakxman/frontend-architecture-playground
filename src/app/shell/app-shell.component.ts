import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../shell/navigation/header/header.component';
import { SidebarComponent } from '../shell/navigation/sidebar/sidebar.component';
import { FooterComponent } from '../shell/navigation/footer/footer.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  ],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss'
})
export class AppShellComponent {}
