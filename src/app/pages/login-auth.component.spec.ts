import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../auth.service';

@Component({
  selector: 'app-login-auth',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login-auth.component.html',
  styleUrls: ['./login-auth.component.scss']
})
export class LoginAuthComponent {
  constructor(private router: Router, private auth: AuthService) {}

  // Simule la navigation vers chaque méthode d'identification (vers les FAUSSES pages correspondantes)
  authItsme()      { this.router.navigate(['/login-itsme']); }
  authEid()        { this.router.navigate(['/login-eid']); }
  authEmail()      { this.router.navigate(['/login-email']); }
  authMobile()     { this.router.navigate(['/login-mobile']); }
  authEuropean()   { this.router.navigate(['/login-eu']); }
}
