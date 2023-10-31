import {Component, OnInit, Output, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {PopUpComponent} from "../pop-up/pop-up.component";
import {HttpClient} from "@angular/common/http";

interface DayData {
  status: string,
    userData: any
}


@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  data: {day: string, month: string, year:string}
  times: Array<object> = [];
  minutes: Array<object> = []
  time: Array<object> = [];
  dayData: DayData

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

    this.times.length = 24
    this.minutes.length = 6
    await this.setValueToCell()
  }

  async getDayInfo() {
    await this.http.post('http://localhost:3002/getDayInfo', {
      email: await localStorage.getItem('email'),
      data: this.data
    }).subscribe(await ( (res:any) => {
      this.dayData = res
      // let temp: any = res
      // temp = temp.userData.user
      // this.user = temp
      // localStorage.setItem('user', temp.email)
    }), err => console.log('ERROR'))
  }

  dialogShow(event: any, newValue:boolean, dataTask:any) {
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
      dayData: this.data,
      new: newValue
    }
      dataTask ? dataDialog = dataTask
        : dataDialog = dataDialog

    let x = event.pageX + "px"
    console.log(this.time.length)
      this.dialogRef.open(PopUpComponent,
        {
          data: dataDialog,
          height: '400px',
          width: '400px',
          backdropClass: 'backdropBackground'
        });
  }

  openDialog(event: any) {
    let appRootClass: any = document.getElementsByClassName('appRootClass')[0]
    if (event.target.classList[3]?.slice(0,4) === 'task') {
      let number = +event.target.classList[3].slice(5,100)
      this.dialogShow(event,false, this.dayData.userData[number])
//показывать что то
    } else {
      console.log(this.time)
      appRootClass.style.filter = 'brightness(0.4)'
      if (this.time.length > 1) {
        this.dialogRef.closeAll()
        this.time = []
        setTimeout(()=>{
          this.dialogShow(event,true, null)
        },200)

      } else {
        this.dialogShow(event, true, null)
      }
    }
  }

  async setValueToCell() {
    await this.getDayInfo()
    !this.dayData ? setTimeout(() => {
        this.setValueToCell()
      }, 1000)
      : null
    if (this.dayData){
    for (let ar in this.dayData.userData) {
      let userData = this.dayData.userData[ar]
      let dif = (+userData.devValue.timeToDev.hour * 60 + +userData.devValue.timeToDev.minutes) -
        (+userData.devValue.timeOnDev.hour * 60 + +userData.devValue.timeOnDev.minutes) + 10
      let h = 1

      for (let n = 0; n < (dif / 10); n++) {
        let c: any = n
        if (+userData.devValue.timeOnDev.minutes + n * 10 > 59) {

          let check = dif - 60
          c = +userData.devValue.timeOnDev.minutes - dif + n * 10 + check
          if (c < 0) {
            c += 10
          }

          if (c <= 0 || c === '00') {
            c = '00'
          }


          let element4: any = document.getElementsByClassName(`${c}`)
          Array.from(element4).forEach((y: any) => {
            if (c > 60) {// Доделать
              h = h + 1
            }
            console.log(c)
            console.log(h)
            if (y.classList[2] === (`time:${+userData.devValue.timeOnDev.hour + h}`)) {
              y.style.background = userData.color || '#0000ff'
              y.classList.add(`task:${ar}`)
            }
          })
        } else {
          let element4: any = document.getElementsByClassName(`${+userData.devValue.timeOnDev.minutes + n * 10}`)
          Array.from(element4).forEach((y: any) => {
            if (y.classList[2] === (`time:${userData.devValue.timeOnDev.hour}`)) {
              y.style.background = userData.color || '#0000ff'
              y.classList.add(`task:${ar}`)
            }
          })
        }
      }
      let firstElement = document.getElementsByClassName(`time:${userData.devValue.timeOnDev.hour}`)
      Array.from(firstElement).forEach((x, i) => {
        if (x.classList[0] === userData.devValue.timeOnDev.minutes) {
          firstElement[i].innerHTML = `<p>${userData.timeOn} - ${userData.timeTo}</p>
        <button>Р</button>`
        }
      })
    }
    }
  }
}
