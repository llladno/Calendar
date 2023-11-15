import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-table-head',
  templateUrl: './table-head.component.html',
  styleUrls: ['./table-head.component.css']
})
export class TableHeadComponent implements OnInit{

  @Input() data: any
  @Output() parentValueChange = new EventEmitter<any>();


  loading: boolean = false;
  date: any;
  today: Date;

  constructor(private route:ActivatedRoute) {
  }

  ngOnInit() {
    this.today = new Date()
    console.log(this.data)
  }
  nextMonth(){
    this.loading = true
    this.data.month = this.route.snapshot.queryParams.month
    this.parentValueChange.emit(this.data)
      setTimeout(()=>{
        window.location.reload()
      },20)
  }
}
