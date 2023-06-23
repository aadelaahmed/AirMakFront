import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Response } from "../interface/response";
import { Packages } from "../interface/packages";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class PackageService { 
    constructor(private http:HttpClient){
    }

    public getPackages(): Observable<Response<any>> {
        const url = "http://127.0.0.1:8080/packages";
        return this.http.get<Response<any>>(url);
    }
}