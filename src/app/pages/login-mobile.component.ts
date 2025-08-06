import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // AJOUT ICI
import { Router } from '@angular/router';
import { AuthService, User } from '../auth.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login-mobile',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule], // AJOUT FormsModule
  templateUrl: './login-mobile.component.html',
  styleUrls: ['./login-mobile.component.scss']
})
export class LoginMobileComponent {
  step: 'code' | 'waiting' | 'done' = 'code';
  code = '';

  constructor(private router: Router, private auth: AuthService) {}

  submitCode() {
    if (this.code.length === 6) {
      this.step = 'waiting';
      setTimeout(() => {
        this.step = 'done';
        const user: User = { nom: 'Jean Dupont', email: 'jean.dupont@email.be', role: 'citoyen' };
        this.auth.login(user);
        setTimeout(() => this.router.navigate(['/accueil']), 1200);
      }, 1300);
    }
  }
}
