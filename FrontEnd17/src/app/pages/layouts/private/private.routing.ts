import { Routes } from '@angular/router';
import { PrivateComponent } from './private.component';

export const PRIVATE_ROUTES: Routes = [
    { path: '', component: PrivateComponent, children: [   
        {
        path: 'imputation',
        loadChildren: () => import('@pages/imputation/imputation.routing').then(m => m.IMPUTATION_ROUTES)
        },    
        {
        path: 'project',
        loadChildren: () => import('@pages/project/project.routing').then(m => m.PROJECT_ROUTES)
        },
        {
        path: 'product',
        loadChildren: () => import('@pages/product/product.routing').then(m => m.PRODUCT_ROUTES)
        }
    ]}
];