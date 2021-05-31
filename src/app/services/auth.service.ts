import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  professor = {
    name: '',
    email: '',
    id: ''
  }

  private api = environment.api;

  constructor(private http: HttpClient) {}

  auth(email: string, password: string){
    const path = this.api + "login";
    const body = {
      email: email,
      password: password
    }
    this.http.post<any>(path, body).subscribe(res =>{
      this.professor.email = res[0].email;
      this.professor.name = res[0].name;
      this.professor.id = res[0].id;
    });

    return this.http.post<any>(path, body);
  }
}
