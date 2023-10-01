import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ImputationComponent } from './imputation/imputation.component';
import { ImputationDetailComponent } from './imputation-detail/imputation-detail.component';

const routes: Routes =[
  { path: 'imputation', component: ImputationComponent },
  { path: 'imputation-detail/:id', component: ImputationDetailComponent },
  { path: 'imputation-detail', component: ImputationDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImputationRoutingModule { }
