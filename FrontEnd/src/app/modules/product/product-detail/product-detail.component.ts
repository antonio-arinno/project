import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, 
        FormGroup,
        Validators } from '@angular/forms';
import { Product } from '@model/product';
import { ProductService } from '@service/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  form!: FormGroup;
  product: Product;
  error!: string;
  message!: string;
  message2!: string;

  constructor(private productService: ProductService, private fb: FormBuilder, private activateRoute: ActivatedRoute, private router: Router) {
    this.buildForm();
    this.product = new Product();
  }  

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
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
/*
  submit(event: Event): void {
    event.preventDefault();
    if(this.form.valid){
      this.product = this.form.value;
      this.productService.update(this.product).subscribe({
        next: (res: any) => {
          console.log('product detail');
        },
        error: (err: any) => {
          this.form.invalid;
          console.log('Error: ');
          console.log(err);
        },
      });
    }
  }    
*/
  update(event: Event): void {
    event.preventDefault();
    if(this.form.valid){
      this.product = this.form.value;
      console.log(this.product);
      this.productService.update(this.product).subscribe({
        next: (res: any) => {
          this.router.navigateByUrl('/pvt/product/product');
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
          this.router.navigateByUrl('/pvt/product/product');
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
          this.router.navigateByUrl('/pvt/product/product');
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
