import { Routes } from '@angular/router';
import { PhotographerDetailComponent } from './pages/detail/photographer-detail/photographer-detail.component';

export const PHOTOGRAPHES_ROUTES: Routes = [

  {
    path: ':id',
    loadComponent: () =>
      import('./pages/detail/photographer-detail/photographer-detail.component')
        .then(m => m.PhotographerDetailComponent)
  }
];
