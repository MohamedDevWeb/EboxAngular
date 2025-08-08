# eBox Santé+



eBox Santé+ est une application web moderne et responsive conçue pour simplifier la gestion des documents de santé et des démarches administratives médicales des citoyens belges. Ce projet vise à offrir une expérience utilisateur fluide, sécurisée et accessible à tous, tout en répondant aux exigences professionnelles du secteur e-santé.



---



## Fonctionnalités principales



- **Espace personnel sécurisé** pour le stockage et la consultation de documents médicaux (PDF, images…)

- **Prise de rendez-vous médical** en ligne

- **Système de notifications** pour les rappels, résultats et informations importantes

- **Chatbot intégré** pour l’aide et l’orientation des utilisateurs

- **Support multilingue (FR/NL/EN)** avec sélecteur de langue dynamique

- **Authentification citoyenne** (simulateur itsme)

- **Progressive Web App (PWA)** : utilisable hors-ligne sur desktop et mobile

- **Design professionnel et accessible** (respect des couleurs médicales et institutionnelles, responsive, accessible au clavier)



---



## Stack technique



- **Framework** : Angular 17+ (standalone, SSR)

- **UI** : Angular Material, SCSS, Tailwind (pour certains utilitaires)

- **Internationalisation** : ngx-translate, fichiers i18n

- **Stockage local** : IndexedDB

- **PDF Viewer** : ngx-extended-pdf-viewer

- **Notifications** : WebPush, Firebase

- **CI/CD** : GitHub Actions, déploiement sur Firebase Hosting



---



## Installation & Lancement



```bash

git clone https://github.com/MohamedDevWeb/ebox-sante-plus.git

cd ebox-sante-plus

npm install

ng serve



Pour la version de production (SSR/PWA) :



ng build --configuration=production



⸻



Démo en ligne



https://ebox-sante-plus.web.app/



⸻



Captures d’écran



À compléter : insérer ici quelques screenshots des pages clés pour valoriser le projet.



⸻



Philosophie & Objectif



Ce projet a été mené avec un haut niveau d’exigence :

• Respect des meilleures pratiques de sécurité, accessibilité et design UX

• Architecture modulaire et évolutive

• Documentation claire et code commenté pour faciliter la maintenance

• Réactivité mobile et desktop, support multi-navigateurs



⸻



Auteur & Contact



Développé par Mohamed Ali, passionné de développement web et d’innovation numérique dans la santé.

Pour toute question, opportunité ou échange professionnel :

• https://github.com/MohamedDevWeb

• Email : dalimnasri0@gmail.com



⸻



Remarque



Ce projet est une vitrine de compétences avancées en développement web Angular, pensé pour une vraie utilisation professionnelle et pour répondre aux attentes des utilisateurs et des équipes e-santé.



⸻



Merci pour votre intérêt et bonne découverte !
