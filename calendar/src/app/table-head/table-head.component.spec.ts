import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHeadComponent } from './table-head.component';
import {SelectBarComponent} from "./select-bar/select-bar.component";

describe('TableHeadComponent', () => {
  let component: TableHeadComponent;
  let fixture: ComponentFixture<TableHeadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableHeadComponent]
    });
    fixture = TestBed.createComponent(TableHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
