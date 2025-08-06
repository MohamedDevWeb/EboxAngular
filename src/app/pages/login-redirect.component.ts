import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login-redirect',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './login-redirect.component.html',
  styleUrls: ['./login-redirect.component.scss']
})
export class LoginRedirectComponent {
  constructor(private router: Router) {
    setTimeout(() => this.router.navigate(['/login-auth']), 1200);
  }
}

