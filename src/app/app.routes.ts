import { Routes } from '@angular/router';
import { StampComponent } from './components/views/pages/stamp/stamp.component';
import { appCanActivate } from './guard/app.auth.guard';
import { NoAccessComponent } from './components/views/pages/no-access/no-access.component';
import { AppRoles } from './app.roles';
// import { HomeComponent } from './components/views/home/home.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'  
    },
    {
        path: 'home',
        loadComponent: () => import('./components/views/pages/home/home.component').then(m => m.HomeComponent),
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./components/views/pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
    },
    {
        path: 'stamp',
        component: StampComponent,
        canActivate: [appCanActivate],
        data: {
            roles: [AppRoles.Admin, AppRoles.User],
            pagetitle: 'Stamp'
        }
    },
    {
        path: 'user',
        loadComponent: () => import('./components/views/pages/user/user.component').then(m => m.UserComponent),
        canActivate: [appCanActivate],
        data: {
            roles: [AppRoles.Admin],
            pagetitle: 'User Management'
        }
    },
    {
        path: 'noaccess',
        component: NoAccessComponent
    },
];
