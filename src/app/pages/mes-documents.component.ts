import { Component, OnInit, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MesDocumentsService, DocItem } from '../services/mes-documents.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-mes-documents',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    TranslateModule
  ],
  templateUrl: './mes-documents.component.html',
  styleUrls: ['./mes-documents.component.scss']
})
export class MesDocumentsComponent implements OnInit {
  docs: DocItem[] = [];
  filteredDocs: DocItem[] = [];
  loading = false;
  search = '';
  selectedType = 'all';

  @ViewChild('fileUpload') fileUpload!: ElementRef<HTMLInputElement>;

  private docService: MesDocumentsService = inject(MesDocumentsService);

  ngOnInit() {
    this.loadDocs();
  }

  loadDocs() {
    this.loading = true;
    this.docService.getDocs().subscribe(d => {
      this.docs = d;
      this.applyFilter();
      this.loading = false;
    });
  }

  applyFilter() {
    let f = this.docs;
    if (this.selectedType !== 'all') f = f.filter(d => d.type === this.selectedType);
    if (this.search.trim()) {
      const s = this.search.trim().toLowerCase();
      f = f.filter(d =>
        d.nom.toLowerCase().includes(s) ||
        d.medecin.toLowerCase().includes(s) ||
        d.type.toLowerCase().includes(s)
      );
    }
    this.filteredDocs = f;
  }

  onTypeChange(val: string) {
    this.selectedType = val;
    this.applyFilter();
  }

  openDoc(doc: DocItem) {
    window.open(doc.url, '_blank');
  }

  downloadDoc(doc: DocItem) {
    const a = document.createElement('a');
    a.href = doc.url;
    a.download = doc.nom;
    a.click();
  }

  shareDoc(doc: DocItem) {
    alert(`Partage du document "${doc.nom}" via un lien sécurisé !\n(Simulation)`);
  }

  deleteDoc(doc: DocItem) {
    if (confirm(`Supprimer "${doc.nom}" ?`)) {
      this.docs = this.docs.filter(d => d !== doc);
      this.applyFilter();
    }
  }

  uploadTrigger() {
    this.fileUpload.nativeElement.click();
  }

  uploadDoc(ev: Event) {
    const file = (ev.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const ext = file.name.split('.').pop();
    const type = ext === 'pdf' ? 'Analyse' : 'Autre';
    this.docs.unshift({
      nom: file.name,
      date: new Date().toISOString(),
      type: type as DocItem['type'],
      url,
      medecin: 'Vous',
      status: 'Nouveau'
    });
    this.applyFilter();
    alert('Document ajouté ! (Simulation)');
  }
}
