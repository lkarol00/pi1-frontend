import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-actual-session',
  templateUrl: './actual-session.component.html',
  styleUrls: ['./actual-session.component.css']
})
export class ActualSessionComponent implements OnInit {

  student: any = {
    name: '',
    email: ''
  };
  /*sessions=[
    {
      "date" : 1,
      "temperature" : -4,
      "luminosity" : 10,
      "noise" : 30
    },
    {
      "date" : 30,
      "temperature" : 20,
      "luminosity" : 400,
      "noise" : 40
    },
    {
      "date" : 51,
      "temperature" : 36,
      "luminosity" : 600,
      "noise" : 86
    }

  ];*/
  lastSession = {
    "date" : '',
    "temperature" : null,
    "luminosity" : null,
    "noise" : null,
    "humidity": null
  }
  sessions: any;
  courseId: any;
  studentId: any;
  actualSessions: any;

  constructor(private studentService: StudentsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute
    .queryParams
    .subscribe(params => {
      this.courseId = +params['courseId'] || 0;
      this.studentId = +params['studentId'] || 0;
      this.getStudentInformation();
    });
  }

  getStudentInformation(){
    this.studentService.getStudent(this.studentId).subscribe(results => {
      this.student.name = results[0].name;
      this.student.email = results[0].email;
      this.showSessionsByStudent();
    });
  }

  showSessionsByStudent(){
    this.studentService.getSessionByStudent(this.studentId, this.courseId).subscribe(results => {
      console.log(results);
      this.sessions = results;
      this.saveLastSession();
    });
  }

  saveLastSession(){
    var startDate = new Date(Date.parse(localStorage.getItem('startDate') || "null"));
    this.actualSessions = this.sessions.filter((a:any) => {
      var date = new Date(a.date);
      return (date >= startDate);
    })/*.then(() => {
      this.calculateMobileAverage();
    });*/

  }

  calculateMobileAverage(){
    this.actualSessions
    this.actualSessions
    var length = Object.keys(this.actualSessions).length;
    var register = 0;
    var humidity = [], luminosity = [], noise = [], temperature = [];
    console.log(this.actualSessions, "Hola", length);

    while(register < 10){
      humidity.push(this.actualSessions[length - register].humidity)
      luminosity.push(this.actualSessions[length - register].luminosity)
      noise.push(this.actualSessions[length - register].noise)
      temperature.push(this.actualSessions[length - register].temperature)
      register++;
    }
    console.log(humidity, luminosity, noise, temperature);

  }
}
