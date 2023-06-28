import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../services/api.service";
import {PopupService} from "../../../services/popup.service";
import {Router} from "@angular/router";
import {HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-confirmation-code',
  templateUrl: './confirmation-code.component.html',
  styleUrls: ['./confirmation-code.component.css']
})
export class ConfirmationCodeComponent implements OnInit {
  confirmEmailForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private popupService: PopupService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.confirmEmailForm = this.formBuilder.group({
      code: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(15)]]
    });
  }

  sendEmailButton() {
    if (this.confirmEmailForm.valid) {
      const formValue = this.confirmEmailForm.value;
      this.apiService.postTextPlain("users/confirmation-code", formValue.code.trim()).subscribe(
        {
          next: response => {
            console.log(response.payload)
            this.popupService.successPopup("Success Confirm Code")
            this.router.navigate(['/user/home'])
          },
          error: error => {
            if (error.status === 500) {
              this.popupService.errorPopup("Error occurred while updating the verification status");
            } else if (error.status === 401) {
              this.popupService.errorPopup("Invalid code");
            } else {
              this.popupService.errorPopup("Failed to verify code");
            }
          }
        }
      )
    }
  }
}
