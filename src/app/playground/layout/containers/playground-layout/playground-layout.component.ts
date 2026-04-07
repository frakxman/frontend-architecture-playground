import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-playground-layout',
  templateUrl: './playground-layout.component.html',
  styleUrls: ['./playground-layout.component.css']
})
export class PlaygroundLayoutComponent implements OnDestroy {

  mobileMenuOpen = false;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((e: Event): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe(() => this.closeMobileMenu());
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : '';
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
    document.body.style.overflow = '';
  }

  onNavClick(event: MouseEvent) {
    if ((event.target as HTMLElement)?.closest?.('a')) {
      this.closeMobileMenu();
    }
  }
}
