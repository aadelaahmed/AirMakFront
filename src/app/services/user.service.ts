import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginDTO} from "../dtos/users/login-dto.model";
import {Observable} from "rxjs";
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {ForgetPasswordDto} from "../dtos/users/forget-password-dto.model";
import {ResetPassword} from "../dtos/users/reset-password.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) {
  }

  login(loginDto: LoginDTO): Observable<any> {
    return this._http.post("http://localhost:8080/users/login", loginDto);
  }

  forgetPassword(forgetPasswordDto: ForgetPasswordDto): Observable<any> {
    return this._http.post("http://localhost:8080/users/forgot-password", forgetPasswordDto);
  }

  verifyToken(token: string): Observable<any> {
    return this._http.get(`http://localhost:8080/users/reset-password?token=${token}`);
  }

  resetPassword(resetPassword: ResetPassword): Observable<any> {
    return this._http.post("http://localhost:8080/users/reset-password", resetPassword);
  }

  loginGoogle(): Observable<any> {
    return this._http.get("http://localhost:8080/users/google")
  }

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
}
