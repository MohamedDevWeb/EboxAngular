import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface NotificationItem {
  id: number;
  titre: string;   // Clé JSON à traduire
  message: string; // Clé JSON à traduire
  date: string;
  type: 'info' | 'urgent' | 'rappel' | 'partage';
  lu: boolean;
  archive?: boolean;
  lien?: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationsService {
  private notifs: NotificationItem[] = [
    {
      id: 1,
      titre: 'NOTIF_PARTAGE_TITRE',
      message: 'NOTIF_PARTAGE_MSG',
      date: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      type: 'partage',
      lu: false,
      lien: '/assets/Analyse_sang_2024.pdf'
    },
    {
      id: 2,
      titre: 'NOTIF_RAPPEL_TITRE',
      message: 'NOTIF_RAPPEL_MSG',
      date: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
      type: 'rappel',
      lu: false
    },
    {
      id: 3,
      titre: 'NOTIF_URGENCE_TITRE',
      message: 'NOTIF_URGENCE_MSG',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      type: 'urgent',
      lu: true
    },
    {
      id: 4,
      titre: 'NOTIF_INFO_TITRE',
      message: 'NOTIF_INFO_MSG',
      date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      type: 'info',
      lu: true
    }
  ];

  getAll(): Observable<NotificationItem[]> {
    // Simule un appel API
    return of([...this.notifs]).pipe(delay(650));
  }
}
