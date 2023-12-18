import {Component, Input} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  todoInfo:any = {
    status:'not open'
  }

  ngOnInit (){

  }

  todoInDay(event:any){
    let parent = event.target.parentElement
    let arrows = document.getElementsByClassName('arrows')

    if (this.todoInfo.status==='not open'){
      this.todoInfo.status='open'
      parent.classList.remove('todoClose')
      parent.classList.add('todoOpen')
      console.log(event.target.classList)
      parent.style.width='400px'
      console.log('click')
      Array.from(arrows).forEach((x:any)=> {
        x.style.transform = 'rotate(135deg)'
        x.style.opacity='0.3'
      })
    } else {
      this.todoInfo.status = 'not open'
      parent.classList.remove('todoOpen')
      parent.classList.add('todoClose')
      console.log(event.target.classList)
      parent.style.width='60px'
      console.log('click')
      Array.from(arrows).forEach((x:any)=> {
        x.style.transform = 'rotate(-45deg)'
        x.style.opacity='0.8'
      })
    }

  }

}
