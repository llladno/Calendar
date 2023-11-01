import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Inject} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import settings from '../../settings.json'


@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {

  groupControl: FormGroup;
  email: any;
  user: any

  defaultColor: string = '#0000FF'

  constructor(private dialogRef: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.groupControl = new FormGroup({
      timeControl: new FormControl(),
      taskControl: new FormControl(),
      colorControl: new FormControl()
    })
    if (this.data.time.length === 1) {
      this.data.time = "0" + this.data.time
    }
  }

  submitForm() {
    this.groupControl.value.colorControl === null ? this.groupControl.value.colorControl = '#000000'
      : null
    if ((this.groupControl.value.timeControl > this.data.time + ":" + this.data.minutes) &&
      (this.groupControl.value.taskControl !== '' || 0)) {
      this.email = localStorage.getItem('email')

      this.http.post(`http://${settings.host}:3002/newTask`, {
        email: this.email,
        timeOn: this.data.time + ":" + this.data.minutes,
        timeTo: this.groupControl.value.timeControl,
        task: this.groupControl.value.taskControl,
        color: this.groupControl.value.colorControl,
        dayData: this.data.dayData
      }).subscribe(res => {
        // let temp: any = res
        // temp = temp.userData.user
        // this.user = temp
        // localStorage.setItem('user', temp.email)
      }, err => console.log('ERROR'))
      console.log('submit')
    } else {
      alert('Введите корректные данные')
    }
  }

  close() {
    let appRootClass: any = document.getElementsByClassName('appRootClass')[0]
    appRootClass.style.removeProperty('filter')
    this.dialogRef.closeAll()
  }
}
