import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormControl, NgForm, FormGroup} from '@angular/forms'
import settings from '../../settings.json'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit{
  data: object[]
  inputs: any
  groupControl: FormGroup
  sucseccful: boolean = false
  loading: boolean = true
constructor(private http: HttpClient) {
}
  ngOnInit(){
    this.groupControl = new FormGroup({
      loginControl: new FormControl(),
      emailControl: new FormControl(),
      passwordControl: new FormControl(),
    })
    this.loading = false
  }
  submitForm (){
    let checkData = this.groupControl.value
    let allOk = false
    for (let b in checkData){
      if (checkData[b] === null){
        allOk = false
        break
      }
      else{
        allOk = true
      }
    }
      if (allOk) {
        this.postData(checkData).subscribe( req =>{
          this.sucseccful = true
          window.location.href = '/login'
        },err => console.log('ERROR'))
      }
  }
  postData(data: any){
    return this.http.post(`http://${settings.host}:3002/registration`, data)
  }
}
