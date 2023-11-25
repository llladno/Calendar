import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {delay, Observable} from "rxjs";


@Component({
  selector: 'app-table-head',
  templateUrl: './table-head.component.html',
  styleUrls: ['./table-head.component.css']
})

export class TableHeadComponent implements OnInit{
  @Input() data: any
  @Output() parentValueChange = new EventEmitter<any>();


  loading: boolean = false;
  today: Date;
  isDay: boolean = false;
  dayInMonth: any

  constructor(private route:ActivatedRoute,
  private router: Router) {
  }

  ngOnInit() {
    this.today = new Date()
    if (this.data.day) this.isDay = true
    else if(!this.data.day) this.isDay = false


    console.log(this.data)
  }
  nextMonth(){

    console.log(this.data)
    this.loading = true
    this.data.month = this.route.snapshot.queryParams.month
    if (this.data.day) this.isDay = true
    else if(!this.data.day) this.isDay = false
    this.parentValueChange.emit(this.data)
    this.route.queryParams.subscribe((x:any)=>{
      window.location.reload()
    })
      setTimeout(()=>{
        window.location.reload()
      },20)
    console.log(this.dayInMonth)
  }

  nextDay(direction:string){
    let newData:any = {}
    function getDaysInMonth(year:number, month:number) {
      return new Date(year, month, 0).getDate();
    }
    this.dayInMonth = getDaysInMonth(+this.data.year,+this.data.month)
    if (direction === 'next'){
      newData = {
        day: +this.data.day > +this.dayInMonth-1 ? 1: +this.data.day+1,
        month: +this.data.month > 11 ? 1 : +this.data.month,
        year:+this.data.month > 11 ? +this.data.year+1 :this.data.year
      }
      console.log(newData)
      if (newData.day - +this.data.day < 0) {
        console.log('changed')
        newData.month = +this.data.month+1 > 12 ? 1 : +this.data.month+1
      }
    }



  else {
        newData = {
          day: +this.data.day > +this.dayInMonth-1 ? 1: +this.data.day-1,
          month: +this.data.month < 1 ? 1 : +this.data.month,
          year:+this.data.month < 0 ? +this.data.year-1 :this.data.year
        }
      console.log(newData)
        if (newData.day  < 1) {
          console.log('changed')
          newData.day = getDaysInMonth(this.data.year, this.data.month-1)
          newData.month = +this.data.month-1 < 0 ? 1 : +this.data.month-1
        }
      console.log(newData)
    }
      // const urlTree = this.router.createUrlTree([], {
      //   relativeTo: this.route,
      //   queryParams: {'day': newData.day,'month': newData.month, 'year': newData.year},
      //   queryParamsHandling: "merge",
      //   preserveFragment: true });
      // this.router.navigateByUrl(urlTree)
      //   .then(()=>window.location.reload());

}
  changeDay(){
    this.loading = true
    this.route.queryParams.pipe(delay(10)).subscribe(()=> window.location.reload())

  }
}
