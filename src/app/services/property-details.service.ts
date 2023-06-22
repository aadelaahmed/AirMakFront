import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Property} from "../interface/property";
import {Response} from "../interface/response";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PropertyDetailsService {
  baseUrl : string = "";
  constructor( private httpClient: HttpClient) { }

  getPropertyById(id: number): Observable<Property> {
    return this.httpClient.get<Response<Property>>(`${this.baseUrl}/${id}`).pipe(
      map(response => response.payload)
    );
  }
}
