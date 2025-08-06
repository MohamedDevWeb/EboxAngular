// src/app/features/documents/upload-form.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-upload-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule],
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent {
  nomDocument = '';
  fichier: File | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.fichier = input.files[0];
    }
  }

  onUpload(): void {
    if (!this.nomDocument || !this.fichier) return;

    // Mock : affichage console
    console.log('📤 Nom du document :', this.nomDocument);
    console.log('📄 Fichier sélectionné :', this.fichier.name);

    alert(`Document "${this.nomDocument}" envoyé avec succès !`);
    this.nomDocument = '';
    this.fichier = null;
  }
}
