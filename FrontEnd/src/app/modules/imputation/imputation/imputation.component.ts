import { Component, OnInit } from '@angular/core';
import * as moment from 'moment'



import { Imputation } from '@model/imputation';
import { Router } from '@angular/router';  
import { ImputationService } from '@service/imputation.service';

@Component({
  selector: 'app-imputation',
  templateUrl: './imputation.component.html',
  styleUrls: ['./imputation.component.scss']
})
export class ImputationComponent implements OnInit {

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


  constructor() {

  }

  ngOnInit(): void {
    this.getDaysFromDate(11, 2020)
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
      return {
        name: dayObject.format("dddd"),
        value: a,
        indexWeek: dayObject.isoWeekday()
      };
    });

    this.monthSelect = arrayDays;

    console.log(this.monthSelect);
    const prueba = this.monthSelect.map((x:any) => {
      return {
        name : x.name
      }
    })

    console.log(prueba);

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

  clickDay(day: { value: any; }) {
    const monthYear = this.dateSelect.format('YYYY-MM')
    const parse = `${monthYear}-${day.value}`
    const objectDate = moment(parse)
    this.dateValue = objectDate;


  }

}
