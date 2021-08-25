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
import { ReactiveFormsModule } from '@angular/forms';
import { IMqttServiceOptions, MqttModule } from "ngx-mqtt";
import { Ng2OrderModule } from 'ng2-order-pipe';
import { environment as env } from '../environments/environment';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
    hostname: env.mqtt.server,
    port: env.mqtt.port,
    protocol: (env.mqtt.protocol === "wss") ? "wss" : "ws",
    path: env.mqtt.path,
};

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    CoursesComponent,
    LoginComponent,
    ActualSessionComponent,
    LastSessionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    Ng2OrderModule
  ],
  providers: [StudentsService, CoursesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
