import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-analyses-examens',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    TranslateModule
  ],
  templateUrl: './analyses-examens.component.html',
  styleUrls: ['./analyses-examens.component.scss']
})
export class AnalysesExamensComponent {
  examens = [
    {
      type: 'Sang',
      date: '10/07/2025',
      file: 'Analyse_sang_10_07_2025.pdf',
      disponible: true
    },
    {
      type: 'IRM',
      date: '21/05/2025',
      file: 'IRM_Crane_21_05_2025.pdf',
      disponible: false
    }
  ];
}
