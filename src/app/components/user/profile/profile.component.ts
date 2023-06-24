import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SessionStorageService} from 'src/app/services/session-storage.service';
import {AuthGuardService} from "../../../services/auth-guard.service";
import {ApiService} from "../../../services/api.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileData: any;
  userID: string;

  constructor(
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private authGuardService: AuthGuardService,
    private apiService: ApiService
  ) {
  }

  ngOnInit() {
    this.userID = this.sessionStorageService.getItem('userID');
    console.log('User ID in Profile Component: ', this.userID);
    this.apiService.get('users/profile/view-profile')
      .subscribe({
        next: response => {
          console.log(response.payload);
          console.log("aklshdoilsaedihfo;ishfgoidsfhoghdsf")
          this.profileData = response.payload;
        },
        error: error => {
          console.error(error);
        }
      });
  }

  editProfileButton() {
    this.router.navigate(['user/profile/edit-profile']);
  }

  updatePasswordButton() {
    this.router.navigate(['user/profile/update-password']);
  }

}
