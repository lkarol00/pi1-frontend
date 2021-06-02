import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: any;
  loading = false;

  constructor(private courseService: CoursesService, private router: Router, private authService: AuthService)  { }

  ngOnInit(): void {
    this.showCourses();
  }

  showCourses() {
    this.courseService.getCourses(parseInt(this.authService.professor.id)).subscribe(results => {
      this.courses = results;
      this.loading = true;
    });
  }
}
