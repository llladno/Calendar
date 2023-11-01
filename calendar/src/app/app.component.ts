import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {PopUpComponent} from "./pop-up/pop-up.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  async ngOnInit() {
    if (!localStorage.getItem('email') && !localStorage.getItem('user') && !window.location.href.includes('login')){
      window.location.href = '/login'
    }
  }
}
