import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { StudentsComponent } from './components/students/students.component';
import { StudentsService } from './services/students.service';
import { CoursesComponent } from './components/courses/courses.component';
import { CoursesService } from './services/courses.service';
import { LoginComponent } from './components/login/login.component';
import { ActualSessionComponent } from './components/actual-session/actual-session.component';
import { LastSessionComponent } from './components/last-session/last-session.component';


@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    CoursesComponent,
    LoginComponent,
    ActualSessionComponent,
    LastSessionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [StudentsService, CoursesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
