import {Component, Input, NgZone, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

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
              private route: ActivatedRoute,
              private router: Router,
  ) {}

  async ngOnInit() {
    this.loading = false
    if(!this.route.snapshot.queryParams.month){
this.getDate(0,0)
      const newParams:any = {month: `${this.data.month}`,year:`${this.data.year}`}
      // const mergeParams = [...currentParams, ...newParams]
      const urlTree = this.router.createUrlTree([], {
        relativeTo: this.route,
        queryParams: {month: `${this.data.month}`,year:`${this.data.year}`},
        queryParamsHandling: "merge",
        preserveFragment: true });
      this.router.navigateByUrl(urlTree);
    }
    else {
     await this.getDate(await this.route.snapshot.queryParams.month,await this.route.snapshot.queryParams.year)
      this.data.month = +this.route.snapshot.queryParams.month
      this.data.year = +this.route.snapshot.queryParams.year
    }
    console.log(this.mass)
  }

  selectDay(event: any){
    console.log(event.target.textContent)
  }

  handleValueChange(event:any){
    this.mass = []

    this.loading = true

    this.loading = false
    this.ngOnInit()

  }


  async getDate(month: any, year: any){
    console.log(month)
    this.mass = []
    if (month === 0){
      console.log('this')
      this.current = new Date();
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
    }
    else{
      {
        this.data = 0
        console.log(year)
        this.current = await new Date(year,month-1,1);
        console.log(this.current)


        function getDaysInMonth(year: number, month: number) {
          console.log(month, year)
          return new Date(year, month-1, 0).getDate();
        }

        this.data = {
          month: this.current.getMonth(),
          year: this.current.getFullYear(),
          date: await getDaysInMonth(this.current.getFullYear(), this.current.getMonth()),
          firstDay: new Date(this.current.getFullYear(),
            this.current.getMonth(), 1).getDay(),
          allDate: this.current
        }
        console.log(this.current.toLocaleString())
        let backMonth = getDaysInMonth(this.current.getFullYear(), this.current.getMonth())
        console.log(await this.data)
        for (let b = 0; b < this.data.date; b++) {
          this.mass.push({thisMonth: b + 1})
          console.log('change')
        }
        for (let c = 0; c < this.data.firstDay - 1; c++) {

          this.mass.unshift({lastMonth: backMonth - c})
        }
      }}
  }
}
