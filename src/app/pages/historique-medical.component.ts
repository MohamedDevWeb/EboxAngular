import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-historique-medical',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, TranslateModule],
  templateUrl: './historique-medical.component.html',
  styleUrls: ['./historique-medical.component.scss']
})
export class HistoriqueMedicalComponent {
  lang = 'fr';
  historique = [
    {
      icon: 'vaccines',
      titreFr: 'Vaccination COVID-19',
      titreNl: 'COVID-19-vaccinatie',
      descFr: 'Vous avez reçu une dose Pfizer le 12/04/2024.',
      descNl: 'U kreeg een Pfizer-dosis op 12/04/2024.',
      date: '12/04/2024'
    },
    {
      icon: 'healing',
      titreFr: 'Consultation généraliste',
      titreNl: 'Huisartsconsult',
      descFr: 'Consultation Dr. Dupont. Ordonnance renouvelée.',
      descNl: 'Consult bij Dr. Dupont. Voorschrift vernieuwd.',
      date: '18/03/2024'
    }
  ];

  constructor(private translate: TranslateService) {
    this.lang = translate.currentLang || translate.defaultLang || 'fr';
    this.translate.onLangChange.subscribe(e => { this.lang = e.lang; });
  }
}
