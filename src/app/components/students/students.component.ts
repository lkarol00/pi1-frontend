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

  events: any = [];
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
  sub: any;

  //@Output()
  //toggle = new EventEmitter<any>();

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
          .subscribe((data: IMqttMessage) => {
            let item = JSON.parse(data.payload.toString());
            console.log(item);
            this.events.push(item);
            console.log(this.events);
            //this.toggle.emit(this.events);
          });
  }

  /*onToggle(event: Event){

  }*/

  ngOnDestroy(): void {
    if (this.subscription) {
        this.subscription.unsubscribe();
    }
  }

}
