import { TranslateModule } from '@ngx-translate/core';
import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, TranslateModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isMobile = false;
  menuOpen = false;

  constructor() {
  setTimeout(() => this.onResize(), 0); // ← Corrige sur certains mobiles/tablettes
  }

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth <= 900;
    if (!this.isMobile) {
      this.menuOpen = false;
      this.toggleBodyScroll();
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.toggleBodyScroll();
  }

  onNav() {
    if (this.isMobile) {
      this.menuOpen = false;
      this.toggleBodyScroll();
    }
  }

  logout() {
    localStorage.clear();
    window.location.href = '/login-flux';
  }

  private toggleBodyScroll() {
    if (this.menuOpen && this.isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
}
