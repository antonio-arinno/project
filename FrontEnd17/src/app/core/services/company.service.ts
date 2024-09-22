import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Company } from '@core/model/company';
import { URL_BACKEND } from '@shared/config';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private http = inject(HttpClient);

  create(company: Company){
    return this.http.post(URL_BACKEND + `/company/`, company);
  }

}  