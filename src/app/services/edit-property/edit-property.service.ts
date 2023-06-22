import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Property} from "../../interface/property";
import {Response} from "../../interface/response";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EditPropertyService {
  baseUrl : string = "";
  constructor( private httpClient: HttpClient) { }

  getPropertyById(id: number): Observable<Property> {
    return this.httpClient.get<Response<Property>>(`${this.baseUrl}/${id}`).pipe(
      map(response => response.payload)
      );
  }

  mapResponseToProperty(response: any): Property {
    const property = new Property();
    property.id = response.id;
    property.user = response.user;
    property.address = response.address;
    property.propertyType = response.propertyType;
    property.listingType = response.listingType;
    property.price = response.price;
    property.description = response.description;
    property.floorNo = response.floorNo;
    property.propertyNo = response.propertyNo;
    property.bedRoomCount = response.bedRoomCount;
    property.bathRoomCount = response.bathRoomCount;
    property.airCondition = response.airCondition;
    property.tv = response.tv;
    property.wifi = response.wifi;
    property.availability = response.availability;
    property.images = response.images;
    property.reviews = response.reviews;

    return property;
  }
}
