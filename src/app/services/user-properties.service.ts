import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Property} from "../interface/property";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserPropertiesService {

  headers = new HttpHeaders({'Content-Type':'application/json'});
  baseUrl:string = "http://localhost:8080/properties/user";
  constructor(private httpClient: HttpClient) { }


  getPropertiesByUserId(userId: number): Observable<Property[]> {
    return this.httpClient.get<Property[]>(this.baseUrl + `/${userId}`, {
      headers: this.headers,
      withCredentials: true
    }).pipe(
      map((properties: Property[]) => {
        console.log("Properties of User with id: " + userId);
        console.log("Properties: " + properties);
        return properties;
      })
    );
  }
}
