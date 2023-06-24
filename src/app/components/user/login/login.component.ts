import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginDTO} from "../../../dtos/users/login-dto.model";
import {ApiService} from "../../../services/api.service";
import {Router} from "@angular/router";
import {PopupService} from "../../../services/popup.service";
import {HttpHeaders} from "@angular/common/http";
import {NavbarService} from "../../../services/navbar.service";
import { SessionStorageService } from '../../../services/session-storage.service';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser
} from "@abacritt/angularx-social-login";
import {TokenDto} from "../../../dtos/users/token-dto.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: SocialUser;
  loggedIn: boolean;
  private accessToken = '';
  isUserLoggedIn: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private popupService: PopupService,
    private navbarService: NavbarService,
    private router: Router,
    private authService: SocialAuthService,
    private sessionStorageService: SessionStorageService
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [null, Validators.required]
    });

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if (this.loggedIn) {
        this.handleGoogleLogin(user.idToken);
      }
      console.log("user -->> ", user);
    });

    this.navbarService.isLoggedIn().subscribe((isLoggedIn: boolean) => {
      this.isUserLoggedIn = isLoggedIn;
      if (this.isUserLoggedIn) {
        this.router.navigate(['home']);
      } else {
        this.loginForm = this.formBuilder.group({
          email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
          password: [null, Validators.required]
        });
      }
    });
  }


  handleGoogleLogin(idToken: string): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const token: TokenDto = new TokenDto(idToken);
    this.apiService.post("api/google", token, {headers, withCredentials: true}).subscribe({
      next: response => {
        this.navbarService.setLoggedIn(true);
        this.popupService.successPopup("Welcome, " + response.payload.firstName);
        this.router.navigate(['/home']);
      },
      error: err => {
        this.popupService.errorPopup("Must first register");
        this.router.navigate(['/register'])
      }
    });
  }

  signInButton() {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      const user: LoginDTO = new LoginDTO(formValue.email, formValue.password);
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
  
      // First API call to authenticate the user
      this.apiService.post("users/login", user, {headers, withCredentials: true}).subscribe(
        {
          next: response => {
            this.navbarService.setLoggedIn(true);
            console.log(response.payload.firstName)
            this.popupService.successPopup("Welcome, " + response.payload.firstName);
            this.sessionStorageService.setItem('accessToken', response.accessToken);
            this.sessionStorageService.setItem('userEmail', formValue.email);
  
            // Second API call to get the user ID
            this.apiService.get("users/getUserIdByEmail?email=" + formValue.email, { headers, withCredentials: true }).subscribe(
              (userIdResponse: any) => {
                const userId = userIdResponse;
                console.log('current userId= ',userId);
                this.sessionStorageService.setItem('userID', userId);
  
                this.router.navigate(['/home']);
              },
              (error: any) => {
                this.popupService.errorPopup("Error retrieving userID");
              }
            );
          },
          error: err => {
            this.popupService.errorPopup("Invalid email or password");
          }
        }
      );
    }
  }
  
}
