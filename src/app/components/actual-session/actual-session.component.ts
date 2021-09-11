import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from 'src/app/services/students.service';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
  sessions: any;
  courseId: any;
  studentId: any;
  actualSessions: any;

  subscription: Subscription;

  constructor(private studentService: StudentsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute
    .queryParams
    .subscribe(params => {
      this.courseId = +params['courseId'] || 0;
      this.studentId = +params['studentId'] || 0;
      this.getStudentInformation();
    });

    this.subscription = timer(0, 5000).pipe(
      switchMap(() => this.studentService.getCurrentSessionByStudent(this.studentId, this.courseId))
    ).subscribe(results => this.sessions = results);
  }

  getStudentInformation(){
    this.studentService.getStudent(this.studentId).subscribe(results => {
      this.student.name = results[0].name;
      this.student.email = results[0].email;
    });
  }

  showSessionsByStudent(){
    this.studentService.getCurrentSessionByStudent(this.studentId, this.courseId).subscribe(results => {
      this.sessions = results;
    })
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }
}
