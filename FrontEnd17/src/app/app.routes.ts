import { Routes } from '@angular/router';
import { authenticationGuard } from '@core/guards/authentication.guard';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/layouts/public/public.routing').then(m => m.PUBLIC_ROUTES)
    },
    {
        path: 'pvt',
        canActivate: [authenticationGuard],
        loadChildren: () => import('./pages/layouts/private/private.routing').then(m => m.PRIVATE_ROUTES)
    }
 /*   
    ,    
    {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.routing').then(m => m.AUTH_ROUTES)
    }
    */
];
