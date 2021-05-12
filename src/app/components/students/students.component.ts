import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: any;
  courses: any;
  selectedCourse:any = null;
  selection: any;
  sessions: any;

  constructor(private studentService: StudentsService, private courseService: CoursesService)  { }

  ngOnInit(): void {
    this.showCourses();
    this.showStudents();
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

}
