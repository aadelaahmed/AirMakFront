import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {Router} from "@angular/router";
import {ForgetPasswordDto} from "../../../dtos/users/forget-password-dto.model";
import {PopupService} from "../../../services/popup.service";
import {HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  forgetPasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private popupService: PopupService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.forgetPasswordForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
    });
  }

  sendEmailButton() {
    if (this.forgetPasswordForm.valid) {
      const formValue = this.forgetPasswordForm.value;
      const email: ForgetPasswordDto = new ForgetPasswordDto(formValue.email);

      this.apiService.post("users/forgot-password", email).subscribe(
        {
          next: response => {
            console.log(response.payload)
            this.popupService.successPopup("Success To Sent Email");
            // this.router.navigate(['/home'])
          },
          error: error => {
            if (error.status === 400) {
              this.popupService.errorPopup("Validation failed");
            } else if (error.status === 404) {
              this.popupService.errorPopup("Email not found");
            } else {
              this.popupService.errorPopup("Failed to send email");
            }
          }
        }
      )
    }
  }
}
