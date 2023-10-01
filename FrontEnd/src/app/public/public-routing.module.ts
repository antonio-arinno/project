import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { PblHomeComponent } from 'app/modules/pbl-home/pbl-home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: PublicComponent, children: [
    { path: 'auth',
      loadChildren: () => import('../modules/auth/auth.module').then(m => m.AuthModule)
    },
    {
      path: 'home', component: PblHomeComponent
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
