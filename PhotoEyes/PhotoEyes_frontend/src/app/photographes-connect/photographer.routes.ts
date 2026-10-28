import { Routes } from '@angular/router';
import { photographerGuard } from './guards/photographer.guard';

export const PHOTOGRAPHER_ROUTES: Routes = [

{
    path:'',
    canActivate: [photographerGuard],
    loadComponent:()=>
        import('./layout/layout.component')
        .then(c=>c.LayoutComponent),

    children:[

        {
            path:'',
            redirectTo:'dashboard',
            pathMatch:'full'
        },

        {
            path:'dashboard',
            loadComponent:()=>
                import('./pages/dashboard/dashboard.component')
                .then(c=>c.DashboardComponent)
        },

        {
            path:'profile',
            loadComponent:()=>
                import('./pages/profile/profile.component')
                .then(c=>c.ProfileComponent)
        },

        {
            path:'mission',
            loadComponent:()=>
                import('./pages/mission/mission.component')
                .then(c=>c.MissionsComponent)
        },

        {
            path:'availability',
            loadComponent:()=>
                import('./pages/disponibiliter/disponibiliter.component')
                .then(c=>c.DisponibiliterComponent)
        },

        {
            path:'messages',
            loadComponent:()=>
                import('./pages/messages/messages.component')
                .then(c=>c.MessagesComponent)
        },

        {
            path:'finances',
            loadComponent:()=>
                import('./pages/finances/finances.component')
                .then(c=>c.FinancesComponent)
        }

    ]
}

];
