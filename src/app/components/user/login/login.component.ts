import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginDTO} from "../../../dtos/users/login-dto.model";
import {ApiService} from "../../../services/api.service";
import {Router} from "@angular/router";
import {PopupService} from "../../../services/popup.service";
import {HttpHeaders} from "@angular/common/http";
import {SharedService} from "../../../services/shared.service";
import {NavbarService} from "../../../services/navbar.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isUserLoggedIn: boolean;
  title = 'loginGoogle';
  auth2: any;
  @ViewChild('loginRef', {static: true}) loginElement!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private popupService: PopupService,
    private navbarService: NavbarService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
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



  signInButton() {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      const user: LoginDTO = new LoginDTO(formValue.email, formValue.password);
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      this.apiService.post("users/login", user, {headers, withCredentials: true}).subscribe(
        {
          next: response => {
            this.navbarService.setLoggedIn(true);
            console.log(response.payload.firstName)
            this.popupService.successPopup("Welcome, " + response.payload.firstName);
            this.router.navigate(['/home']);
          },
          error: err => {
            this.popupService.errorPopup(err.payload);
          }
        }
      )
    }
  }


  // signInUsingGoogleButton() {
  //   const provider = new GoogleAuthProvider();
  //   provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  //   const auth = getAuth();
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;
  //       const user = result.user;
  //
  //     }).catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     const email = error.customData.email;
  //     const credential = GoogleAuthProvider.credentialFromError(error);
  //     // ...
  //   });
  // }


  // callGoogleLoginButton() {
  //   this.auth2.attachClickHandler(this.loginElement.nativeElement, {}, (googleAuthUser: any) => {
  //     let profile = googleAuthUser.getBasicProfile();
  //     console.log('Token || ' + googleAuthUser.getAuthResponse().id_token);
  //     console.log('ID: ' + profile.getId());
  //     console.log('Name: ' + profile.getName());
  //     console.log('Image URL: ' + profile.getImageUrl());
  //     console.log('Email: ' + profile.getEmail());
  //   }, (error: any) => {
  //     alert(JSON.stringify(error, undefined, 2));
  //   });
  // }
  //
  // googleAuthSDK() {
  //
  //   (<any>window)['googleSDKLoaded'] = () => {
  //     (<any>window)['gapi'].load('auth2', () => {
  //       this.auth2 = (<any>window)['gapi'].auth2.init({
  //         client_id: '248555964328-9ch256vbo4bc3fdcheqf6iiqt7pe88na.apps.googleusercontent.com',
  //         cookiepolicy: 'single_host_origin',
  //         scope: 'profile email'
  //       });
  //       this.callGoogleLoginButton();
  //     });
  //   }
  //
  //   (function (d, s, id) {
  //     var js, fjs = d.getElementsByTagName(s)[0];
  //     if (d.getElementById(id)) {
  //       return;
  //     }
  //     js = d.createElement('script');
  //     js.id = id;
  //     js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
  //     fjs?.parentNode?.insertBefore(js, fjs);
  //   }(document, 'script', 'google-jssdk'));
  // }

}
