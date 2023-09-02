import {Component, OnInit} from '@angular/core';
import {FormControl, NgForm, FormGroup} from '@angular/forms'
import {HttpClient, HttpClientModule} from "@angular/common/http";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  groupControl: FormGroup;
  sucsessful: boolean = true;

  constructor(private http: HttpClient) {
  }

  ngOnInit(){
    this.groupControl = new FormGroup({
      emailControl: new FormControl(),
      passwordControl: new FormControl(),
    })
  }

  submitForm(){
    for (let groupControlKey in this.groupControl.value) {
      if (!this.groupControl.value[groupControlKey]) {
        this.sucsessful = false;
        break
      }
      else this.sucsessful = true;
    }
    if (this.sucsessful){
      console.log('ok')
      this.http.post('http://localhost:3002/login', this.groupControl.value).subscribe( res =>{
        let result:any = res
        localStorage.setItem('email', result.userData.user.email)
        window.location.href = '/'
      },err => console.log('ERROR'))
    }
  }
}
