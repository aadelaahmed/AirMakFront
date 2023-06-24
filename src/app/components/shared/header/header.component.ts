import {Component, OnInit} from '@angular/core';
import {NavbarService} from "../../../services/navbar.service";
import {BehaviorSubject} from "rxjs";
import {Router} from '@angular/router';
import {ApiService} from 'src/app/services/api.service';
import {HttpHeaders} from '@angular/common/http';
import {SocialAuthService} from "@abacritt/angularx-social-login";
import {PopupService} from "../../../services/popup.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isSignInButtonVisible: boolean;

  constructor(
    private navbarService: NavbarService,
    private router: Router,
    private apiService: ApiService,
    private authService: SocialAuthService,
    private popupService: PopupService
  ) {
  }

  ngOnInit() {
    this.navbarService.isLoggedIn().subscribe((isLoggedIn: boolean) => {
      this.isSignInButtonVisible = !isLoggedIn;
    });
  }

  logout() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // Call the logout API on the server
    this.apiService.get('users/logout', {headers, withCredentials: true}).subscribe(
      () => {
        // Clear the logged-in status in the navbar service
        this.navbarService.setLoggedIn(false);
        this.signOut();
        this.popupService.successPopup("We Will Miss you")
        this.router.navigate(['/home'])
      },
      (error) => {
        console.log('error');
        this.popupService.errorPopup("Failed Logout")
      }
    );
  }

  signOut(): void {
    this.authService.signOut();
  }
}
