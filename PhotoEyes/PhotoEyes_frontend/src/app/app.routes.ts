import { Routes } from '@angular/router';

export const routes: Routes = [
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
