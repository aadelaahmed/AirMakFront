import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Property} from "../interface/property";
import {Response} from "../interface/response";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {UpdatePropertyDTO} from "../interface/update-property";
import {LoadingBarService} from "./loading-bar.service";
import {Router} from "@angular/router";
import {SuccessPopupService} from "./success-popup.service";
@Injectable({
  providedIn: 'root'
})
export class EditPropertyService {
  headers = new HttpHeaders({'Content-Type':'application/json'});
  baseUrl:string = "http://localhost:8080/properties";
  constructor(private successPopUpMenu:SuccessPopupService,private router: Router, private httpClient: HttpClient) { }
  editProperty(updatedProperty:UpdatePropertyDTO){
    this.httpClient.put(this.baseUrl, updatedProperty,{headers:this.headers,withCredentials:true}).subscribe(
      () => {
        // Success handler
        console.log('Property added successfully');
        this.successPopUpMenu.showSuccessPopupMenu("Your property was updated successfully..");
        LoadingBarService.isLoading= false;
        // TODO: Navigate the user to the properties list
        this.router.navigate(['user/properties']);
      },
      (error) => {
        // Error handler
        LoadingBarService.isLoading= false;
        console.error('Error adding property:', error);
      }
    );
  }
  getPropertyById(id: number): Observable<Property> {
    return this.httpClient.get<Response<Property>>(`${this.baseUrl}/${id}`,{headers:this.headers,withCredentials:true}).pipe(
      map(response => response.payload)
    );
  }
}
