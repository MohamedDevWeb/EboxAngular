import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ← pour ngModel
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProfilService, ProfilData, ProfilConnexion } from '../services/profil.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // ← ajoute FormsModule ici pour ngModel
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    TranslateModule
  ],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  profil?: ProfilData;
  connexions: ProfilConnexion[] = [];
  loading = false;
  editMode = false;
  showPwd = false;
  isDarkMode = false; // ← Ajoute la propriété ici

  // Typage explicite pour éviter l'erreur "unknown"
  private profilService: ProfilService = inject(ProfilService);

  ngOnInit() {
    this.loading = true;
    this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.profilService.getProfil().subscribe(p => {
      this.profil = { ...p };
      this.loading = false;
    });
    this.profilService.getConnexions().subscribe(c => this.connexions = c);
  }

  toggleEdit() { this.editMode = !this.editMode; }
  togglePwd() { this.showPwd = !this.showPwd; }

  saveProfil() {
    if (!this.profil) return;
    this.loading = true;
    this.profilService.saveProfil(this.profil).subscribe(() => {
      this.loading = false;
      this.editMode = false;
      // rien à faire, la synchro est auto partout
    });
  }

  exportData() {
    this.profilService.exportRGPD();
  }

  deleteProfil() {
    if (confirm("⚠️ Supprimer définitivement votre compte ? Cette action est irréversible.")) {
      this.profilService.deleteProfil();
    }
  }
}
