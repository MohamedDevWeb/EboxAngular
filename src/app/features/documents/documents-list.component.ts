// src/app/features/documents/documents-list.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-documents-list',
  standalone: true,
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.scss'],
  imports: [CommonModule]
})
export class DocumentsListComponent {
  @Output() documentSelected = new EventEmitter<string>();

  documents = [
    { name: 'Ordonnance janvier', url: 'assets/dummy.pdf' },
    { name: 'Résultat prise de sang', url: 'assets/dummy.pdf' },
    { name: 'Lettre médecin', url: 'assets/dummy.pdf' }
  ];

  selectDocument(doc: { name: string; url: string }) {
    this.documentSelected.emit(doc.url);
  }
}
