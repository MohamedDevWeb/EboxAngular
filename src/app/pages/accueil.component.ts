import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// AJOUT ICI :
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    TranslateModule // ← Très important
  ],
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {
  lang = localStorage.getItem('lang') || 'fr';

  get t() {
    return this.lang === 'nl' ? this.translations.nl : this.translations.fr;
  }

  translations = {
    fr: {
      title: "Bienvenue sur votre eBox Santé+",
      subtitle: "Accédez à vos documents officiels de santé, prises de rendez-vous et analyses en toute sécurité.",
      cta_docs: "Accéder à mes documents",
      cta_rdv: "Prendre rendez-vous",
      cta_analyses: "Voir mes analyses",
      a_propos: "À propos",
      a_propos_desc: `eBox Santé+ est le portail sécurisé de l'administration santé à Bruxelles.
      Accédez à vos résultats médicaux, documents officiels et démarches administratives en ligne 24h/24.`,
      learn_more: "En savoir plus",
      partenaires: "Partenaires institutionnels",
      secu: "Données sécurisées, hébergement 100% Belgique – Conformité RGPD",
    },
    nl: {
      title: "Welkom op uw eBox Santé+",
      subtitle: "Toegang tot uw officiële gezondheidsdocumenten, afspraken en analyses in alle veiligheid.",
      cta_docs: "Toegang tot mijn documenten",
      cta_rdv: "Afspraak maken",
      cta_analyses: "Mijn analyses bekijken",
      a_propos: "Over",
      a_propos_desc: `eBox Santé+ is het beveiligde portaal voor gezondheidsadministratie in Brussel.
      Toegang tot medische resultaten, officiële documenten en online administratieve procedures 24/7.`,
      learn_more: "Meer weten",
      partenaires: "Institutionele partners",
      secu: "Beveiligde gegevens, 100% hosting in België – GDPR-conform",
    }
  };

  constructor(private router: Router) {}

  go(page: string) {
    this.router.navigate([page]);
  }
}
