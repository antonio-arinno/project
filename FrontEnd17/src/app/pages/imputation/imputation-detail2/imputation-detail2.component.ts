import { Component, inject, ChangeDetectorRef, WritableSignal, signal} from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, FormsModule, Validators, FormArray} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { Observable, map, mergeMap, startWith, BehaviorSubject} from 'rxjs';


import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatSelectChange } from '@angular/material/select';

import { ImputationService } from '@core/services/imputation.service';
import { Imputation } from '@core/model/imputation';
import { ImputationItem } from '@core/model/imputation-item';
import { Product } from '@core/model/product';
import { ProductService } from '@core/services/product.service';
import { Project } from '@core/model/project';
import { ProjectService } from '@core/services/project.service';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-imputation-detail2',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatCardModule, ReactiveFormsModule, MatInputModule, MatAutocompleteModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatSelectModule],
  templateUrl: './imputation-detail2.component.html',
  styleUrl: './imputation-detail2.component.scss'
})



export class ImputationDetail2Component {

  imputationService = inject(ImputationService);
  productService = inject(ProductService);
  fb = inject(FormBuilder);
  cd = inject(ChangeDetectorRef)
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  displayedColumns: string[] = ['project', 'time', 'delete'];
  
  imputationForm!: FormGroup;
  imputationItemForm!: FormGroup;
  imputation!: Imputation;
  imputationItem!: ImputationItem;
  product!: Product;
  project!: Project;

  products: WritableSignal<Product[]> = signal([]);

  dataSourceItems!: MatTableDataSource<any>;

  totalTime: number = 0;

  error!: string;
  message!: string;
  message2!: string;  


  ngOnInit(): void {
    this.getProducts();
    this.buildForm();
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      const cmpDate = /\d{4}-\d{2}-\d{2}/;
      if(!id.match(cmpDate)){
        this.imputationService.get(id).subscribe({
          next:(res: Imputation)=> {
            this.getImputationForm(res);
          },
          error: (err: any) => console.log(err)
        });
      }else{
        this.imputationForm.get('date')?.setValue(id);
        this.addItemForm();
      }
    });     
  }  

  getProducts(){
    this.productService.getAll().subscribe({
      next: (res: Product[]) => {
        this.products.set(res);
      },
      error: (err: any) => console.log(err),
    });    
  }

  getImputationForm(res: any){
    this.imputationForm.get('id')?.setValue(res.id);
    this.imputationForm.get('date')?.setValue(res.date);
    for(let item of res.items){
      this.addItem(item);
      this.totalTime = this.totalTime + item.time;
    }
  }


  get item() {
    return this.imputationForm.controls["imputationItemForm"] as FormArray;
  };

  formEmpty(): Boolean {
    if((this.imputationForm.controls["imputationItemForm"] as FormArray).length == 0){
      return true;
    }
    return false;
  }

  addItem(value: any): void {
    this.buildFormItem();
    this.imputationItemForm.get('id')?.setValue(value.id);
    this.imputationItemForm.get('projectId')?.setValue(value.project.id);
    this.imputationItemForm.get('time')?.setValue(value.time);
    this.item.push(this.imputationItemForm);
    this.dataSourceItems = new MatTableDataSource(this.item.controls);
  };

  addItemForm(): void {
    this.buildFormItem();
    this.item.push(this.imputationItemForm);
    this.dataSourceItems = new MatTableDataSource(this.item.controls);
    this.cd.detectChanges();
  };

  private buildForm(){
    this.imputationForm = this.fb.group({
      id: [''],
      date: ['', Validators.required],   
      imputationItemForm: this.fb.array([])
    })
  }

  private buildFormItem(){
    this.imputationItemForm = this.fb.group({
      id: [''],
      projectId: ['', Validators.required],
      time: ['', Validators.required]  
    });
  }

  create(event: Event): void {
    event.preventDefault();
    if(this.imputationForm.valid){
      this.imputation = new Imputation();
      this.imputation.date = this.imputationForm.get('date')?.value;
      for(let item of this.imputationForm.get('imputationItemForm')?.value){
        if(!this.updateItem(item)){
          this.loadItem(item);
        }
      }
      this.imputationService.create(this.imputation).subscribe({
        next: (res: any) => {
          this.router.navigateByUrl('/pvt/imputation');
        },
        error: (err: any) => {
          this.error = err.error.error;
          this.message = err.error.message;
          this.message2 = err.message;
        },
      });      
    }    
  }

  update(event: Event): void {
    event.preventDefault();
    if(this.imputationForm.valid){
      this.imputation = new Imputation();
      this.imputation.id = this.imputationForm.get('id')?.value;
      this.imputation.date = this.imputationForm.get('date')?.value;
      console.log(this.imputationForm.value);
      for(let item of this.imputationForm.get('imputationItemForm')?.value){
        console.log(item);
        if(!this.updateItem(item)){
          this.loadItem(item);
        }
      }
      console.log(this.imputation);
      this.imputationService.update(this.imputation).subscribe({
        next: (res: any) => {
          this.router.navigateByUrl('/pvt/imputation');
        },
        error: (err: any) => {
          this.error = err.error.error;
          this.message = err.error.message;
          this.message2 = err.message;
        },
      });      
    }    
  }

  loadItem(itemForm: any): void{
    this.imputationItem = new ImputationItem();
    this.imputationItem.id = itemForm.id;
    this.project = new Project();
    this.project.id = itemForm.projectId; //no es necesario para el create
    this.imputationItem.project = this.project;
    this.imputationItem.time = itemForm.time;
    this.imputation.items.push(this.imputationItem);    
  }

  updateItem(itemForm: any): Boolean{
    for(let item of this.imputation.items){
      if(item.project.id==itemForm.projectId){
        item.time = item.time + itemForm.time;  
        return true;
      }
    }
    return false;
  }

  delete(event: Event): void {
    event.preventDefault();
    if(this.imputationForm.valid){
      this.imputation = this.imputationForm.value;
      this.imputationService.delete(this.imputation.id).subscribe({
        next: (res: any) => {
          this.router.navigateByUrl('/pvt/imputation');
        },
        error: (err: any) => {
          this.error = err.error.error;
          this.message = err.error.message;
          this.message2 = err.message;
        },
      });
    }
  }     

  dataChange(){
    const date = `${this.imputationForm.get('date')?.value.getFullYear()}-${(this.imputationForm.get('date')?.value.getMonth()+1).toString().padStart(2, '0')}-${this.imputationForm.get('date')?.value.getDate().toString().padStart(2, '0')}`;
    this.imputationService.getByDate(date).subscribe({
      next:(res: Imputation)=> {
        this.totalTime = 0;
        this.buildForm();
        if(res==null){
          this.imputationForm.get('date')?.setValue(date);
          this.addItemForm();
        }else{
          this.getImputationForm(res);
        }
      },
      error: (err: any) => console.log(err)
    });    
  }

  deleteImputationItem(item: number): void {
    console.log(this.imputationForm.value);
    this.item.removeAt(item);
    this.dataSourceItems = new MatTableDataSource(this.item.controls);
    console.log(this.imputationForm.value);
    this.updateTime();
  }

  updateTime():void {
    this.totalTime = 0;
    for(let item of this.item.value){
      this.totalTime = this.totalTime + item.time;
    }
  }

}


