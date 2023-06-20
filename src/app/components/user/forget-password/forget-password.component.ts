import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {ForgetPasswordDto} from "../../../dtos/users/forget-password-dto.model";

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
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
    });
  }

  updatePasswordButton() {
    if (this.forgetPasswordForm.valid) {
      const formValue = this.forgetPasswordForm.value;
      const email: ForgetPasswordDto = new ForgetPasswordDto(formValue.email);
      this.userService.forgetPassword(email).subscribe(
        {
          next: response => {
            console.log("Forget Password", response);
            // this.router.navigate(['/home'])
          },
          error: err => {
            console.log("Error when forget password", err);
          }
        }
      )
    }
  }
}
