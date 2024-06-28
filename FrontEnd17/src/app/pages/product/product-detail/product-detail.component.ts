import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '@core/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '@core/model/product';


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {

  productService = inject(ProductService);
  router = inject(Router);
  activateRoute = inject(ActivatedRoute);
  fb = inject(FormBuilder);

  form!: FormGroup;
  product!: Product;
  error!: string;
  message!: string;
  message2!: string;
/*
  ngOnInit(){
    this.activateRoute.params.subscribe(async params => {
      this.buildForm();
      let id = params['id']
      if(id){
        const res = await this.productService.get(id);
        this.form.get('id')?.setValue(res.id);
        this.form.get('name')?.setValue(res.name);
        this.form.get('description')?.setValue(res.description);     
        console.log(res);
      }
    })
  }
*/

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.buildForm();
      let id = params['id']
      if(id){
        this.productService.get(id).subscribe({
          next:(res: Product)=> {
            this.form.get('id')?.setValue(res.id);
            this.form.get('name')?.setValue(res.name);
            this.form.get('description')?.setValue(res.description);         
          },
          error: (err: any) => console.log(err)
        });
      }
    })  
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
      this.product = this.form.value;
      this.productService.update(this.product).subscribe({
        next: (res: any) => {
          this.router.navigateByUrl('/pvt/product');
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
      this.product = this.form.value;
      this.productService.create(this.product).subscribe({
        next: (res: any) => {
          this.router.navigateByUrl('/pvt/product');
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
      this.product = this.form.value;
      this.productService.delete(this.product.id).subscribe({
        next: (res: any) => {
          this.router.navigateByUrl('/pvt/product');
        },
        error: (err: any) => {
          this.error = err.error.error;
          this.message = err.error.message;
          this.message2 = err.message;
        },
      });
    }
  }

}
