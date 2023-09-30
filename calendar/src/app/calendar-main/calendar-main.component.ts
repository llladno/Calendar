import {Component, Input, NgZone, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-calendar-main',
  templateUrl: './calendar-main.component.html',
  styleUrls: ['./calendar-main.component.css']
})
export class CalendarMainComponent implements OnInit{
  @Input() parentValueChange:any;
  current: any;
  date: any;
  loading:boolean = true;
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

  constructor(private zone: NgZone,
              private route: ActivatedRoute,) {}

  ngOnInit() {
    this.data = 0
    this.current = new Date();
    function getDaysInMonth(year:number, month:number) {
      return new Date(year, month, 0).getDate();
    }

    console.log(this.route.queryParams)
    console.log(this.route.snapshot.queryParams)


    console.log(this.parentValueChange)
    this.loading = false

    this.data = {
      month: this.current.getMonth() + 1,
      year: this.current.getFullYear(),
      date: getDaysInMonth(this.current.getFullYear(), this.current.getMonth() + 1),
      firstDay: new Date(this.current.getFullYear(),
        this.current.getMonth(), 1).getDay(),
      allDate: this.current
    }
    let backMonth = getDaysInMonth(this.current.getFullYear(), this.current.getMonth())
    for(let b = 0; b < this.data.date; b++){
      this.mass.push({thisMonth: b + 1})
    }
    for (let c = 0; c < this.data.firstDay-1; c++){

      this.mass.unshift({lastMonth: backMonth-c})
    }
    console.log(this.data)
  }

  selectDay(event: any){
    console.log(event.target.textContent)
  }

  handleValueChange(event:any){
    this.ngOnInit()
    this.loading = true

    console.log(event)
    console.log('parentValue')
    console.log(this.parentValueChange)
    this.loading = false
    this.data = event
  }

  getLoading(){
    return true
  }
}
