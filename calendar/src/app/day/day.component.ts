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

  async setValueToCell(){
    await this.getDayInfo()
    !this.dayData ? setTimeout(()=>{
        this.setValueToCell()
    },1000)
      : null
    for (let c in this.dayData.userData){
      console.log(this.dayData.userData[c])
      let userData = this.dayData.userData[c]
      let element:any = document.getElementsByClassName(`${userData.devValue.timeOnDev.minutes}`)
      Array.from(element).forEach((x:any)=>{
        if(x.classList[2] === (`time:${userData.devValue.timeOnDev.hour}`)){
          console.log(`time:${userData.devValue.timeOnDev.hour}`)
          x.style.background = '#000000'
        }
      })
      let element2:any = document.getElementsByClassName(`${userData.devValue.timeToDev.minutes}`)
      console.log("ELEMENT")
      console.log(element2)
      Array.from(element2).forEach((y:any)=>{
        if(y.classList[2] === (`time:${userData.devValue.timeToDev.hour}`)){
          console.log(`time:${userData.devValue.timeToDev.hour}`)
          y.style.background = '#363636'
        }
      })

      let dif = (userData.devValue.timeToDev.hour * 60 + +userData.devValue.timeToDev.minutes) -
        (userData.devValue.timeOnDev.hour * 60 + +userData.devValue.timeOnDev.minutes)
  for (let n = 0; n< dif/10;n++){
    let element4:any = document.getElementsByClassName(`${userData.devValue.timeToDev.minutes+n*10}`)
    Array.from(element4).forEach((y:any)=>{
      if(y.classList[2] === (`time:${userData.devValue.timeOnDev.hour}`)){
        console.log(`time:${userData.devValue.timeToDev.hour}`)
        y.style.background = '#9d5353'
      }
    })
  }

      // let element3:any = document.getElementsByClassName(`${userData.devValue.timeToDev.minutes}`)
      // Array.from(element3).forEach((y:any)=>{
      //   if(y.classList[2] === (`time:${userData.devValue.timeToDev.hour}`)){
      //     console.log(`time:${userData.devValue.timeToDev.hour}`)
      //     y.style.background = '#363636'
      //   }
      // })

    }
    // document.getElementsByClassName(`${this.dayData.userData.}`)
    console.log(await this.dayData)
  }

}
