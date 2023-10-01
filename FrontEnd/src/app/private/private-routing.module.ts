import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateComponent } from './private.component';
import { DashboardComponent } from 'app/modules/dashboard/dashboard/dashboard.component';

const routes: Routes =[
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '', component: PrivateComponent, children: [
    { path: 'imputation',
      loadChildren: () => import('@modules/imputation/imputation.module').then(m => m.ImputationModule)
    },    
    { path: 'product',
      loadChildren: () => import('@modules/product/product.module').then(m => m.ProductModule)
    },
    { path: 'project',
      loadChildren: () => import('@modules/project/project.module').then(m => m.ProjectModule)
    },    
    {
      path: 'dashboard', component: DashboardComponent
    }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }

