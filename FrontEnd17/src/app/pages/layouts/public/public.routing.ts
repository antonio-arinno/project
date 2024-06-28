import { Routes } from '@angular/router';
import { PublicComponent } from './public.component';


export const PUBLIC_ROUTES: Routes = [
    { path: '', component: PublicComponent, children: [
        {
            path: 'auth',
            loadChildren: () => import('@pages/auth/auth.routing').then(m => m.AUTH_ROUTES)
        }
    ]}
];


/*
export const PRIVATE_ROUTES: Routes = [
    { path: '', component: PrivateComponent, children: [
    {
        path: 'product',
        loadChildren: () => import('@pages/product/product.routing').then(m => m.PRODUCT_ROUTES)
    }    

    ]}
    */