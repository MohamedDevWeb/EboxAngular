import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-guide',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, TranslateModule],
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss']
})
export class GuideComponent {
  guides = [
    { key: 'CONSULT', icon: 'info' },
    { key: 'SECURITY', icon: 'lock' },
    { key: 'FAQ', icon: 'local_hospital' }
  ];

  constructor(private translate: TranslateService) {}
}
