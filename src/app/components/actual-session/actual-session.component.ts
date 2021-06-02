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
  sessions: any;
  courseId: any;
  studentId: any;

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
    });
  }

}
