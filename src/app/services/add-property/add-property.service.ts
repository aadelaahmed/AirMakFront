import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Property} from "../../interface/property";

@Injectable({
  providedIn: 'root'
})
export class AddPropertyService {
  baseUrl:string = "";
  constructor( private httpClient: HttpClient) { }
  addProperty(property:Property){
    this.httpClient.post(this.baseUrl,property);
    //TODO : if the property is added successfully,
    // , then send user to its properties list.
  }
}
