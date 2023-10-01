import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';    
import { Product } from '@model/product';
import { ProductService } from '@service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'edit'];
  dataSource = this.products;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (res: Product[]) => {
        this.products = res;
  //      for (var book of res) this.availableBooks.push(book);
  //      this.updateList();
      },
      error: (err: any) => console.log(err),
    });
  }  

  edit(id: number):void {
    this.router.navigate(['/pvt/product/product-detail', id]);
  }

  create(){
    this.router.navigate(['/pvt/product/product-detail']);  
  }

}



