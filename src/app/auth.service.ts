import { Injectable } from '@angular/core';

export interface User {
  nom: string;
  email: string;
  role: string; // 'citoyen' | 'entreprise' | 'pro'
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userKey = 'ebox_user';

  get user(): User | null {
    const data = localStorage.getItem(this.userKey);
    return data ? JSON.parse(data) : null;
  }

  login(user: User) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem(this.userKey);
    window.location.href = '/login-flux'; // Redirige vers la vraie page d’entrée institutionnelle
  }

  isLoggedIn(): boolean {
    return !!this.user;
  }
}
