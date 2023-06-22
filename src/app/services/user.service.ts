import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginDTO} from "../dtos/users/login-dto.model";
import {Observable} from "rxjs";
import {AbstractControl, ValidatorFn} from "@angular/forms";
import {ForgetPasswordDto} from "../dtos/users/forget-password-dto.model";
import {ResetPassword} from "../dtos/users/reset-password.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/users';

  constructor(private _http: HttpClient) {
  }

  login(loginDto: LoginDTO): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this._http.post(`${this.baseUrl}/login`, loginDto,{headers, withCredentials: true});
  }

  forgetPassword(forgetPasswordDto: ForgetPasswordDto): Observable<any> {
    return this._http.post(`${this.baseUrl}/forgot-password`, forgetPasswordDto);
  }

  verifyToken(token: string): Observable<any> {
    return this._http.get(`${this.baseUrl}/reset-password?token=${token}`);
  }

  verifyConfirmationCode(confirmationCode: string): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'text/plain'});
    return this._http.post(`${this.baseUrl}/confirmation-code`, confirmationCode, {headers, withCredentials: true});
  }

  resetPassword(resetPassword: ResetPassword): Observable<any> {
    return this._http.post(`${this.baseUrl}/reset-password`, resetPassword);
  }

  loginGoogle(): Observable<any> {
    return this._http.get(`${this.baseUrl}/google`);
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
