import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class LanguageSwitcherComponent {
  @Input() position: 'top' | 'bottom' = 'top';

  constructor(public translate: TranslateService) {}

  setLang(lang: 'fr' | 'nl') {
    this.translate.use(lang);
    localStorage.setItem('locale', lang);
  }

  get locale() {
    return this.translate.currentLang || this.translate.defaultLang || 'fr';
  }
}
