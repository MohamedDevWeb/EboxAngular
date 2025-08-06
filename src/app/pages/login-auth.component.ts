import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login-auth',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './login-auth.component.html',
  styleUrls: ['./login-auth.component.scss']
})
export class LoginAuthComponent {
  constructor(private router: Router) {}

  // Simule le parcours utilisateur vers chaque méthode (pas de login immédiat)
  authItsme()    { this.router.navigate(['/login-itsme']); }
  authEid()      { this.router.navigate(['/login-eid']); }
  authEmail()    { this.router.navigate(['/login-email']); }
  authMobile()   { this.router.navigate(['/login-mobile']); }
  authEuropean() { this.router.navigate(['/login-eu']); }
}
