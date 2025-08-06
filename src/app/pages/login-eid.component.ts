import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../auth.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login-eid',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './login-eid.component.html',
  styleUrls: ['./login-eid.component.scss']
})
export class LoginEidComponent {
  step: 'insert' | 'waiting' | 'done' = 'insert';

  constructor(private router: Router, private auth: AuthService) {}

  simulateEid() {
    this.step = 'waiting';
    setTimeout(() => {
      this.step = 'done';
      const user: User = { nom: 'Jean Dupont', email: 'jean.dupont@email.be', role: 'citoyen' };
      this.auth.login(user);
      setTimeout(() => this.router.navigate(['/accueil']), 1200);
    }, 1600);
  }
}
