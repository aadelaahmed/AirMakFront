import { HttpClient } from '@angular/common/http';
import { Response } from 'src/app/interface/response';
import { PaymentRequest } from '../interface/payments/PaymentRequest';
import { Injectable } from '@angular/core';
import { ChargeDetails } from '../interface/payments/chargeDetails';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) {
  }

  public subscribeOnPackage(paymentRequest: PaymentRequest): Observable<Response<ChargeDetails>> {
    const url = 'http://127.0.0.1:8080/subscriptions/stripe';
    return this.http.post<Response<ChargeDetails>>(url, paymentRequest);
  }



  public refund(charge_id: string): Observable<Response<any>> {
    const url = `http://127.0.0.1:8080/subscriptions/${charge_id}/stripe/refund`;
    return this.http.post<Response<any>>(url, null);
  }
}