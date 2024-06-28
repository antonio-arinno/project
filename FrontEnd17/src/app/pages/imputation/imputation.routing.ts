import { Routes } from '@angular/router';
import { ImputationComponent } from './imputation/imputation.component';
import { ImputationDetailComponent } from './imputation-detail/imputation-detail.component';
import { ImputationDetail2Component } from './imputation-detail2/imputation-detail2.component';


export const IMPUTATION_ROUTES: Routes = [
    { path: '', component: ImputationComponent},
    { path: 'detail/:id', component: ImputationDetail2Component},
    { path: 'detail', component: ImputationDetail2Component }
];