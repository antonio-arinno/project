import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Observable, map, mergeMap, startWith } from 'rxjs';

import { ProjectService } from '@core/services/project.service';
import { Project } from '@core/model/project';
import { Product } from '@core/model/product';
import { ProductService } from '@core/services/product.service';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatAutocompleteModule],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent {

  projectService = inject(ProjectService);
  productService = inject(ProductService);
  router = inject(Router);
  activateRoute = inject(ActivatedRoute);
  fb = inject(FormBuilder);

  form!: FormGroup;
  project!: Project;
  error!: string;
  message!: string;
  message2!: string;

  productControl = new FormControl();
  filteredProducts!: Observable<Product[]>;  

  ngOnInit(): void {
    console.log("oninit");
    this.activateRoute.params.subscribe(params => {
      this.buildForm();
      let id = params['id']
      if(id){
        this.projectService.get(id).subscribe({
          next:(res: Project)=> {
            this.form.get('id')?.setValue(res.id);
            this.form.get('name')?.setValue(res.name);
            this.form.get('description')?.setValue(res.description);
            this.productControl.setValue( res.product );
            this.project = res;
            this.productControl.getRawValue();       
          },
          error: (err: any) => console.log(err)
        });
      }else{
        this.project = new Project();
      }
    });

    this.filteredProducts = this.productControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.description),
        mergeMap(value => value ? this._filter(value) : this._getAll())
      );        
  }  


  private _getAll(): Observable<Product[]> {
    return this.productService.getAll();
  }  

  private _filter(value: string): Observable<Product[]> {
    const filterValue = value.toLowerCase();
    return this.productService.getSelection(filterValue);
  }  

  displayFn(product: Product): string {
    return product && product.name ? product.name : '';
  }

  selectProduct(event: MatAutocompleteSelectedEvent): void {
    this.project.product = event.option.value as Product;
  }  

  private buildForm(){
    this.form = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });  
  }  

  update(event: Event): void {
    event.preventDefault();
    if(this.form.valid){
      this.project.name = this.form.get('name')?.value;
      this.project.description = this.form.get('description')?.value;
      this.projectService.update(this.project).subscribe({
        next: (res: any) => {
          this.router.navigateByUrl('/pvt/project');
        },
        error: (err: any) => {
          this.error = err.error.error;
          this.message = err.error.message;
          this.message2 = err.message;
        },
      });
    }
  } 

  create(event: Event): void {
    event.preventDefault();
    if(this.form.valid){
      this.project.name = this.form.get('name')?.value;
      this.project.description = this.form.get('description')?.value;
      this.projectService.create(this.project).subscribe({
        next: (res: any) => {
          this.router.navigateByUrl('/pvt/project');
        },
        error: (err: any) => {
          this.error = err.error.error;
          this.message = err.error.message;
          this.message2 = err.message;
        },
      });
    }
  }  

  delete(event: Event): void {
    event.preventDefault();
    if(this.form.valid){
      this.project = this.form.value;
      this.projectService.delete(this.project.id).subscribe({
        next: (res: any) => {
          this.router.navigateByUrl('/pvt/project');
        },
        error: (err: any) => {
          console.log(err);
          this.error = err.error.error;
          this.message = err.error.message;
          this.message2 = err.message;
        },
      });
    }
  }     


}
