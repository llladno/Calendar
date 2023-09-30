import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-table-head',
  templateUrl: './table-head.component.html',
  styleUrls: ['./table-head.component.css']
})
export class TableHeadComponent implements OnInit{

  @Input() data: any
  @Output() parentValueChange = new EventEmitter<any>();

  current: any;
  date: any;
  mass: any = []

  ngOnInit() {
    console.log(this.data)

  }
  nextMonth(){
    console.log(this.data.allDate.getMonth())
    console.log(this.current)
    this.current = new Date(this.data.allDate)
    this.current.setMonth(this.data.allDate.getMonth() + 1)
    console.log(this.current)
    function getDaysInMonth(year:number, month:number) {
      return new Date(year, month, 0).getDate();
    }

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
    this.parentValueChange.emit(this.data)
  }
}
