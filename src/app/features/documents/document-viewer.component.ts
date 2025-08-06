// src/app/features/documents/document-viewer.component.ts
import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-document-viewer',
  standalone: true,
  imports: [NgIf, NgxExtendedPdfViewerModule],
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss']
})
export class DocumentViewerComponent {
  @Input() pdfUrl: string | null = null;
}
