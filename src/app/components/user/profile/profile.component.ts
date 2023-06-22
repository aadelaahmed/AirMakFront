import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileData: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  ngOnInit() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {headers, withCredentials: true};

    this.http.get<any>('http://localhost:8080/users/profile/view-profile', options)
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

  editProfileButton() {
    this.router.navigate(['profile/edit-profile'])
  }

  updatePasswordButton() {
    this.router.navigate(['profile/update-password'])
  }

}
