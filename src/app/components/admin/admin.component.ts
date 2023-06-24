import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiService} from "../../services/api.service";
import {PopupService} from "../../services/popup.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  registerForm: FormGroup;
  emailExists: boolean = false;
  isButtonDisabled: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private apiService: ApiService,
    private popupService: PopupService
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      birthdate: ['', [Validators.required, this.minimumAgeValidator(15)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^01[012564][0-9]{8}$/)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^\S+@\S+\.\S+$/)]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=])[A-Za-z\d@#$%^&+=]+$/
        )]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.registerForm.get('email').valueChanges.subscribe(() => {
      this.emailExists = false; // Reset the emailExists flag when the email value changes
    });
  }

  checkEmailExists() {
    const email = this.registerForm.get('email').value;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.get<boolean>('http://localhost:8080/users/check-email/' + email, { headers, withCredentials: true })
      .subscribe(
        (exists) => {
          this.emailExists = exists;
          console.log(this.emailExists);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  registerUser(event: Event) {
    event.preventDefault();

    if (this.registerForm.invalid || this.emailExists) {
      // Display validation errors and prevent form submission
      this.markFormGroupTouched(this.registerForm);
      return;
    }

    this.isButtonDisabled = true; // Disable the button

    const requestRegistrationDTO = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      birthdate: this.registerForm.value.birthdate,
      phoneNumber: this.registerForm.value.phoneNumber,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };

    console.log('UserDTO:', requestRegistrationDTO);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.apiService.post('admin/add-admin', requestRegistrationDTO).subscribe({
      next: response => {
        console.log('User registered successfully', response);
        this.popupService.successPopup('User registered successfully');
        this.router.navigate(['/admin/dashboard']);
      },
      error: error => {
        console.error('Error Occurred While Registering User', error);
        this.popupService.errorPopup('Error Occurred While Registering User');
      },
      complete: () => {
        this.isButtonDisabled = false; // Re-enable the button after API call completes
      }
    });
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  minimumAgeValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value) {
        const today = new Date();
        const minAgeDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
        const birthdate = new Date(control.value);
        if (birthdate > minAgeDate) {
          return { minimumAge: true };
        }
      }
      return null;
    };
  }
}
