import { Component } from '@angular/core';
import * as moment from 'moment'



import { Imputation } from '@model/imputation';
import { Router } from '@angular/router';  
import { ImputationService } from '@service/imputation.service';


@Component({
  selector: 'app-imputation',
  templateUrl: './imputation.component.html',
  styleUrls: ['./imputation.component.scss']
})
export class ImputationComponent {
 
  week: any = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo"
  ];

  monthSelect!: any[];
  dateSelect: any;
  dateValue: any;

  imputations: Imputation[] = [];

  constructor(private imputationService: ImputationService, private router: Router) {

  }

  ngOnInit(): void {
    this.imputationService.getAll().subscribe({
      next: (res: Imputation[]) => {
        this.imputations = res;
        this.getDaysFromDate(1, 2024);
      },
      error: (err: any) => console.log(err),
    });    
  }

  getDaysFromDate(month: number, year: number) {
    const startDate = moment.utc(`${year}/${month}/01`)
    const endDate = startDate.clone().endOf('month')
    this.dateSelect = startDate;
    const diffDays = endDate.diff(startDate, 'days', true)
    const numberDays = Math.round(diffDays);
    const arrayDays = Object.keys([...Array(numberDays)]).map((a: any) => {
      a = parseInt(a) + 1;
      const dayObject = moment(`${year}-${month}-${a}`);
      var total = 0;
      let id = null;
      var color = null;
      this.imputations.forEach(function (imputation) {
        const dayObject2 = moment(imputation.date);
        if ( dayObject.diff(dayObject2) == 0 ) {
          total = imputation.total;
          id = imputation.id;
          if(total == 8){
//            color = '#0f0';
//            color = '#388e3c';
            color = '#4caf50';
          }
        }
      });
      return {
        name: dayObject.format("dddd"),
        value: a,
        indexWeek: dayObject.isoWeekday(),
        total: total,
        color: color,
        id: id
      };
    });
    this.monthSelect = arrayDays;
  }

  changeMonth(flag: number) {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, "month");
      this.getDaysFromDate(prevDate.format("MM"), prevDate.format("YYYY"));
    } else {
      const nextDate = this.dateSelect.clone().add(1, "month");
      this.getDaysFromDate(nextDate.format("MM"), nextDate.format("YYYY"));
    }
  }

  clickDay(day: { value: any; id:any}) {
/*
    const monthYear = this.dateSelect.format('YYYY-MM')
    const parse = `${monthYear}-${day.value.toString().padStart(2, '0')}`;
    const objectDate = moment(parse);
    this.dateValue = objectDate;
*/    

    if(day.id != null){
      this.router.navigate(['/pvt/imputation/imputation-detail', day.id])
    }else{
      const monthYear = this.dateSelect.format('YYYY-MM')
      const parse = `${monthYear}-${day.value.toString().padStart(2, '0')}`;
      this.router.navigate(['/pvt/imputation/imputation-detail', parse]);
    }
    
  }
}