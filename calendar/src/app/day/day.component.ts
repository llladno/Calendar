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

  openDialog (){
    console.log('ok')
    const dialogConfig = new MatDialogConfig;
    dialogConfig.position = {
      'top': '0',
      left: '0'
    };

    this.dialogRef.open(PopUpComponent, dialogConfig);
  }

}
