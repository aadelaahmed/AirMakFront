import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../../../services/api.service";
import {HttpHeaders} from "@angular/common/http";
import {EditProfileDto} from "../../../dtos/users/edit-profile-dto.model";
import {PopupService} from "../../../services/popup.service";
import {AbstractControl, FormBuilder, ValidatorFn, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  editProfileForm: any;
  profileDate: any;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private popupService: PopupService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.apiService.get("users/profile/view-profile", {headers, withCredentials: true}).subscribe({
      next: response => {
        console.log(response.payload)
        this.profileDate = response.payload;
      },
      error: error => {
        console.log(error)
      }
    })

    this.editProfileForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      birthdate: ['', [Validators.required, this.userService.minimumAgeValidator(15)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^01[012564][0-9]{8}$/)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^\S+@\S+\.\S+$/)]]
    });
  }

  updateProfileButton() {
    const formValue = this.editProfileForm.value;
    console.log(formValue)
    const user: EditProfileDto = new EditProfileDto(
      formValue.firstName || this.profileDate.firstName,
      formValue.lastName || this.profileDate.lastName,
      formValue.birthdate || this.profileDate.birthdate,
      formValue.phoneNumber || this.profileDate.phoneNumber,
      formValue.email || this.profileDate.email
    );
    console.log(user)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.apiService.put("users/profile/edit-profile", user, {headers, withCredentials: true}).subscribe({
      next: response => {
        this.popupService.successPopup("Done");
        this.router.navigate(['/profile/view-profile']);
      },
      error: err => {
        this.popupService.errorPopup("Failed Update Your Profile");
        console.log(err)
      }
    })
  }


}
