import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import host from '../../host.json'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  @Input() user:any
  loading: boolean = true
  flip: boolean = false
  constructor(
    public userLogin: ElementRef,
    public bar: ElementRef,
    public rotatePointMenu: ElementRef,
    public pointsMenuButton: ElementRef,
    private http: HttpClient
  ) {}
  ngOnInit() {
    if (this.user){
      this.loading = false
    }
    else {
      let userMail = localStorage.getItem('user')
      this.http.post(`http://${host.host}:3002/login`, {emailControl: userMail}).subscribe( res =>{
        let temp:any = res
        temp = temp.userData.user
        this.user = temp
      },err => console.log('ERROR'))
      this.loading = true
    }
  }
  menubar(){
    let bar = this.bar.nativeElement.querySelector('.menuBorder')
    let userLogin = this.userLogin.nativeElement.querySelector('.userLogin')
    let rotatePointMenu = this.rotatePointMenu.nativeElement.querySelector('.rotatePointMenu')
    let pointsMenuButton = this.pointsMenuButton.nativeElement.querySelectorAll('.pointsMenuButton')
    let pointsMenuButtonLogout = this.pointsMenuButton.nativeElement.querySelectorAll('.pointsMenuButtonLogout')[0]

    if (this.flip){
      bar.style.width = '100%'
      userLogin.style.opacity = '1'
      userLogin.style.width = '50%'
      rotatePointMenu.style.transform = 'rotate(0)'

      for (let b = 0; b< pointsMenuButton.length;b++) pointsMenuButton[b].style.opacity = '1'
      pointsMenuButtonLogout.style.opacity = '1'
      this.flip = false
    }
    else{
      bar.style.width = '100px'
      userLogin.style.opacity = '0'
      userLogin.style.width = '0'
      rotatePointMenu.style.transform = 'rotate(90deg)'
      for (let b = 0; b< pointsMenuButton.length;b++) pointsMenuButton[b].style.opacity = '0'
      pointsMenuButtonLogout.style.opacity = '0'

      this.flip = true
    }

  }

  protected readonly window = window;
}
