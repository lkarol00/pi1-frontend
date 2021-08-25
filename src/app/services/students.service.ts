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

  getCurrentSessionByStudent(studentId: number, courseId: number){
    var sessionDate = localStorage.getItem("startDate");
    const path = this.api + "actual-session/?courseId=" + courseId + "&studentId=" + studentId
                  + "&sessionDate=" + sessionDate;
    return this.http.get<any>(path);
  }

  getLastsSessionByStudent(studentId: number, courseId: number){
    var sessionDate = localStorage.getItem("startDate");
    const path = this.api + "student/last-sessions?courseId=" + courseId + "&studentId=" + studentId
                  + "&sessionDate=" + sessionDate;
    return this.http.get<any>(path);
  }

  sendConnectMessage(courseId: number){
    const path = this.api + "connect/?courseId=" + courseId;
    return this.http.get<any>(path);
  }
}
