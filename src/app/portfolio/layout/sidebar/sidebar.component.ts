import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-portfolio-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  mobileMenuOpen = false;

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 768 && this.mobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    this.updateBodyOverflow();
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
    this.updateBodyOverflow();
  }

  closeMobileMenuOnClick() {
    if (window.innerWidth <= 768) {
      this.closeMobileMenu();
    }
  }

  private updateBodyOverflow() {
    if (this.mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
}
