import { Routes } from '@angular/router';

export const RESERVATION_ROUTES: Routes = [
  {
    path: ':photographerId',
    loadComponent: () =>
      import('./pages/reservation-request/reservation-request.component').then(m => m.ReservationRequestComponent)
  }
];