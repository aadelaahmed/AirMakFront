import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileData: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = { headers, withCredentials: true };

    this.http.get<any>('http://localhost:8080/users/Profile/ViewProfile', options)
      .subscribe(
        response => {
          console.log(response.payload)
          this.profileData = response.payload;
        },
        error => {
          console.error(error);
        }
      );
  }
}
