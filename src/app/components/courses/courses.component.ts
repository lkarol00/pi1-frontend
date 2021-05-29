import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: any;

  constructor(private courseService: CoursesService, private router: Router)  { }

  ngOnInit(): void {
    this.showCourses();
  }

  showCourses() {
    this.courseService.getCourses(1).subscribe(results => {
      this.courses = results;
    });
  }
}
