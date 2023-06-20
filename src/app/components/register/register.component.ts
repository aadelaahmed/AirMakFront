import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

import { PopupMessageComponent } from '../shared/popup-message-component/popup-message-component.component';

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
    private dialog: MatDialog,
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

        const dialogRef: MatDialogRef<PopupMessageComponent> = this.dialog.open(PopupMessageComponent, {
          width: '400px',
          data: {
            message: 'User Registered Successfully',
            borderColor: '#e14d67',
            borderSize: '2px'
          }
        });

        dialogRef.afterClosed().subscribe(() => {
          this.router.navigate(['/home']);
        });
      },
      (error) => {
        console.error('Error Occurred While Registering User', error);

        const dialogRef: MatDialogRef<PopupMessageComponent> = this.dialog.open(PopupMessageComponent, {
          width: '520px',
          data: {
            message: 'Error Occurred While Registering User',
            borderColor: '#e14d67',
            borderSize: '2px'
          }
        });

        dialogRef.afterClosed().subscribe(() => {
          // Handle the error, display an error message, etc.
        });
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
          return { minimumAge: true };
        }
      }

      return null;
    };
  }
}
