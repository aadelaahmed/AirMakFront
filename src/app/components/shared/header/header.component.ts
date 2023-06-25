import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from 'src/app/services/api.service';
import {SocialAuthService} from "@abacritt/angularx-social-login";
import {PopupService} from "../../../services/popup.service";
import {SessionStorageService} from "../../../services/session-storage.service";
import { AuthGuardService } from 'src/app/services/authGuard.service';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  hasActiveSubscription:boolean;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private authService: SocialAuthService,
    private popupService: PopupService,
    private sessionStorageService: SessionStorageService,
    private authGuardService: AuthGuardService,
    private subscriptionService:SubscriptionService
  ) {
  }

  ngOnInit() {
  }

  get isSignInButtonVisible(): boolean {
    return !this.authGuardService.isLoggedIn("userID");
  }

  get getRole(): any {
    return this.authGuardService.getRole();
  }

  logout() {
    // Call the logout API on the server
    this.apiService.get('users/logout').subscribe(
      () => {
        this.sessionStorageService.removeItem('userID');
        this.sessionStorageService.removeItem('role');
        this.signOut();
        this.popupService.successPopup("We Will Miss you")
        this.router.navigate(['user/home'])
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

  hasSubscription() {
    this.subscriptionService.HasActiveSubscription().subscribe(data => {
      this.hasActiveSubscription = data.payload as boolean;
      console.log(this.hasActiveSubscription)
      if(this.hasActiveSubscription){
        //redirect to add
        this.router.navigate(['user/property/add']);
      } else {
        //redirect to packages
        this.router.navigate(['user/packages']);
      }

    });
  }
}
