import { Injectable } from '@angular/core';
import { APIResponse } from '../models/api-response.model';
import { HttpClient } from '@angular/common/http';
import { createPackage } from '../models/postPackage.model';

@Injectable({
  providedIn: 'root'
})
export class PendingService {

  constructor(private _http: HttpClient) { }
  get() {
    return this._http.get<APIResponse>("http://localhost:8097/properties/pending");
  }
 
  

  

  update(id: number) {
    return this._http.put<APIResponse>('http://localhost:8097/properties/publish/'+id , id);
  }
  

}
