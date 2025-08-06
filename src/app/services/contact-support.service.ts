import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface ContactFormData {
  nom: string;
  email: string;
  telephone?: string;
  sujet: string;
  message: string;
  file?: File;
  consent: boolean;
}

@Injectable({ providedIn: 'root' })
export class ContactSupportService {
  sendForm(data: ContactFormData): Observable<boolean> {
    // Simuler un appel API ici (upload, stockage…)
    console.log('Envoi du formulaire', data);
    return of(true).pipe(delay(1400));
  }
}
