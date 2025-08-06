import { Routes } from '@angular/router';

import { LoginFluxComponent } from './pages/login-flux.component';
import { LoginAuthComponent } from './pages/login-auth.component';
import { LoginRedirectComponent } from './pages/login-redirect.component';
import { LoginItsmeComponent } from './pages/login-itsme.component';
import { LoginEidComponent } from './pages/login-eid.component';
import { LoginEmailComponent } from './pages/login-email.component';
import { LoginMobileComponent } from './pages/login-mobile.component';
import { LoginEuComponent } from './pages/login-eu.component';

import { LayoutShellComponent } from './layout/layout-shell.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { MesDocumentsComponent } from './pages/mes-documents.component';
import { ChatbotComponent } from './features/chatbot/chatbot.component';
import { ProfilComponent } from './pages/profil.component';
import { AccueilComponent } from './pages/accueil.component';
import { AnalysesExamensComponent } from './pages/analyses-examens.component';
import { PrendreRdvComponent } from './pages/prendre-rdv.component';

import { AuthGuard } from './auth.guard';

export const appRoutes: Routes = [
  { path: 'login-flux', component: LoginFluxComponent },
  { path: 'login-redirect', component: LoginRedirectComponent },
  { path: 'login-auth', component: LoginAuthComponent },
  { path: 'login-itsme', component: LoginItsmeComponent },
  { path: 'login-eid', component: LoginEidComponent },
  { path: 'login-email', component: LoginEmailComponent },
  { path: 'login-mobile', component: LoginMobileComponent },
  { path: 'login-eu', component: LoginEuComponent },

  {
    path: '',
    component: LayoutShellComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'accueil', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'accueil', component: AccueilComponent },
      { path: 'mes-documents', component: MesDocumentsComponent },
      { path: 'analyses-examens', component: AnalysesExamensComponent },
      { path: 'prendre-rdv', component: PrendreRdvComponent },
      { path: 'chatbot', component: ChatbotComponent },
      { path: 'profil', component: ProfilComponent },

      // Lazy loaded pages
      {
        path: 'guide',
        loadComponent: () =>
          import('./pages/guide.component').then(m => m.GuideComponent)
      },
      {
        path: 'contact-support',
        loadComponent: () =>
          import('./pages/contact-support.component').then(m => m.ContactSupportComponent)
      },
      {
        path: 'notifications',
        loadComponent: () =>
          import('./pages/notifications.component').then(m => m.NotificationsComponent)
      },
      {
        path: 'documents-partages',
        loadComponent: () =>
          import('./pages/documents-partages.component').then(m => m.DocumentsPartagesComponent)
      },
      {
        path: 'parametres',
        loadComponent: () =>
          import('./pages/parametres.component').then(m => m.ParametresComponent)
      },
      {
        path: 'historique',
        loadComponent: () =>
          import('./pages/historique-medical.component').then(m => m.HistoriqueMedicalComponent)
      }
    ]
  },

  // Wildcard : toute URL inconnue => login
  { path: '**', redirectTo: 'login' }
];
