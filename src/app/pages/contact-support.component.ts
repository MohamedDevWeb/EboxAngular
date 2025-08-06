import { Component, OnInit, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ContactSupportService, ContactFormData } from '../services/contact-support.service';
import { TranslateModule } from '@ngx-translate/core';

interface FaqItem {
  question: string; // clé JSON
  answer: string;   // clé JSON
  open?: boolean;
}

@Component({
  selector: 'app-contact-support',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    TranslateModule
  ],
  templateUrl: './contact-support.component.html',
  styleUrls: ['./contact-support.component.scss']
})
export class ContactSupportComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload!: ElementRef<HTMLInputElement>;
  @ViewChild('contactForm') contactForm!: NgForm;

  // Formulaire
  form: ContactFormData = {
    nom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: '',
    file: undefined,
    consent: false
  };
  sujetOptions = [
    'CONTACT.SUJET_ASSISTANCE',
    'CONTACT.SUJET_QUESTIONS_MED',
    'CONTACT.SUJET_CONNEXION',
    'CONTACT.SUJET_DOCUMENT',
    'CONTACT.SUJET_AUTRE'
  ];
  loading = false;
  sent = false;
  error = '';
  fileName = '';

  // FAQ en clés JSON
  faq: FaqItem[] = [
    {
      question: 'FAQ_DOC_DUPLICATA',
      answer: 'FAQ_DOC_DUPLICATA_REP',
      open: false
    },
    {
      question: 'FAQ_RDV_MEDECIN',
      answer: 'FAQ_RDV_MEDECIN_REP',
      open: false
    },
    {
      question: 'FAQ_PERTE_ACCES',
      answer: 'FAQ_PERTE_ACCES_REP',
      open: false
    },
    {
      question: 'FAQ_PROTECTION_DONNEES',
      answer: 'FAQ_PROTECTION_DONNEES_REP',
      open: false
    },
    {
      question: 'FAQ_ENVOI_EMAIL',
      answer: 'FAQ_ENVOI_EMAIL_REP',
      open: false
    }
  ];

  // Contact rapide
  horaires = [
    { jours: 'CONTACT.DAYS_WEEK', heures: '08:00 – 20:00' },
    { jours: 'CONTACT.DAY_SATURDAY', heures: '09:00 – 13:00' }
  ];

  private contactService: ContactSupportService = inject(ContactSupportService);

  ngOnInit() {
    this.resetForm();
  }

  uploadTrigger() {
    this.fileUpload.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.form.file = file;
    this.fileName = file ? file.name : '';
  }

  toggleFaq(i: number) {
    this.faq[i].open = !this.faq[i].open;
  }

  resetForm() {
    this.form = {
      nom: '',
      email: '',
      telephone: '',
      sujet: '',
      message: '',
      file: undefined,
      consent: false
    };
    this.fileName = '';
    this.sent = false;
    this.error = '';
    if (this.contactForm) this.contactForm.resetForm();
  }

  submitForm() {
    this.loading = true;
    this.error = '';
    this.sent = false;

    setTimeout(() => {
      if (!this.form.nom.trim() || !this.form.email.trim() || !this.form.sujet.trim() || !this.form.message.trim()) {
        this.error = "Merci de remplir tous les champs obligatoires.";
        this.loading = false;
        return;
      }
      if (!this.form.consent) {
        this.error = "Merci d'accepter la politique de confidentialité.";
        this.loading = false;
        return;
      }
      this.contactService.sendForm(this.form).subscribe({
        next: () => {
          this.loading = false;
          this.sent = true;
          this.resetForm();
        },
        error: () => {
          this.error = "Erreur lors de l'envoi. Veuillez réessayer.";
          this.loading = false;
        }
      });
    }, 1200);
  }

  openLiveChat() {
    alert('Un conseiller va vous répondre (simulation live chat).');
  }

  openMap() {
    window.open('https://maps.google.com/?q=Centre+Médical+Santé+Plus+Bruxelles', '_blank');
  }
}
