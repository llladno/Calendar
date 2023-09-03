import {Component, OnInit, Output} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {PopUpComponent} from "../pop-up/pop-up.component";

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit{
  data: object
  id: any;
times: any = [];
minutes: any = []

  private routeSubscription: Subscription;
  private querySubscription: Subscription;

  constructor(private route: ActivatedRoute,
  private dialogRef:MatDialog){}


  ngOnInit() {
    this.data = {
      day: this.route.snapshot.queryParams.day,
      month: this.route.snapshot.queryParams.month,
      year: this.route.snapshot.queryParams.year,
    }
    console.log(this.data)
    this.times.length = 24
    this.minutes.length = 6
  }

  openDialog (event:any){
    let x = event.pageX+"px"
    console.log(event)
    const dialogConfig = new MatDialogConfig;
    dialogConfig.position = {
      'top': '30px',
      left: '40px'
    };

    this.dialogRef.open(PopUpComponent,
      {
      data: 'data',
      height: '350px',
      width: '250px',
      position: {left:x, top: event.y+'px'}
    });
  }

}
