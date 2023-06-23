import {Injectable} from '@angular/core';
import {AbstractControl, ValidatorFn} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({matching: true});
        return {matching: true};
      } else {
        return null;
      }
    };
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

  constructor() {
  }
}
