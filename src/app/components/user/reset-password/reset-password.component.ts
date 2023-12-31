import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ResetPassword} from "../../../dtos/users/reset-password.model";
import {PopupService} from "../../../services/popup.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  forgetPasswordForm: FormGroup;
  token: string;
  isButtonDisabled: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private popupService: PopupService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log(this.token)
      // this.token = this.route.queryParams['token']
      console.log(",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, ", this.route.queryParams['token'])
    })
    this.forgetPasswordForm = this.formBuilder.group({
      newPassword: [null, [Validators.required, Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@#$%^&+=])[A-Za-z\\d@#$%^&+=]+$"), Validators.minLength(8), Validators.maxLength(30)]],
      confirmNewPassword: [null, [Validators.required]]
    }, {
      validators: this.userService.match('newPassword', 'confirmNewPassword')
    });
  }

  private async verifyToken(token: string): Promise<boolean> {
    try {
      await this.apiService.verifyToken(token).toPromise();
      return true;
    } catch (error) {
      return false;
    }
  }

  private resetPassword(event: Event) {
    event.preventDefault();
    if (!this.verifyToken(this.token)) {
      return;
    }
    if (this.forgetPasswordForm.valid) {
      const formValue = this.forgetPasswordForm.value;
      const resetPassword: ResetPassword = new ResetPassword(formValue.newPassword, formValue.confirmNewPassword, this.token);

      this.apiService.post("users/reset-password", resetPassword).subscribe({
        next: (response) => {
          this.popupService.successPopup(response.payload);
          this.isButtonDisabled = true; // Disable the button
          this.router.navigate(["/login"]);
        },
        error: (error) => {
          this.popupService.errorPopup(error.payload)
        },
        complete: () => {
          this.isButtonDisabled = false;
        }
      });
    }
  }

  updatePasswordButton(event: Event) {
    this.resetPassword(event);
  }
}
