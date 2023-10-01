import { Injectable } from '@angular/core';
import { Product } from '@model/product';
import { URL_BACKEND } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
/*
  getProducts(): Observable<any>{
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      map ( (response:any) => {
        (response.content as Product[]).map(product => {
            product.description = product.description.toUpperCase();
            return product;
        });
        return response;
      })
    );
  }
  
*/


  getAll() {
    return this.http.get<Product[]>(URL_BACKEND + '/product/');
  }

  get(id: number){
    return this.http.get<Product>(URL_BACKEND + `/product/${id}`);
  }

  update(product: Product){
    return this.http.put(URL_BACKEND + `/product/${product.id}`, product);
  }

  create(product: Product){
    return this.http.post(URL_BACKEND + `/product/`, product);
  }

  delete(id: number){
    return this.http.delete(URL_BACKEND + `/product/${id}`);
  }

  getSelection(term: string){
    return this.http.get<Product[]>(URL_BACKEND + `/product/select/${term}`);
  }



}
