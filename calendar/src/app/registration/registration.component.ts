import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormControl, NgForm, FormGroup} from '@angular/forms'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit{
  data: object[]
  inputs: any
  groupControl: FormGroup
constructor(private http: HttpClient) {
}
  ngOnInit(){
    this.groupControl = new FormGroup({
      nameControl: new FormControl(),
      emailControl: new FormControl(),
      phoneControl: new FormControl(),
    })
    // this.groupControl.valueChanges.subscribe(value => console.log(value))
  }
  submitForm (){
    console.log('click')
    console.log(this.groupControl.value)
    this.inputs = document.querySelector('.data')
    console.log(this.inputs)
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
      console.log(checkData[b])
    }
    console.log(allOk)
    // this.groupControl.value.forEach((input: any)=>{
    //   if (input.tagName === 'INPUT'){
    //     if(!input.value){
    //       input.style.border = '2px solid red'
    //       allOk = false
    //       console.log('ok')
    //     }
    //     else {
    //       allOk = true
    //       this.data.push(input.value)
    //       console.log('ok')
    //     }
    //    console.log(input.value)
    //   }
      if (allOk) {
        console.log(checkData)
        this.postData(checkData).subscribe(res =>{
          console.log('ok')
        },error => console.log('error'))
      }
    // })
  }
  postData(data: any){
    console.log(data)
    // return this.http.get('https://jsonplaceholder.typicode.com/posts')
    return this.http.post('http://localhost:3002/registration', data)
  }

  check(){
    this.http.get('https://jsonplaceholder.typicode.com/posts/').subscribe((res)=> console.log(res))
  }




}
