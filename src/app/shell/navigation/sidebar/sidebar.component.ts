import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  showSidebar = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Only show sidebar in Playground
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.router.url)
    ).subscribe(url => {
      this.showSidebar = url.includes('/playground');
    });

    // Initial check
    this.showSidebar = this.router.url.includes('/playground');
  }
}
