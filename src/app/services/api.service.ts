import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AbstractControl, ValidatorFn} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8080';

  constructor(private _http: HttpClient) {
  }

  getAll(url: string) : Observable<any> {
    return this._http.get<any[]>(`${this.baseUrl}/${url}`)
  }

  getById(url: string, id: number) : Observable<any> {
    return this._http.get<any>(`${this.baseUrl}/${url}/${id}`)
  }

  get(url: string, headers: any) : Observable<any>{
    return this._http.get<any>(`${this.baseUrl}/${url}`, headers)
  }

  post(url: string, body: any, headers: any) : Observable<any>{
    return this._http.post<any>(`${this.baseUrl}/${url}`, body, headers)
  }

  put(url: string, body: any, headers: any) : Observable<any> {
    return this._http.put<any>(`${this.baseUrl}/${url}`, body, headers)
  }

  delete(url: string, id: number) : Observable<any> {
    return this._http.delete<any>(`${this.baseUrl}/${url}/${id}`)
  }

  verifyToken(token: string): Observable<any> {
    return this._http.get(`${this.baseUrl}/reset-password?token=${token}`);
  }
}
