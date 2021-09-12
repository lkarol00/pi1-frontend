import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { StudentsService } from '../../services/students.service';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  data: any = {};
  subscription: Subscription;

  students: any;
  isF : boolean = false
  isF2 : boolean = false

  courses: any;
  sessions: any;
  selectedCourse:any = null;
  selection: any;

  courseId: any;

  private subscriptions: Array<Subscription> = [];

  key: string = 'mean';
  reverse: boolean = true;

  constructor(private studentService: StudentsService, private courseService: CoursesService,
              private activatedRoute: ActivatedRoute, private router: Router)  { }

  ngOnInit(): void {
    this.activatedRoute
            .queryParams
            .subscribe(params => {
              // Defaults to 0 if no query param provided.
              this.courseId = +params['courseId'] || 0;
              this.showStudentsByCourse(this.courseId);
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
      this.students.forEach((element: any) => {
        this.data[element.id] = {
          'mean': 0
        };
        this.subscriptions.push( timer(0, 7000).pipe(
          switchMap(() => this.studentService.getLastsSessionByStudent(element.id, this.courseId))
        ).subscribe(results => {
          this.data[element.id] = {
            'mean': results.mean
          };
          var index = this.students.findIndex((post: any, index: any) => {
            if(post.id == element.id)
              return true;
          });
          this.students[index].mean = results.mean;
          this.students[index].meanAux = results.mean;
          this.sort();
          console.log(this.students);
        }));
      });
    });
  }

  sort(){
    if (this.key === "mean"){
      this.key = "meanAux";
    } else {
      this.key = "mean";
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
