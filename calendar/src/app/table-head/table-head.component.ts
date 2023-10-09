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

  current: any;
  date: any;
  mass: any = []

  constructor(private route:ActivatedRoute) {
  }

  ngOnInit() {
    console.log(this.data)
  }
  nextMonth(){
    console.log(this.route.snapshot.queryParams)
    this.data.month = this.route.snapshot.queryParams.month
    this.parentValueChange.emit(this.data)
  }
}
