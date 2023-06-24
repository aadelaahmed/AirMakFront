import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8080';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private _http: HttpClient) {
  }

  getAll(url: string): Observable<any> {
    return this._http.get<any[]>(`${this.baseUrl}/${url}`)
  }

  getById(url: string, id: number): Observable<any> {
    return this._http.get<any>(`${this.baseUrl}/${url}/${id}`)
  }

  get(url: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._http.get<any>(`${this.baseUrl}/${url}`, {headers, withCredentials: true})
  }

  post(url: string, body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._http.post<any>(`${this.baseUrl}/${url}`, body, {headers, withCredentials: true})
  }

  postTextPlain(url: string, body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain',
    });
    return this._http.post<any>(`${this.baseUrl}/${url}`, body, {headers, withCredentials: true})
  }

  put(url: string, body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this._http.put<any>(`${this.baseUrl}/${url}`, body, {headers, withCredentials: true})
  }

  delete(url: string, id: number): Observable<any> {
    return this._http.delete<any>(`${this.baseUrl}/${url}/${id}`)
  }

  verifyToken(token: string): Observable<any> {
    return this._http.get(`${this.baseUrl}/reset-password?token=${token}`);
  }
}
