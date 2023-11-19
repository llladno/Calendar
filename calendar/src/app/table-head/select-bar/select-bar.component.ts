import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-select-bar',
  templateUrl: './select-bar.component.html',
  styleUrls: ['./select-bar.component.css']
})
export class SelectBarComponent {
 @Input() data:any;
 @Input() nextMonth: any;
}
