import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CoursesService } from 'src/app/services/courses.service';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: any;
  loading = false;

  constructor(private courseService: CoursesService, private router: Router, private authService: AuthService,
              private studentService: StudentsService)  { }

  ngOnInit(): void {
    this.showCourses();
  }

  showCourses() {
    let personId = localStorage.getItem('personId') || "-1";
    this.courseService.getCourses(parseInt(personId)).subscribe(results => {
      this.courses = results;
      this.loading = true;
    });
  }

  sendMessage(courseId: number){
    let startDate = new Date().toISOString()
    localStorage.setItem('startDate', startDate.toString());
    this.studentService.sendConnectMessage(courseId).subscribe(results => {
      console.log(results);
    });
  }
}
