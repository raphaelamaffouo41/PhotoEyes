import { Routes } from '@angular/router';

export const RESERVATION_ROUTES: Routes = [
  {
    path: ':photographerId',
    loadComponent: () =>
      import('./pages/reservation/reservation.component').then(m => m.ReservationComponent)
  }
];