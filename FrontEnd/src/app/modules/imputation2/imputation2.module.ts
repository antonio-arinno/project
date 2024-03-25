import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Imputation2Component } from './imputation2/imputation2.component';
import { Imputation2RoutingModule } from './imputation2-routing.module';
import { Imputation2DetailComponent } from './imputation2-detail/imputation2-detail.component';



@NgModule({
  declarations: [
    Imputation2Component,
    Imputation2DetailComponent
  ],
  imports: [
    CommonModule,
    Imputation2RoutingModule
  ]
})
export class Imputation2Module { }
