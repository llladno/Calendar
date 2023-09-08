import {Component, OnInit, Output, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {PopUpComponent} from "../pop-up/pop-up.component";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  data: object
  id: any;
  times: any = [];
  minutes: any = []
  time: any = [];


  constructor(private route: ActivatedRoute,
              private dialogRef: MatDialog,
              private http: HttpClient) {
  }


  async ngOnInit() {
    this.data = {
      day: this.route.snapshot.queryParams.day,
      month: this.route.snapshot.queryParams.month,
      year: this.route.snapshot.queryParams.year,
    }

    console.log(this.data)
    this.times.length = 24
    this.minutes.length = 6
    await this.getDayInfo()
  }

  async getDayInfo() {
    await this.http.post('http://localhost:3002/getDayInfo', {
      email: await localStorage.getItem('email'),
      data: this.data
    }).subscribe(res => {
      console.log(res)
      // let temp: any = res
      // temp = temp.userData.user
      // this.user = temp
      // localStorage.setItem('user', temp.email)
    }, err => console.log('ERROR'))
  }
  dialogShow(event: any) {
    console.log(sessionStorage.getItem('email'))

    let times = event.target.classList
    for (let b = 0; b < 3; b++) {
      if (times[b].includes("time")) {
        let temp: any = times[b].replace(/[^0-9]/g, '')
        this.time.push(temp)
      } else if (!times[b].includes('minutes')) {
        this.time.push(times[b])
      }
    }

    let dataDialog = {
      time: this.time[1],
      minutes: this.time[0],
      dayData: this.data
    }

    let x = event.pageX + "px"

    this.dialogRef.open(PopUpComponent,
      {
        data: dataDialog,
        height: '350px',
        width: '250px',
        position: {left: x, top: event.y + 'px'}
      });
  }

  openDialog(event: any) {
    if (this.time.length > 1) {
      this.dialogRef.closeAll()
      this.time = []
      this.dialogShow(event)

    } else {
      this.dialogShow(event)
    }
  }

}
