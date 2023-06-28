import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { LoginDTO } from "../../../dtos/users/login-dto.model";
import { TokenDto } from "../../../dtos/users/token-dto.model";
import { ApiService } from "../../../services/api.service";
import { PopupService } from "../../../services/popup.service";
import { SessionStorageService } from '../../../services/session-storage.service';
import { Router } from "@angular/router";
import { AuthGuardService } from 'src/app/services/authGuard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  socialUser: SocialUser;
  isButtonDisabled: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private popupService: PopupService,
    private router: Router,
    private authService: SocialAuthService,
    private sessionStorageService: SessionStorageService,
    private authGuardService: AuthGuardService
  ) {
  }

  ngOnInit(): void {
    this.initLoginForm();
    this.initSocialAuthStateListener();
    this.initIsUserLoggedInListener();
  }

  private initLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [null, Validators.required]
    });
  }

  private initSocialAuthStateListener(): void {
    this.authService.authState.subscribe((user) => {
      this.socialUser = user;
      // this.loggedIn = (user != null);
      if (user != null) {
        this.handleSocialLoginResponse(user.idToken);
      }
      console.log("Social user -->> ", user);
    });
  }

  private initIsUserLoggedInListener(): void {
    if (this.authGuardService.isLoggedIn("userID")) {
      this.router.navigate(['/user/home']);
    } else {
      this.initLoginForm();
    }
  }

  private handleNavigationDependOnRole(email: string, role: string) {
    this.fetchUserID(email);
    if (role == 'ADMIN') {
      this.authGuardService.setLoggedIn(true);
      this.router.navigate(['/admin/dashboard'])
    } else {
      this.authGuardService.setLoggedIn(true);
      this.router.navigate(['/user/home'])
    }
  }

  private handleSocialLoginResponse(idToken: string): void {
    const token: TokenDto = new TokenDto(idToken);
    this.apiService.post("api/google", token).subscribe({
      next: response => {
        this.popupService.successPopup("Welcome, " + response.payload.firstName);
        this.sessionStorageService.setItem("role", response.payload.role);
        this.handleNavigationDependOnRole(response.payload.email, response.payload.role);
      },
      error: err => {
        this.popupService.errorPopup("Must first register");
        this.authService.signOut();
        this.router.navigate(['/user/register'])
      }
    });
  }

  public signInButton(event: Event) {
    event.preventDefault();

    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      const user: LoginDTO = new LoginDTO(formValue.email, formValue.password);

      this.apiService.post("users/login", user).subscribe({
        next: response => {
          this.sessionStorageService.setItem("role", response.payload.role);
          console.log(response.payload.role, "ROLE");
          this.popupService.successPopup("Welcome, " + response.payload.firstName);
          this.router.navigate(['/home'])

          // Second API call to get the user ID
          this.handleNavigationDependOnRole(response.payload.email, response.payload.role);

          this.isButtonDisabled = true; // Disable the button

        },
        error: err => {
          this.popupService.errorPopup("Invalid email or password");
        },
        complete: () => {
          this.isButtonDisabled = false; // Re-enable the button after API call completes
        }
      });
    }
  }

  private fetchUserID(email: string) {
    this.apiService.get("users/getUserIdByEmail?email=" + email).subscribe(
      (userIdResponse: any) => {
        console.log('Current user ID: ', userIdResponse);
        this.sessionStorageService.setItem('userID', userIdResponse);
        this.authGuardService.isLoggedIn("userID");
        console.log("status ------->>>> ", this.authGuardService.isLoggedIn("userID"))
        console.log("session id -> ", this.sessionStorageService.getItem("userID"))
      },
      (error: any) => {
        console.log(error)
      }
    );
  }

  get hideGoogleLogin(): boolean {
    return !this.authGuardService.isLoggedIn("userID");
  }
}
