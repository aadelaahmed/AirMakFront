import { Injectable } from '@angular/core';
import { APIResponse } from '../models/api-response.model';
import { HttpClient } from '@angular/common/http';
import { createPackage } from '../models/postPackage.model';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private _http:HttpClient) { }
  get(){
   return this._http.get<APIResponse>("http://localhost:8097/packages");
  }
  post(pack:createPackage){
    console.log(pack)
    return this._http.post<APIResponse>("http://localhost:8097/packages",pack);
  }

  delete(id:number){
    return this._http.delete<APIResponse>('http://localhost:8097/packages/'+id);
   }
}
