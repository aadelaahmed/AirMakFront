import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from 'src/app/interface/response';
import { PaymentRequest } from '../interface/payments/PaymentRequest';
import { Injectable } from '@angular/core';
import { ChargeDetails } from '../interface/payments/chargeDetails';
import { Observable } from 'rxjs';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient, private sessionStorage:SessionStorageService) {
  }

  public subscribeOnPackage(paymentRequest: PaymentRequest): Observable<Response<ChargeDetails>> {
    const url = 'http://127.0.0.1:8080/subscriptions/stripe';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const id = this.sessionStorage.getItem("userID");
    console.log("payment user id : " + id);
    paymentRequest.setUserID(id);

    return this.http.post<Response<ChargeDetails>>(url, paymentRequest, {headers, withCredentials: true});
  }



  public refund(): Observable<Response<any>> {
    const id = this.sessionStorage.getItem("userID");
    const url = `http://127.0.0.1:8080/subscriptions/${id}/stripe/refund`;
    return this.http.post<Response<any>>(url, null);
  }
}