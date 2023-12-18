import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Routes, RouterModule} from "@angular/router";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MenuComponent } from './menu/menu.component';
import { RegistrationComponent } from './registration/registration.component';
import { ErrorComponent } from './error/error.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { LoadingComponent } from './loading/loading.component';
import { LoginComponent } from './login/login.component';
import { CalendarMainComponent } from './calendar-main/calendar-main.component';
import { DayComponent } from './day/day.component';
import { TableHeadComponent } from './table-head/table-head.component';
import {MatDialogModule} from '@angular/material/dialog';
import { PopUpComponent } from './pop-up/pop-up.component';
import { SelectBarComponent } from './table-head/select-bar/select-bar.component';
import { TodoComponent } from './day/todo/todo.component';



const appRoutes: Routes =[
  {path: '', component: HomepageComponent},
  {path: 'calendar', component: HomepageComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'day/:day:month:year', component: DayComponent},
  {path: '**', component: ErrorComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    MenuComponent,
    RegistrationComponent,
    ErrorComponent,
    LoadingComponent,
    LoginComponent,
    CalendarMainComponent,
    DayComponent,
    TableHeadComponent,
    PopUpComponent,
    SelectBarComponent,
    TodoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
