import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private api = environment.api;

  constructor(private http: HttpClient) {}

  getStudentsByCourse(courseId: number){
    const path = this.api + "students/course/?courseId=" + courseId;
    return this.http.get<any>(path);
  }

  getStudents(){
    const path = this.api + "students";
    return this.http.get<any>(path);
  }

  getStudent(studentId: number){
    const path = this.api + "student/?studentId=" + studentId;
    return this.http.get<any>(path);
  }

  getSessionByStudent(studentId: number, courseId: number){
    const path = this.api + "session/?courseId=" + courseId + "&studentId=" + studentId;
    return this.http.get<any>(path);
  }
}
