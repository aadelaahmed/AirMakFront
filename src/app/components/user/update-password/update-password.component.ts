import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {PopupService} from "../../../services/popup.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {ResetPassword} from "../../../dtos/users/reset-password.model";
import {HttpHeaders} from "@angular/common/http";
import {UpdatePassword} from "../../../dtos/users/update-password.model";

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  updatePasswordForm: FormGroup;

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
    this.updatePasswordForm = this.formBuilder.group({
      oldPassword: [null, [Validators.required, Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@#$%^&+=])[A-Za-z\\d@#$%^&+=]+$"), Validators.minLength(8), Validators.maxLength(30)]],
      newPassword: [null, [Validators.required, Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@#$%^&+=])[A-Za-z\\d@#$%^&+=]+$"), Validators.minLength(8), Validators.maxLength(30)]],
      confirmPassword: [null, [Validators.required]]
    }, {
      validators: this.userService.match('newPassword', 'confirmPassword')
    });
  }

  private resetPassword() {
    if (this.updatePasswordForm.valid) {
      const formValue = this.updatePasswordForm.value;
      const updatePassword: UpdatePassword = new UpdatePassword(formValue.oldPassword, formValue.newPassword, formValue.confirmPassword);
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      this.apiService.put("users/profile/update-password", updatePassword, {
        headers,
        withCredentials: true
      }).subscribe({
        next: (response) => {
          this.popupService.successPopup("Updated Password");
          this.router.navigate(["/profile/view-profile"]);
        },
        error: (error) => {
          this.popupService.errorPopup("Failed Update Password");
        },
      });
    }
  }

  updatePasswordButton() {
    this.resetPassword();
  }
}
