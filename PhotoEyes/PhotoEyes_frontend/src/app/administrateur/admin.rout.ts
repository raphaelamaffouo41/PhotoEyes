import { Routes } from '@angular/router';

export const ADMINISTRATION_ROUTES: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./Layout/admin-layout/admin-layout.component')
        .then(c => c.AdminLayoutComponent),

    children: [

      {
        path: '',
        redirectTo: 'validation',
        pathMatch: 'full'
      },

      {
        path: 'matching',
        loadComponent: () =>
          import('./pages/matching/matching.component')
            .then(c => c.MatchingComponent)
      },

      {
        path: 'validation',
        loadComponent: () =>
          import('./pages/validation/validation.component')
            .then(c => c.ValidationComponent)
      },

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component')
            .then(c => c.DashboardComponent)
      },


    ]

  }

];