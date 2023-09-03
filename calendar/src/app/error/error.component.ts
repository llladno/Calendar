import { Component } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {PopUpComponent} from "../pop-up/pop-up.component";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {

  constructor(private dialogRef:MatDialog){}
  openDialog (){
    const dialogConfig = new MatDialogConfig;
    dialogConfig.position = {
      'top': '200px',
      left: '300px'
    };
    let dialog = this.dialogRef.open(PopUpComponent, dialogConfig);
    // dialog.afterOpened().subscribe()
    // dialog.close()
  }
}
