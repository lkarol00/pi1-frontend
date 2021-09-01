import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { StudentsService } from '../../services/students.service';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EventMqttService } from '../../services/event.mqtt.service';
import { IMqttMessage } from "ngx-mqtt";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  data: any = {};
  deviceId: string = '';
  subscription: Subscription;

  students: any;
  isF : boolean = false
  isF2 : boolean = false

  courses: any;
  sessions: any;
  selectedCourse:any = null;
  selection: any;

  courseId: any;

  subscription2: Subscription;
  private subscriptions: Array<Subscription> = [];

  key: string = 'student.mean';
  reverse: boolean = false;

  constructor(private studentService: StudentsService, private courseService: CoursesService,
              private activatedRoute: ActivatedRoute, private router: Router)  { }

  ngOnInit(): void {
    this.activatedRoute
            .queryParams
            .subscribe(params => {
              // Defaults to 0 if no query param provided.
              this.courseId = +params['courseId'] || 0;
              this.showStudentsByCourse(this.courseId);
              //this.subscribeToTopic();
            });

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
      console.log(results);
      this.students.forEach((element: any) => {
        this.data[element.id] = {
          'mean': 0
        };
        this.subscriptions.push( timer(0, 10000).pipe(
          switchMap(() => this.studentService.getLastsSessionByStudent(element.id, this.courseId))
        ).subscribe(results => {
          console.log(element.id, results);
          var total = 0;
          /*var avg = results.forEach((element: any) => {
            total = total + element.noise;
          });*/
          this.data[element.id] = {
            'mean': results.mean  // total / results.length|| 0   results[0].noise
          };

          // this.students[element.id].mean = total / results.length || 0;
          console.log(this.data);
          // this.sort('mean');


        }));
      });
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

  sort(key: string){
    this.key = key;
    this.reverse = !this.reverse;
  }

  /*private subscribeToTopic() {
      this.subscription = this.eventMqtt.topic(this.deviceId)
          .subscribe((message: IMqttMessage) => {
            let item = JSON.parse(message.payload.toString());
            console.log(item);
            this.saveInformation(item);
          });
  }*/


  /*saveInformation(result: any){
    if (this.data[result.studentId].noise.length === 10){
      this.data[result.studentId].noise.splice(0, 1);
    }
    var storage = localStorage.getItem(result.studentId) || "-1";
    var data_json = JSON.parse(storage.toString());

    if (data_json.noise.length === 10){
      data_json[result.studentId].noise.splice(0, 1);
    }
    data_json.noise.push(result.noise);
    let avg2 = data_json.noise.reduce((a:any,b:any)=>a + b, 0) / data_json.noise.length;
    data_json.mean = avg2;
    localStorage.setItem(result.studentId, JSON.stringify(data_json));

    this.data[result.studentId].noise.push(result.noise);
    let avg = this.data[result.studentId].noise.reduce((a:any,b:any)=>a + b, 0) / this.data[result.studentId].noise.length;
    this.data[result.studentId].mean = avg;
    console.log(this.data);

  }*/

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
  });
    console.log(typeof(this.subscription));
  }

}
