import { Injectable } from '@angular/core';
import { Imputation } from '@model/imputation';
import { URL_BACKEND } from '../config/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImputationService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Imputation[]>(URL_BACKEND + '/imputation/');
  }

  get(id: number){
    return this.http.get<Imputation>(URL_BACKEND + `/imputation/${id}`);
  }

  getByDate(date: string){
    return this.http.get<Imputation>(URL_BACKEND + `/imputation/date/${date}`);

  }

  update(imputation: Imputation){
    return this.http.put(URL_BACKEND + `/imputation/${imputation.id}`, imputation);
  }

  create(imputation: Imputation){
    return this.http.post(URL_BACKEND + `/imputation/`, imputation);
  }

  delete(id: number){
    return this.http.delete(URL_BACKEND + `/imputation/${id}`);
  }  
}