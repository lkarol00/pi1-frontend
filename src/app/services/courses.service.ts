import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private api = environment.api;

  constructor(private http: HttpClient) {}

  getCourses(personId: number){
    const path = this.api + "courses?personId=" + personId;
    return this.http.get<any>(path);
  }

}
