import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isPlayground = false;
  isPortfolio = false;
  isScrolled = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Detect current route section
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.router.url)
    ).subscribe(url => {
      this.isPlayground = url.includes('/playground');
      this.isPortfolio = url.includes('/portfolio');
    });

    // Initial check
    const url = this.router.url;
    this.isPlayground = url.includes('/playground');
    this.isPortfolio = url.includes('/portfolio');

    // Scroll effect
    this.checkScroll();
    window.addEventListener('scroll', this.checkScroll.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.checkScroll.bind(this));
  }

  checkScroll() {
    this.isScrolled = window.scrollY > 20;
  }
}
