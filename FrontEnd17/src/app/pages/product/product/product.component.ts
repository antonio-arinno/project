import { Component, OnInit, inject, WritableSignal, signal } from '@angular/core';
import { Product } from '@core/model/product';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '@core/services/product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {

  productService = inject(ProductService);
  router = inject(Router);

  products: WritableSignal<Product[]> = signal([]);
  displayedColumns: string[] = ['name', 'description', 'countContributors', 'countProjects', 'time'];
  dataSource = this.products;

/*
  async ngOnInit(){
    const response = await this.productService.getAll();
    this.products.set(response);
  }
*/
  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (res: Product[]) => {
 //       this.products.set(res);
        let productsTmp = res.map(function (product){
          return Product.fromObject(product);
        });
        this.products.set(productsTmp);
      },
      error: (err: any) => console.log(err),
    });
  }  

  edit(id: number):void {
    this.router.navigate(['/pvt/product/detail', id]);
  }

  create(){
    this.router.navigate(['/pvt/product/detail']);  
  }

}
