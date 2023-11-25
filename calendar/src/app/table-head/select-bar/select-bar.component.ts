import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-select-bar',
  templateUrl: './select-bar.component.html',
  styleUrls: ['./select-bar.component.css']
})
export class SelectBarComponent implements OnInit {
 @Input() data:any;
 @Input() nextMonth: any;

  constructor(private route:ActivatedRoute) {
  }

  ngOnInit() {
    console.log(this.data)
  }

}
