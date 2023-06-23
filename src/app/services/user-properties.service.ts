import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Property} from "../interface/property";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import Swal from "sweetalert2";
import {LoadingBarService} from "./loading-bar.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserPropertiesService {

  headers = new HttpHeaders({'Content-Type':'application/json'});
  baseUrl:string = "http://localhost:8080/properties/user";
  deleteUrl:string = "http://localhost:8080/properties";
  constructor(private httpClient: HttpClient,private router:Router) { }


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

  deleteProperty(propertyId: number) {
    LoadingBarService.isLoading= true;
    this.httpClient.delete(this.deleteUrl + `/${propertyId}`, {
      headers: this.headers,
      withCredentials: true
    }).subscribe(
      () => {
        // Success handler
        console.log('Property deleted successfully');
        location.reload();
        //this.successPopUpMenu.showSuccessPopupMenu('Your property will be reviewed before publishing.');
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        LoadingBarService.isLoading= false;
        //this.router.navigate(['user/properties']);
      },
      (error) => {
        // Error handler
        LoadingBarService.isLoading= false;
        console.error('Error adding property:', error);
      }
    );

  }
}
