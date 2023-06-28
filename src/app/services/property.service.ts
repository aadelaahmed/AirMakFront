import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PropertyFilter } from "../interface/PropertyFilter";
import { Observable } from "rxjs";
import { Response } from "../interface/response";

@Injectable({
    providedIn: 'root'
})
export class PropertyService {

    constructor(private http: HttpClient) {
    }

    public filterProperties(propertyFilter: PropertyFilter, page: number): Observable<Response<any>> {
        const url = "http://127.0.0.1:8080/properties/filter?page=" + page;

        // Convert the complex object to query parameters
        let params = new HttpParams();
        for (const key in propertyFilter) {
            if (propertyFilter.hasOwnProperty(key)) {
                const value = JSON.stringify(propertyFilter[key]);
                params = params.append(key, value);
            }
        }

        return this.http.get<Response<any>>(url, {params, withCredentials: true});
    }


    public getProperties(page: number): Observable<Response<any>> {
        const url = "http://127.0.0.1:8080/properties";
        let params = new HttpParams().set('page', page);
        return this.http.get<Response<any>>(url, { params, withCredentials: true});
    }
}