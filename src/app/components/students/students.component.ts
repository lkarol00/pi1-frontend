import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { StudentsService } from '../../services/students.service';
import { Subscription } from 'rxjs';
import { EventMqttService } from '../../services/event.mqtt.service';
import { IMqttMessage } from "ngx-mqtt";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  //data: any = [{'courseId': '', 'message': ''}];
  data: any = {"2":{
      'humidity': [0],
      'luminosity': [0],
      'temperature': [3],
      'noise': [4],
      'mean': 0
  }};
  deviceId: string = '';
  subscription: Subscription;

  students: any;
  isF : boolean = false
  isF2 : boolean = false

  students2= [ {"id":20 ,
    "name":"Hernan",
    "email": "asd",
    "temp": 30 },
    {"id":21 ,
    "name":"Valentina",
    "email": "asd",
    "temp": 50 },

  ];
  courses: any;
  selectedCourse:any = null;
  selection: any;
  sessions=[
    {
      "date" : 1,
      "temperature" : -4,
      "luminosity" : 10,
      "noise" : 30
    }
  ]
  sessions2=[
    {
      "date" : 30,
      "temperature" : 20,
      "luminosity" : 400,
      "noise" : 40
    }
  ]

  courseId: any;

  constructor(private studentService: StudentsService, private courseService: CoursesService,
              private activatedRoute: ActivatedRoute, private router: Router,
              private readonly eventMqtt: EventMqttService)  { }

  ngOnInit(): void {
    //this.showCourses();
    //this.showStudents();
    this.activatedRoute
            .queryParams
            .subscribe(params => {
              // Defaults to 0 if no query param provided.
              this.courseId = +params['courseId'] || 0;
              this.showStudentsByCourse(this.courseId);
            });
    this.subscribeToTopic();
  }

  showStudents() {
    this.studentService.getStudents().subscribe(results => {
      this.students = results;
    });
  }

  showStudentsByCourse(courseId: number) {
    this.selection = null;
    this.selectedCourse = courseId;
    this.studentService.getStudentsByCourse(courseId).subscribe(results => {
      this.students = results;
    });
  }

  showCourses() {
    this.courseService.getCourses(1).subscribe(results => {
      this.courses = results;
    });
  }

  showSessionsByStudent(studentId: number){
    this.selection = studentId;
    if(this.selectedCourse != null){
      this.studentService.getSessionByStudent(studentId, this.selectedCourse).subscribe(results => {
        console.log(results);
        this.sessions = results;
      });
    }
  }

  private subscribeToTopic() {
      this.subscription = this.eventMqtt.topic(this.deviceId)
          .subscribe((message: IMqttMessage) => {
            let item = JSON.parse(message.payload.toString());
            console.log(item);
            this.saveInformation(item);
          });
  }


  saveInformation(result: any){
    if( !this.data.hasOwnProperty(result.studentId) ) {

      var schema = {
        'humidity': [result.humidity],
        'luminosity': [result.luminosity],
        'temperature': [result.temperature],
        'noise': [result.noise],
        'mean': result.noise
      }

      this.data[result.studentId] = schema;
      console.log(this.data);
    } else {
      this.data[result.studentId].humidity.push(result.humidity);
      this.data[result.studentId].luminosity.push(result.luminosity);
      this.data[result.studentId].temperature.push(result.temperature);
      this.data[result.studentId].noise.push(result.noise);
      let avg = this.data[result.studentId].noise.reduce((a:any,b:any)=>a + b, 0) / this.data[result.studentId].noise.length;
      this.data[result.studentId].mean = avg;
      console.log(this.data);

    }

  }

  ngOnDestroy(): void {
    if (this.subscription) {
        this.subscription.unsubscribe();
    }
  }

}
