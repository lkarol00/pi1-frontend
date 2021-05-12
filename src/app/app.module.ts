import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { StudentsComponent } from './components/students/students.component';
import { StudentsService } from './services/students.service';
import { CoursesComponent } from './components/courses/courses.component';
import { CoursesService } from './services/courses.service';


@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    CoursesComponent
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
