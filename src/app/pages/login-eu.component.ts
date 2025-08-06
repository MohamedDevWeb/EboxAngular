import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../auth.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login-eu',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './login-eu.component.html',
  styleUrls: ['./login-eu.component.scss']
})
export class LoginEuComponent {
  step: 'waiting' | 'done' = 'waiting';

  constructor(private router: Router, private auth: AuthService) {
    setTimeout(() => {
      this.step = 'done';
      const user: User = { nom: 'Jean Dupont', email: 'jean.dupont@email.be', role: 'citoyen' };
      this.auth.login(user);
      setTimeout(() => this.router.navigate(['/accueil']), 1200);
    }, 1800);
  }
}
