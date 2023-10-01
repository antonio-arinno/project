import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, 
        FormControl, 
        FormGroup,
        Validators } from '@angular/forms';
 import { Project } from '@model/project';       
 import { ProjectService } from '@service/project.service';
import { Product } from '@model/product';
import { Observable, map, mergeMap, startWith } from 'rxjs';
import { ProductService } from '@service/product.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';


@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  form!: FormGroup;
  project!: Project;
  error!: string;
  message!: string;
  message2!: string;

  productControl = new FormControl();
  filteredProducts!: Observable<Product[]>;

  constructor(private projectService: ProjectService, 
              private productService: ProductService,
              private fb: FormBuilder, 
              private activateRoute: ActivatedRoute, 
              private router: Router) {           
    this.buildForm();
    this.project = new Project();
  }    

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
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
      name: [''],
      description: ['']
    });  
  }  

  update(event: Event): void {
    event.preventDefault();
    if(this.form.valid){
      this.project.name = this.form.get('name')?.value;
      this.project.description = this.form.get('description')?.value;
      this.projectService.update(this.project).subscribe({
        next: (res: any) => {
          this.router.navigateByUrl('/pvt/project/project');
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
      console.log(this.project);
      this.projectService.create(this.project).subscribe({
        next: (res: any) => {
          this.router.navigateByUrl('/pvt/project/project');
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
          this.router.navigateByUrl('/pvt/project/project');
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
