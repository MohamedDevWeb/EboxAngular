import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LanguageSwitcherComponent } from './language-switcher.component';
import { SidebarComponent } from './sidebar.component';
import { ProfilService, ProfilData } from '../services/profil.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-layout-shell',
  templateUrl: './layout-shell.component.html',
  styleUrls: ['./layout-shell.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    LanguageSwitcherComponent,
    SidebarComponent,
    TranslateModule
  ]
})
export class LayoutShellComponent {
  currentYear: number = new Date().getFullYear();
  search: string = '';
  lang: string = localStorage.getItem('lang') || 'fr';

  profil$ = this.profilService.getProfil(); // Observable<ProfilData>

  // -------- Ajout gestion mobile/burger menu --------
  isMobile = false;
  menuOpen = false;

  constructor(private router: Router, private profilService: ProfilService) {}

  ngOnInit() {
    this.checkMobile();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkMobile();
  }

  checkMobile() {
    this.isMobile = window.innerWidth < 900;
    if (!this.isMobile) {
      this.menuOpen = false;
    }
  }

  toggleSidebar() {
    this.menuOpen = !this.menuOpen;
  }

  // ---------------------------------------------------

  onSearch() {
    if (this.search.trim()) {
      this.router.navigate(['/mes-documents'], { queryParams: { search: this.search } });
      this.search = '';
    }
  }

  logout() {
    localStorage.clear();
    window.location.href = '/login-flux';
  }
}
