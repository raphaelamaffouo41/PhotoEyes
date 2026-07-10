import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'photographes',
    loadChildren: () =>
      import('./photographes/photographe.route').then(m => m.PHOTOGRAPHES_ROUTES)
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./authentification/auth.routes').then((m) => m.AUTH_ROUTES)
  },

  {
    path: '',
    loadChildren: () =>
      import('./accueil/accueil.routes').then((m) => m.ACCUEIL_ROUTES)
  }
];
