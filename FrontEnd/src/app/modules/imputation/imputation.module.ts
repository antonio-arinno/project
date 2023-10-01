import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImputationComponent } from './imputation/imputation.component';
import { ImputationDetailComponent } from './imputation-detail/imputation-detail.component';
import { ImputationRoutingModule } from './imputation-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    ImputationComponent,
    ImputationDetailComponent
  ],
  imports: [
    CommonModule,
    ImputationRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule
  ]
})
export class ImputationModule { }
