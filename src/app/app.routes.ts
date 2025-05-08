import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'  
    },
    {
        path: 'home',
        loadComponent: () => import('./components/views/pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./components/views/pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
    }
];
