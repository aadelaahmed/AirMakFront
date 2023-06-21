import { Injectable } from '@angular/core';
import { APIResponse } from '../models/api-response.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }
  get(url:string){
   return this._http.get<APIResponse>(`https://localhost:8097/packages`);
  }
  post(url:string,body:any){
    return this._http.post<APIResponse>(`https://api.mohamed-sadek.com/${url}`,body);
  }

  delete(url:string){
    return this._http.delete<APIResponse>(`https://api.mohamed-sadek.com/${url}`);
   }
}
