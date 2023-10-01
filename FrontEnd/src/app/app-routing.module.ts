import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { authenticationGuard } from './guard/authentication.guard';
import { NotFoundComponent } from './modules/not-found/not-found.component';


const routes: Routes = [

  { path: '', redirectTo: 'pbl/home', pathMatch: 'full' },
  { path: '', component: AppComponent, children:
  [
    { path: 'pbl',
      loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
    },
    { path: 'pvt',
      canActivate: [authenticationGuard],
      loadChildren: () => import('./private/private.module').then(m => m.PrivateModule)
    },
    { path: '**', component: NotFoundComponent }
  ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
