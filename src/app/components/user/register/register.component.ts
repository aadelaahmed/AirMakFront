import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl} from '@angular/forms';
import {PopupService} from "../../../services/popup.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private http: HttpClient,
    private router: Router,
    private popupService: PopupService,
    private formBuilder: FormBuilder
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
      confirmPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=])[A-Za-z\d@#$%^&+=]+$/
        )]],
    });
  }

  registerUser(event: Event) {
    event.preventDefault();

    if (this.registerForm.invalid) {
      // Display validation errors and prevent form submission
      this.markFormGroupTouched(this.registerForm);
      return;
    }

    const requestRegistrationDTO = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      birthdate: this.registerForm.value.birthdate,
      phoneNumber: this.registerForm.value.phoneNumber,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };

    console.log('UserDTO:', requestRegistrationDTO);

    this.http.post('http://localhost:8080/users/register', requestRegistrationDTO).subscribe(
      (response: any) => {
        console.log('User registered successfully', response);
        this.popupService.successPopup("User registered successfully")
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error Occurred While Registering User', error);
        this.popupService.errorPopup("Error Occurred While Registering User")
      }
    );
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
          return {minimumAge: true};
        }
      }

      return null;
    };
  }
}
