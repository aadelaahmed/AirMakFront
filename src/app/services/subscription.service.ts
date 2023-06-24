import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Response } from "../interface/response";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
  })
export class SubscriptionService{
    constructor(private http: HttpClient){

    }

    HasActiveSubscription() : Observable<Response<any>> {
        const url = "http://localhost:8080/subscriptions"
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
          });
        return this.http.get<Response<any>>(url, {headers, withCredentials: true});
    }
}