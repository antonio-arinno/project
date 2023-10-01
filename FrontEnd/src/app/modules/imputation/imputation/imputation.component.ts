import { Component, OnInit } from '@angular/core';
import { Imputation } from '@model/imputation';
import { Router } from '@angular/router';  
import { ImputationService } from '@service/imputation.service';

@Component({
  selector: 'app-imputation',
  templateUrl: './imputation.component.html',
  styleUrls: ['./imputation.component.scss']
})
export class ImputationComponent implements OnInit {

  imputations: Imputation[] = [];
  displayedColumns: string[] = ['id', 'date', 'time', 'edit'];
  dataSource = this.imputations;  

  constructor(private imputationService: ImputationService, private router: Router) {}

  ngOnInit(): void {
    this.imputationService.getAll().subscribe({
      next: (res: Imputation[]) => {
        this.imputations = res;
      },
      error: (err: any) => console.log(err),
    });
  }    

  edit(id: number):void {
    this.router.navigate(['/pvt/imputation/imputation-detail', id]);
  }

  create(){
    this.router.navigate(['/pvt/imputation/imputation-detail']);  
  }    

}
