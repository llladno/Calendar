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
  dayData: any


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
    await this.setValueToCell()
  }

  async getDayInfo() {
    await this.http.post('http://localhost:3002/getDayInfo', {
      email: await localStorage.getItem('email'),
      data: this.data
    }).subscribe(await (res => {
      console.log(res)
      this.dayData = res
      // let temp: any = res
      // temp = temp.userData.user
      // this.user = temp
      // localStorage.setItem('user', temp.email)
    }), err => console.log('ERROR'))
  }

  dialogShow(event: any) {
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
        height: '400px',
        width: '500px',
        backdropClass: 'backdropBackground'
      });
  }

  openDialog(event: any) {
    let appRootClass: any = document.getElementsByClassName('appRootClass')[0]

    appRootClass.style.filter = 'brightness(0.4)'
    if (this.time.length > 1) {
      this.dialogRef.closeAll()
      this.time = []
      this.dialogShow(event)

    } else {
      this.dialogShow(event)
    }
  }

  async setValueToCell() {
    await this.getDayInfo()
    !this.dayData ? setTimeout(() => {
        this.setValueToCell()
      }, 100)
      : null
    for (let c in this.dayData.userData) {
      let userData = this.dayData.userData[c]

      let dif = (+userData.devValue.timeToDev.hour * 60 + +userData.devValue.timeToDev.minutes) -
        (+userData.devValue.timeOnDev.hour * 60 + +userData.devValue.timeOnDev.minutes) + 10
      for (let n = 0; n < (dif / 10); n++) {
        let c:any = n
        if (+userData.devValue.timeOnDev.minutes + n * 10 > 59) {
          let check = dif - 60
          c = +userData.devValue.timeOnDev.minutes + dif-n*10 - check
          // c = +userData.devValue.timeOnDev.minutes + c

          if (c <= 0 || c === '00'){
            c = '00'
          }

          let element4: any = document.getElementsByClassName(`${c}`)
          Array.from(element4).forEach((y: any) => {
            if (y.classList[2] === (`time:${+userData.devValue.timeOnDev.hour+1}`)) {
              y.style.background = userData.color || '#0000ff'
            }
          })
        }
        else {
          let element4: any = document.getElementsByClassName(`${+userData.devValue.timeOnDev.minutes + n * 10}`)
          console.log(+userData.devValue.timeOnDev.minutes + n * 10)
          Array.from(element4).forEach((y: any) => {
            if (y.classList[2] === (`time:${userData.devValue.timeOnDev.hour}`)) {
              y.style.background = userData.color || '#0000ff'
            }
          })
        }
      }
    }
    // document.getElementsByClassName(`${this.dayData.userData.}`)
    console.log(await this.dayData)
  }
}
