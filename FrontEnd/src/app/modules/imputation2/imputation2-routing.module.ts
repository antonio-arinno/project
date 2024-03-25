import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { Imputation2Component } from './imputation2/imputation2.component';
import { Imputation2DetailComponent } from './imputation2-detail/imputation2-detail.component';



const routes: Routes =[
  { path: 'imputation2', component: Imputation2Component },
  { path: 'imputation2-detail/:id', component: Imputation2DetailComponent },
  { path: 'imputation2-detail', component: Imputation2DetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class Imputation2RoutingModule { }
