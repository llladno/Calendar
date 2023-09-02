import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{
  user: {
    email?: string;
    login?: string;
  } = {email: '',login: ''};


email: string | any;
password: string;
login: string;
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  this.userConnect()
  }

  userConnect(){
    this.email = localStorage.getItem('email')
    this.password = '123';
    this.http.post('http://localhost:3002/login', {emailControl: this.email}).subscribe( res =>{
      let temp:any = res
      temp = temp.userData.user
      this.user = temp
      localStorage.setItem('user', temp.email)
    },err => console.log('ERROR'))
  }


}
