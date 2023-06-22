import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Property} from "../interface/property";

@Injectable({
  providedIn: 'root'
})
export class AddPropertyService {
  headers = new HttpHeaders({'Content-Type':'application/json'});
  baseUrl:string = "http://localhost:8080/properties";
  constructor(private httpClient: HttpClient) { }
  addProperty(property: Property) {
    this.httpClient.post(this.baseUrl, property,{headers:this.headers,withCredentials:true}).subscribe(
      () => {
        // Success handler
        console.log('Property added successfully');
        // TODO: Navigate the user to the properties list
      },
      (error) => {
        // Error handler
        console.error('Error adding property:', error);
      }
    );
  }

}
