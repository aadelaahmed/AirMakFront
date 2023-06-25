import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../../../services/api.service";
import {SocialAuthService} from "@abacritt/angularx-social-login";
import {PopupService} from "../../../services/popup.service";
import {SessionStorageService} from "../../../services/session-storage.service";
import {AuthGuardService} from "../../../services/authGuard.service";
import {SubscriptionService} from "../../../services/subscription.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(
    private authGuardService: AuthGuardService,
  ) {
  }
  get isSignInButtonVisible(): boolean {
    return !this.authGuardService.isLoggedIn("userID");
  }

  get getRole(): any {
    return this.authGuardService.getRole();
  }
}
