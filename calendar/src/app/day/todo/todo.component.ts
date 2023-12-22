import {Component, ElementRef, Input} from '@angular/core';
import {delay, Observable} from 'rxjs';
import {ActivatedRoute, Router} from "@angular/router";
import host from "../../../host.json";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  todoInfo:any = {
    status:'not open'
  }

  tasks:Array<any> = []

  constructor(public taskAddInput: ElementRef,
  private route:ActivatedRoute,
  private router: Router,
  private http: HttpClient) {
  }

  async ngOnInit (){
    this.tasks=[]
    let taskAddInput = this.taskAddInput.nativeElement.querySelector('.taskAddInput')
      window.addEventListener('keydown',(e)=>{
        console.log('keydown')
        if (e.keyCode === 13){
          this.addTask()
        }
      })


    await this.http.post(`http://${host.host}:3002/getDayInfoTodo`, {
      email: await localStorage.getItem('email'),
      data: this.route.snapshot.queryParams
    }).subscribe( ( async(res:any) => {
      this.tasks = res.userData
      console.log(res)
      // this.dayData = await res
      // let temp: any = res
      // temp = temp.userData.user
      // this.user = temp
      // localStorage.setItem('user', temp.email)
    }), err => console.log('ERROR'))
  }

  todoInDay(event:any){
    let parent = event.target.parentElement
    let arrows = document.getElementsByClassName('arrows')
    console.log(event.target)
    if (this.todoInfo.status==='not open'){
      this.todoInfo.status='open'
      parent.parentElement.classList.remove('todoClose')
      parent.parentElement.classList.add('todoOpen')
      console.log(event.target.classList)
      parent.parentElement.style.width='400px'
      console.log('click')
      Array.from(arrows).forEach((x:any)=> {
        x.style.transform = 'rotate(135deg)'
        x.style.opacity='0.3'
      })
    } else {
      this.todoInfo.status = 'not open'
      parent.parentElement.classList.remove('todoOpen')
      parent.parentElement.classList.add('todoClose')
      console.log(event.target.classList)
      parent.parentElement.style.width='60px'
      console.log('click')
      Array.from(arrows).forEach((x:any)=> {
        x.style.transform = 'rotate(-45deg)'
        x.style.opacity='0.8'
      })
    }

  }

  addTask(){
    let taskAddInput = this.taskAddInput.nativeElement.querySelector('.taskAddInput')
    console.log(taskAddInput.value)
    this.tasks.push({
      value: taskAddInput.value,
      priority: 'default'
    })
    console.log(this.tasks.length-1)
    this.setData(taskAddInput.value, this.tasks.length-1)
  }

  setData(value:any, id:number){
    let data = this.route.snapshot.queryParams
    let requestData = {
      date: {
        day: data.day,
        month: data.month,
        year: data.year,
      },
      idTask: id,
      tasks: value
    }
    console.log(requestData)

    this.http.post(`http://${host.host}:3002/newTaskTodoInDay`, {
      email: localStorage.getItem('email'),
      requestData
    }).subscribe(res => {
      // let temp: any = res
      // temp = temp.userData.user
      // this.user = temp
      // localStorage.setItem('user', temp.email)
    }, err => console.log('ERROR'))
    console.log('submit')
  }

  deleteTask(event:any,deleey:number, id:any){
    let data = this.route.snapshot.queryParams
    event.target.disabled = true
    console.log('change')
    let dateDelete = this.route.snapshot.queryParams

    this.http.post(`http://${host.host}:3002/deleteTaskTodoInDay`, {
      email: localStorage.getItem('email'),
      date: {
        day: data.day,
        month: data.month,
        year: data.year,
      },
      idTask: id,
    }).subscribe(res => {
      // let temp: any = res
      // temp = temp.userData.user
      // this.user = temp
      // localStorage.setItem('user', temp.email)
    }, err => console.log('ERROR'))

    let check = document.getElementsByClassName('check')

    setTimeout(()=>{
      event.target.parentElement.parentElement.remove()
    }, 1000)
  }

}
