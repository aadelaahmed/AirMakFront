import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Response } from "../interface/response";
import { Injectable } from "@angular/core";
import { SessionStorageService } from "./session-storage.service";


@Injectable({
    providedIn: 'root'
  })
export class SubscriptionService{
    constructor(private http: HttpClient, private sessionStorage:SessionStorageService){

    }

    HasActiveSubscription() : Observable<Response<any>> {
      const id = this.sessionStorage.getItem("userID");
      console.log("payment user id : " + id);
        const url = "http://localhost:8080/subscriptions?userId="+id;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
          });
        return this.http.get<Response<any>>(url, {headers, withCredentials: true});
    }
}