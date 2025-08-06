import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface DocItem {
  nom: string;
  date: string;
  type: 'Analyse' | 'Ordonnance' | 'Radio' | 'Lettre' | 'Autre';
  url: string;
  medecin: string;
  status?: string;
}

@Injectable({ providedIn: 'root' })
export class MesDocumentsService {
  private docs: DocItem[] = [
    {
      nom: 'Analyse_sang_2024.pdf',
      date: new Date().toISOString(),
      type: 'Analyse',
      url: '/assets/Analyse_sang_2024.pdf',
      medecin: 'Dr Alain Martin',
      status: 'Nouveau'
    },
    {
      nom: 'Ordonnance_octobre.pdf',
      date: new Date(Date.now() - 86400000 * 6).toISOString(),
      type: 'Ordonnance',
      url: '/assets/Ordonnance_octobre.pdf',
      medecin: 'Dr Sophie Durand'
    },
    {
      nom: 'Radio_Poumons.jpg',
      date: new Date(Date.now() - 86400000 * 22).toISOString(),
      type: 'Radio',
      url: '/assets/Radio_Poumons.jpg',
      medecin: 'Dr Luc Petit'
    }
  ];

  getDocs(): Observable<DocItem[]> {
    return of(this.docs).pipe(delay(700));
  }
}
