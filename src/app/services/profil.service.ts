import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, delay } from 'rxjs';

export interface ProfilData {
  nom: string;
  prenom: string;
  email: string;
  inami: string;
  role: 'Patient' | 'Médecin' | 'Infirmier';
  status: 'Actif' | 'Inactif';
  avatar: string;
  groupeSanguin: string;
  mutuelle: string;
  mutuelleDoc?: string;
  vaccination?: string;
  allergies?: string;
  medecin?: string;
  password: string;
}
export interface ProfilConnexion {
  date: string;
  type: string;
  succes: boolean;
}

@Injectable({ providedIn: 'root' })
export class ProfilService {
  private mockProfil: ProfilData = {
    nom: 'Dupont',
    prenom: 'Sophie',
    email: 'sophie.dupont@email.com',
    inami: '12345678901',
    role: 'Patient',
    status: 'Actif',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    groupeSanguin: 'A+',
    mutuelle: 'Mutuelle Partena',
    mutuelleDoc: '/assets/attestation-mutuelle.pdf',
    vaccination: 'à jour (COVID, grippe)',
    allergies: 'pollen, pénicilline',
    medecin: 'Dr Alain Martin',
    password: '••••••••'
  };
  private mockConnexions: ProfilConnexion[] = [
    { date: new Date().toISOString(), type: 'itsme', succes: true },
    { date: new Date(Date.now() - 86400000).toISOString(), type: 'mot de passe', succes: true },
    { date: new Date(Date.now() - 3 * 86400000).toISOString(), type: 'eID', succes: false }
  ];

  // Ajout : BehaviorSubject pour synchro dynamique
  private profilSubject = new BehaviorSubject<ProfilData>({ ...this.mockProfil });

  getProfil(): Observable<ProfilData> {
    // On utilise le BehaviorSubject pour la synchro instantanée
    return this.profilSubject.asObservable();
  }

  getProfilValue(): ProfilData {
    return this.profilSubject.value;
  }

  getConnexions(): Observable<ProfilConnexion[]> {
    return of(this.mockConnexions).pipe(delay(350));
  }

  saveProfil(data: ProfilData): Observable<boolean> {
    Object.assign(this.mockProfil, data);
    this.profilSubject.next({ ...this.mockProfil }); // Mise à jour réactive !
    return of(true).pipe(delay(500));
  }

  exportRGPD() {
    alert('Un export RGPD (PDF ou CSV) va être téléchargé. (Simulation)');
  }

  deleteProfil() {
    alert('Compte supprimé ! (Simulation)');
  }
}
