import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: any;

  constructor(private courseService: CoursesService)  { }

  ngOnInit(): void {
    this.showCourses();
  }

  showCourses() {
    this.courseService.getCourses(1).subscribe(results => {
      console.log(results);

      this.courses = results;
    });
  }

}
