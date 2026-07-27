import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'reservation',
    loadChildren: () =>
        import('./reservation/reservation.routes').then(m => m.RESERVATION_ROUTES)
  },

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
