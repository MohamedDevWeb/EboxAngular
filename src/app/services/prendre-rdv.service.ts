import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface Medecin {
  id: number;
  nom: string;
  specialite: string;
}
export interface MotifItem {
  id: string;        // clé technique (ex: 'consultation')
  label: string;     // clé i18n (ex: 'RDV_CONSULTATION_GENERALE')
}
export interface RdvItem {
  id: number;
  medecin: Medecin;
  motif: MotifItem;
  date: Date;
  creneau: string;
  commentaire?: string;
  pieceJointe?: string | null;
}

@Injectable({ providedIn: 'root' })
export class PrendreRdvService {
  private medecins: Medecin[] = [
    { id: 1, nom: "Dupont", specialite: "Généraliste" },
    { id: 2, nom: "Martin", specialite: "Cardiologue" },
    { id: 3, nom: "Durand", specialite: "Pédiatre" },
    { id: 4, nom: "Mehdi", specialite: "Dermatologue" }
  ];

  private motifs: MotifItem[] = [
    { id: 'consultation', label: 'RDV_CONSULTATION_GENERALE' },
    { id: 'renouvellement', label: 'RDV_RENOUVELLEMENT_ORDONNANCE' },
    { id: 'resultats', label: 'RDV_RESULTATS_ANALYSE' },
    { id: 'suivi', label: 'RDV_SUIVI_TRAITEMENT' },
    { id: 'urgence', label: 'RDV_URGENCE_LEGERE' }
  ];

  private creneauxDefaut: string[] = [
    "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "14:00", "14:30",
    "15:00", "15:30", "16:00"
  ];

  getMedecins(): Observable<Medecin[]> {
    return of(this.medecins).pipe(delay(350));
  }
  getMotifs(): MotifItem[] {
    return this.motifs;
  }
  getCreneaux(medecinId: number, date: Date): Observable<string[]> {
    let slots = [...this.creneauxDefaut];
    if (date.getDay() === 0 || date.getDay() === 6) slots = []; // Week-end : pas de dispo
    if (medecinId % 2 === 0 && slots.length > 0) slots = slots.filter((_, i) => i % 2 === 0);
    if (Math.random() > 0.8) slots = slots.slice(0, Math.floor(Math.random() * slots.length));
    return of(slots).pipe(delay(500));
  }
  prendreRdv(item: RdvItem): Observable<any> {
    return of({ success: true }).pipe(delay(1200));
  }
}
