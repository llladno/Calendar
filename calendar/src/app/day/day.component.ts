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
  time:any = [];

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
    let times = event.target.classList

    console.log(times)
    for (let b = 0; b < 3; b++){
      if(times[b].includes("time")){
        let temp:any = times[b].replace(/[^0-9]/g, '')
        this.time.push(temp)
      }
      else if(!times[b].includes('minutes')){
        this.time.push(times[b])
      }
      console.log(this.time)
    }
    console.log(this.time)
    let dataDialog = {
      time: this.time[1],
      minutes: this.time[0],
    }
    let x = event.pageX+"px"
    console.log(event.target)
    const dialogConfig = new MatDialogConfig;
    dialogConfig.position = {
      'top': '30px',
      left: '40px'
    };

    this.dialogRef.open(PopUpComponent,
      {
      data: dataDialog,
      height: '350px',
      width: '250px',
      position: {left:x, top: event.y+'px'}
    });
  }

}
