import { Routes } from '@angular/router';

export const PHOTOGRAPHER_ROUTES: Routes = [

{
    path:'',
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
            path:'portfolio',
            loadComponent:()=>
                import('./pages/portfolio/portfolio.component')
                .then(c=>c.PortfolioComponent)
        },

        {
            path:'availability',
            loadComponent:()=>
                import('./pages/disponibiliter/disponibiliter.component')
                .then(c=>c.DisponibiliterComponent)
        },

        {
            path:'reviews',
            loadComponent:()=>
                import('./pages/reviews/reviews.component')
                .then(c=>c.ReviewsComponent)
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