import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../auth.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login-itsme',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './login-itsme.component.html',
  styleUrls: ['./login-itsme.component.scss']
})
export class LoginItsmeComponent {
  step: 'qr' | 'waiting' | 'done' = 'qr';

  constructor(private router: Router, private auth: AuthService) {}

  simulateScan() {
    this.step = 'waiting';
    setTimeout(() => {
      this.step = 'done';
      const user: User = { nom: 'Jean Dupont', email: 'jean.dupont@email.be', role: 'citoyen' };
      this.auth.login(user);
      setTimeout(() => this.router.navigate(['/accueil']), 1200);
    }, 1700);
  }
}
