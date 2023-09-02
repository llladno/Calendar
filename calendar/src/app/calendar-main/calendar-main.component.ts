import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-calendar-main',
  templateUrl: './calendar-main.component.html',
  styleUrls: ['./calendar-main.component.css']
})
export class CalendarMainComponent implements OnInit{
  current: any;
  date: any;
  data: any
  mass: any = []
  days: string[] = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
  ]
  ngOnInit() {
    this.current = new Date();
    function getDaysInMonth(year:number, month:number) {
      return new Date(year, month, 0).getDate();
    }

    this.data = {
      month: this.current.getMonth() + 1,
      year: this.current.getFullYear(),
      date: getDaysInMonth(this.current.getFullYear(), this.current.getMonth() + 1),
      firstDay: new Date(this.current.getFullYear(),
        this.current.getMonth(), 1).getDay()
    }
    let backMonth = getDaysInMonth(this.current.getFullYear(), this.current.getMonth())
    for(let b = 0; b < this.data.date; b++){
      this.mass.push({thisMonth: b + 1})
    }
    for (let c = 0; c < this.data.firstDay-1; c++){

      this.mass.unshift({lastMonth: backMonth-c})
    }
  }
  divArray(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i);
  }

  selectDay(event: any){
    console.log(event.target.textContent)
  }
}
