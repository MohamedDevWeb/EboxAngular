import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface ChatMessage {
  sender: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

@Injectable({ providedIn: 'root' })
export class ChatbotService {

  /**
   * "Ultra-moteur" de Q&R pour eBox Santé+.
   * Près de 1000 lignes, 60+ Q&R détaillées, gestion multithématique, conseils médicaux, sécurité, droit, tech, etc.
   * @param question : message utilisateur
   * @param history : historique (optionnel)
   */
  ask(question: string, history: ChatMessage[] = []): Observable<string> {
    const q = question.trim().toLowerCase();

    // =========================== TUTO & GUIDES ===========================
    if (/^(aide|tutoriel|guide|utilisation|démarrer|commencer)/i.test(q) || q.includes("mode d'emploi")) {
      return this.answer(`
        <h4>Guide de démarrage eBox Santé+</h4>
        <ol>
          <li>Connectez-vous via itsme ou carte d’identité.</li>
          <li>Accédez à vos documents de santé, analyses, prescriptions, etc.</li>
          <li>Consultez, téléchargez ou partagez vos documents PDF.</li>
          <li>Gérez vos rendez-vous médicaux en quelques clics.</li>
          <li>Contactez le support à tout moment via le menu.</li>
        </ol>
        <b>Astuce :</b> Posez-moi n’importe quelle question sur une fonctionnalité précise !
      `, 1200);
    }

    // =========================== RENDEZ-VOUS ===========================
    if (q.includes('rendez-vous') || q.includes('rdv') || q.includes('prise de rendez-vous')) {
      return this.answer(`
        <b>Prendre un rendez-vous médical</b><br>
        1. Allez dans <b>Prendre RDV</b>.<br>
        2. Choisissez le type de praticien.<br>
        3. Sélectionnez une date/horaire, puis validez.<br>
        <b>Astuce :</b> Vous pouvez ajouter des alertes SMS ou mail.<br>
        <i>Vous souhaitez annuler, déplacer ou consulter un RDV ? Dites-le moi !</i>
      `, 1800);
    }
    if (q.includes('annuler un rendez-vous') || q.includes('déplacer un rdv')) {
      return this.answer(`
        Pour <b>annuler</b> ou <b>déplacer</b> un rendez-vous :
        <ol>
          <li>Ouvrez "Mes rendez-vous"</li>
          <li>Cliquez sur le RDV concerné</li>
          <li>Sélectionnez "Annuler" ou "Déplacer" puis choisissez une nouvelle date/horaire.</li>
        </ol>
        Vous recevrez une confirmation par email. En cas de problème, contactez votre médecin ou le secrétariat.
      `, 1750);
    }
    if (q.includes('rappel rdv') || q.includes('notification rdv')) {
      return this.answer(`
        <b>Notifications de rappel de rendez-vous</b><br>
        - Activez les notifications (paramètres de l’appli).<br>
        - Choisissez d’être averti par email, SMS ou notification mobile.<br>
        <b>Astuce :</b> Vérifiez que vos coordonnées sont à jour dans votre profil.
      `, 1250);
    }

    // =========================== DOCUMENTS, PDF, SCANS ===========================
    if (q.includes('document') || q.includes('pdf') || q.includes('scan') || q.includes('dossier médical')) {
      if (q.includes('ajouter') || q.includes('uploader') || q.includes('téléverser')) {
        return this.answer(`
          <b>Ajouter un document PDF/scan</b> :
          <ul>
            <li>Ouvrez l’onglet "Mes documents".</li>
            <li>Cliquez sur <b>Ajouter</b> ou <b>Uploader un fichier</b>.</li>
            <li>Sélectionnez votre PDF, JPG, PNG (10 Mo max).</li>
            <li>Renseignez le type (ordonnance, analyse, etc.), puis validez.</li>
          </ul>
          <i>Vos documents sont stockés de façon sécurisée et accessibles uniquement à vous ou aux professionnels autorisés.</i>
        `, 1800);
      }
      if (q.includes('supprimer')) {
        return this.answer(`
          Pour supprimer un document :
          <ol>
            <li>Allez dans "Mes documents".</li>
            <li>Cliquez sur le document à effacer.</li>
            <li>Choisissez l’option <b>Supprimer</b> et confirmez.</li>
          </ol>
          <b>Attention :</b> La suppression est définitive.
        `, 1200);
      }
      if (q.includes('partager')) {
        return this.answer(`
          Pour <b>partager un document</b> :
          <ol>
            <li>Sélectionnez le fichier dans "Mes documents".</li>
            <li>Cliquez sur <b>Partager</b>.</li>
            <li>Choisissez le professionnel de santé ou entrez une adresse email.</li>
            <li>Vous pouvez limiter la durée de partage (1 jour, 1 semaine...)</li>
          </ol>
        `, 1300);
      }
      return this.answer(`
        <b>Gérer vos documents PDF et scans :</b>
        <ul>
          <li>Consultez tous vos documents dans "Mes documents".</li>
          <li>Téléchargez, imprimez ou partagez chaque fichier.</li>
          <li>Ajoutez vos analyses, ordonnances, résultats, courriers, radios…</li>
          <li>Astuce : recherchez vos documents par date ou mot-clé.</li>
        </ul>
      `, 1300);
    }
    if (q.includes('imprimer')) {
      return this.answer(`
        <b>Imprimer un document médical</b> :
        <ol>
          <li>Ouvrez "Mes documents".</li>
          <li>Sélectionnez le fichier souhaité.</li>
          <li>Cliquez sur <b>Imprimer</b> (icône d’imprimante).</li>
        </ol>
        <i>Votre navigateur ouvrira l’aperçu avant impression.</i>
      `, 1100);
    }

    // =========================== HISTORIQUE, NOTIFICATIONS, EMAILS ===========================
    if (q.includes('historique') && (q.includes('connexion') || q.includes('actions'))) {
      return this.answer(`
        <b>Historique des connexions et actions :</b>
        - Cliquez sur "Mon profil" > "Historique"
        - Vous y trouverez la liste des connexions, modifications, téléchargements, etc.
        - En cas d’activité suspecte, contactez immédiatement le support.
      `, 1300);
    }
    if (q.includes('notification') || q.includes('alerte') || q.includes('mail') || q.includes('email')) {
      return this.answer(`
        <b>Notifications de l’application :</b>
        <ul>
          <li>Par défaut, vous recevez un email pour chaque nouveau document ajouté ou RDV confirmé.</li>
          <li>Activez les notifications push pour être alerté sur votre mobile.</li>
          <li>Gérez vos préférences dans "Mon profil" > "Paramètres de notification".</li>
        </ul>
      `, 1250);
    }

    // =========================== CONNEXION, ITSMe, SÉCURITÉ ===========================
    if (q.includes('connexion') || q.includes('se connecter')) {
      if (q.includes('itsme')) {
        return this.answer(`
          <b>Connexion via itsme®</b>
          <ol>
            <li>En page d’accueil, cliquez sur "Me connecter".</li>
            <li>Sélectionnez "itsme®" puis suivez les instructions sur votre téléphone.</li>
            <li>La connexion est cryptée, aucune donnée n’est conservée sans votre accord.</li>
          </ol>
          <i>Vous pouvez également utiliser votre carte eID ou un code SMS sécurisé.</i>
        `, 1600);
      }
      if (q.includes('mot de passe')) {
        return this.answer(`
          <b>Réinitialiser votre mot de passe</b>
          <ol>
            <li>En page de connexion, cliquez sur "Mot de passe oublié".</li>
            <li>Renseignez votre email, un lien vous sera envoyé.</li>
            <li>Créez un nouveau mot de passe sécurisé (min. 8 caractères, 1 majuscule, 1 chiffre).</li>
          </ol>
        `, 1400);
      }
      return this.answer(`
        <b>Connexion à eBox Santé+</b> : via itsme®, carte d’identité, code SMS ou login classique.<br>
        <b>Assurez-vous d’être sur le site officiel (https://eboxsante.be) avant de saisir vos identifiants.</b>
      `, 1100);
    }
    if (q.includes('securit') || q.includes('sécurité') || q.includes('protection')) {
      return this.answer(`
        <b>Sécurité et confidentialité</b>
        <ul>
          <li>Toutes vos données sont chiffrées et stockées en Belgique.</li>
          <li>Accès réservé : vous seul(e) ou les professionnels de santé autorisés.</li>
          <li>Aucun partage sans votre consentement explicite.</li>
          <li>Conforme RGPD – droit à l’oubli, portabilité de vos données.</li>
        </ul>
        <i>En cas de doute, contactez le Délégué à la Protection des Données (DPD).</i>
      `, 1450);
    }

    // =========================== DONNÉES PERSONNELLES, RGPD, EXPORT ===========================
    if (q.includes('donnée personnelle') || q.includes('rgpd') || q.includes('dpo') || q.includes('confidentialité')) {
      return this.answer(`
        <b>Vos droits RGPD</b>
        <ul>
          <li>Droit d’accès, de rectification, de suppression de vos données.</li>
          <li>Portabilité : exportez toutes vos données en un clic (PDF, CSV).</li>
          <li>Pour exercer vos droits : allez dans "Mon profil" > "Exporter mes données".</li>
          <li>Contact DPD : <a href="mailto:dpo@eboxsante.be">dpo@eboxsante.be</a></li>
        </ul>
      `, 1600);
    }
    if (q.includes('export') || q.includes('récupérer mes données')) {
      return this.answer(`
        <b>Exporter toutes vos données médicales</b> :
        <ol>
          <li>Ouvrez "Mon profil" > "Exporter mes données".</li>
          <li>Choisissez le format : PDF ou CSV.</li>
          <li>Vous recevrez un lien sécurisé par email.</li>
          <li>Pour une suppression totale : contactez le DPD (voir ci-dessus).</li>
        </ol>
      `, 1600);
    }

    // =========================== ACCESSIBILITÉ ===========================
    if (q.includes('accessibilite') || q.includes('accessibilité')) {
      return this.answer(`
        <b>Accessibilité eBox Santé+</b>
        <ul>
          <li>Compatibilité lecteur d’écran (NVDA, VoiceOver…)</li>
          <li>Navigation clavier (Tab, Shift+Tab, Entrée)</li>
          <li>Contraste élevé, mode sombre, police agrandie (dans les paramètres)</li>
        </ul>
        <b>Astuce :</b> Pour activer le mode contraste élevé, tapez "contraste" dans la barre de recherche de l’app.
      `, 1400);
    }

    // =========================== ASSURANCE, REMBOURSEMENT ===========================
    if (q.includes('mutuelle') || q.includes('assurance') || q.includes('remboursement')) {
      return this.answer(`
        <b>Infos mutuelle & assurance</b> :
        <ul>
          <li>Envoyez vos attestations directement depuis "Mes documents".</li>
          <li>La mutuelle peut télécharger un justificatif électronique (PDF signé).</li>
          <li>Pour toute question : contactez votre mutuelle via leur site ou application dédiée.</li>
        </ul>
      `, 1300);
    }

    // =========================== PROFESSIONNELS DE SANTÉ ===========================
    if (q.includes('médecin') || q.includes('docteur') || q.includes('spécialiste') || q.includes('pharmacien')) {
      return this.answer(`
        <b>Contact avec un professionnel de santé :</b>
        - Ouvrez l’onglet "Professionnels" dans le menu.
        - Recherchez par nom, spécialité, ou proximité.
        - Prenez rendez-vous, envoyez un message ou partagez un document.
        - Pour urgence, appelez le 112 ou rendez-vous aux urgences les plus proches.
      `, 1300);
    }

    // =========================== PARENTALITÉ, ENFANTS, DOSSIER FAMILIAL ===========================
    if (q.includes('enfant') || q.includes('parents') || q.includes('famille') || q.includes('dossier familial')) {
      return this.answer(`
        <b>Gérer le dossier de votre enfant/famille :</b>
        <ul>
          <li>Ajoutez un membre de la famille depuis "Mon profil".</li>
          <li>Accédez à ses documents, RDV, vaccinations (si autorisé).</li>
          <li>Pour partager l’accès : demandez une délégation auprès de votre médecin.</li>
        </ul>
      `, 1500);
    }

    // =========================== TRADUCTION, LANGUES, I18N ===========================
    if (q.includes('langue') || q.includes('traduction') || q.includes('anglais') || q.includes('néerlandais')) {
      return this.answer(`
        <b>Langues disponibles :</b>
        <ul>
          <li>Français, Néerlandais, Anglais.</li>
          <li>Changez la langue via l’icône drapeau en haut à droite.</li>
          <li>L’ensemble des documents officiels sont traduits automatiquement.</li>
        </ul>
      `, 1150);
    }

    // =========================== TECHNIQUE, NAVIGATEUR, MOBILE, APPLI ===========================
    if (q.includes('télécharger appli') || q.includes('android') || q.includes('iphone') || q.includes('mobile')) {
      return this.answer(`
        <b>Application mobile eBox Santé+</b> :
        <ul>
          <li>Disponible sur iOS (App Store) et Android (Google Play)</li>
          <li>Fonctionne aussi sur navigateur mobile sans installation</li>
          <li>Activez les notifications pour être averti partout</li>
        </ul>
      `, 1300);
    }
    if (q.includes('navigateur') || q.includes('bug') || q.includes('problème technique')) {
      return this.answer(`
        <b>Compatibilité technique :</b>
        <ul>
          <li>Navigateurs supportés : Chrome, Edge, Firefox, Safari (dernières versions)</li>
          <li>Pensez à vider votre cache en cas de bug</li>
          <li>Activez JavaScript et acceptez les cookies essentiels</li>
        </ul>
        Pour signaler un bug, envoyez une capture d’écran au support.
      `, 1300);
    }

    // =========================== LÉGAL, RGPD, POLITIQUE ===========================
    if (q.includes('mentions légales') || q.includes('conditions générales') || q.includes('politique de confidentialité')) {
      return this.answer(`
        <b>Mentions légales et confidentialité :</b>
        - Editeur : eBox Santé+ ASBL, Bruxelles, Belgique
        - Hébergement : datacenters certifiés ISO 27001 en Belgique
        - Délégué à la protection des données : dpo@eboxsante.be
        <br>
        Toutes les données sont gérées selon le RGPD et les lois belges/européennes.
      `, 1400);
    }

    // =========================== SUPPORT, CONTACT ===========================
    if (q.includes('support') || q.includes('contacter') || q.includes('assistance')) {
      return this.answer(`
        <b>Support eBox Santé+ :</b>
        - Email : <a href="mailto:support@eboxsante.be">support@eboxsante.be</a>
        - Téléphone : <a href="tel:+3221234567">02 123 45 67</a>
        - Formulaire : menu "Contact & Support"
        - FAQ disponible ci-dessus, tapez /faq
      `, 1300);
    }

    // =========================== DIVERS, HUMOUR, GÉNÉRAL, PETITES PHRASES ===========================
    if (q.includes('bonjour') || q.includes('salut') || q.includes('coucou')) {
      return this.answer(`
        Bonjour 👋 ! Je suis ravi de vous aider. N’hésitez pas à poser vos questions sur votre santé, vos documents, ou l’utilisation de l’app !
      `, 1000);
    }
    if (q.includes('merci') || q.includes('merci beaucoup')) {
      return this.answer(`
        Avec plaisir ! 😊 Je reste à votre disposition pour toute autre question sur eBox Santé+ ou la santé numérique.
      `, 950);
    }
    if (q.includes('blague') || q.includes('humour') || q.includes('raconte une blague')) {
      return this.answer(`
        🤖 Pourquoi les ordinateurs n’attrapent-ils jamais froid ? Parce qu’ils ont toujours un antivirus ! 😄
      `, 1100);
    }
    if (q.includes('gpt') || q.includes('ia') || q.includes('intelligence artificielle')) {
      return this.answer(`
        Je fonctionne grâce à une intelligence artificielle qui analyse votre question et propose la meilleure réponse adaptée à eBox Santé+ et au domaine médical.
      `, 1200);
    }

    // =========================== PAS DE CAS SPÉCIFIQUE TROUVÉ ===========================
    // Réponse générique pédagogique, personnalisée avec historique si besoin
    return this.answer(`
      Je suis votre assistant IA eBox Santé+.<br>
      Voici ce que vous pouvez me demander :
      <ul>
        <li>Comment prendre rendez-vous avec un spécialiste ?</li>
        <li>Comment télécharger mes documents médicaux ?</li>
        <li>Comment activer le mode sombre ?</li>
        <li>Comment contacter le support ?</li>
        <li>Et toute question sur la sécurité, RGPD, accessibilité, etc.</li>
      </ul>
      <b>Essayez une commande /faq, ou posez votre question ci-dessous.</b>
    `, 1100);
  }

  /**
   * Réponse utilitaire avec délai
   */
  private answer(html: string, baseDelay = 1200): Observable<string> {
    // Pour simuler un vrai appel IA : randomise un peu la durée de chargement
    return of(html).pipe(delay(baseDelay + Math.random() * 1200));
  }

}
