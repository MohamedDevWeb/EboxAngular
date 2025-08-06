import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login-flux',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './login-flux.component.html',
  styleUrls: ['./login-flux.component.scss']
})
export class LoginFluxComponent {
  lang: 'fr' | 'nl' = (localStorage.getItem('locale') as any) || 'fr';

  constructor(private router: Router) {}

  setLang(lang: 'fr' | 'nl') {
    this.lang = lang;
    localStorage.setItem('locale', lang);
    window.location.reload();
  }

  select(role: string) {
    // Ici tu peux stocker le choix, on simule
    setTimeout(() => this.router.navigate(['/login-redirect']), 300);
  }
}
