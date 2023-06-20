import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {LoginDTO} from "../../../dtos/login-dto.model";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  forgetPasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.forgetPasswordForm = this.formBuilder.group({
      newPassword: [null, [Validators.required, Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@#$%^&+=])[A-Za-z\\d@#$%^&+=]+$"), Validators.minLength(8), Validators.maxLength(30)]],
      confirmNewPassword: [null, [Validators.required]]
    }, {
      validators: this.userService.match('newPassword', 'confirmNewPassword')
    });
  }

  updatePasswordButton() {
    if (this.forgetPasswordForm.valid) {
      const formValue = this.forgetPasswordForm.value;
      const user: LoginDTO = new LoginDTO(formValue.email, formValue.password);
      this.userService.login(user).subscribe(
        {
          next: response => {
            console.log("User is login", response);
            this.router.navigate(['/home'])
          },
          error: err => {
            console.log("Error when login", err);
          }
        }
      )
    }
  }
}
