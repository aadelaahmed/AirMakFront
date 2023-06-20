import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginDTO} from "../../../dtos/users/login-dto.model";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {PopupService} from "../../../services/popup.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService,
    private popupService: PopupService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [null, Validators.required]
    });
  }

  signInButton() {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      const user: LoginDTO = new LoginDTO(formValue.email, formValue.password);
      this.userService.login(user).subscribe(
        {
          next: response => {
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
}
