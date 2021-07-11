import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AuthService]
})
export class AppComponent {
  title = 'pi1-frontend';
  personId = localStorage.getItem('personId');

  logOut(){
    localStorage.setItem('personId', 'null');
  }

}
