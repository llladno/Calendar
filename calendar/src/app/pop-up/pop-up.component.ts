import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";



@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent  implements  OnInit{

  groupControl: FormGroup;

  constructor(private dialogRef:MatDialog,
  @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  ngOnInit() {
    this.groupControl = new FormGroup({
      timeControl: new FormControl(),
      // passwordControl: new FormControl(),
    })
    if (this.data.time.length === 1){
      this.data.time = "0"+this.data.time
    }
  }

  submitForm(){
    let input = document.getElementsByClassName('timeMinutes')[0]
    if (input.attributes)
    // if (input.validity.valid && input.type === "time") {
    //   // <input type=time> reversed range supported
    // } else {
    //   // <input type=time> reversed range unsupported
    // }
    console.log(this.groupControl.value)
  }

  close(){
    this.dialogRef.closeAll()
  }
}
