import {Injectable} from '@angular/core';
import {APIResponse} from '../models/api-response.model';
import {HttpClient} from '@angular/common/http';
import {createPackage} from '../models/postPackage.model';
import { Response } from '../interface/response';
import { Observable } from 'rxjs';
import { ChargeDetails } from '../interface/payments/chargeDetails';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private _http: HttpClient) {
  }

  get() {
    return this._http.get<APIResponse>("http://localhost:8080/packages");
  }

  getCountOfSubscriptionsForPackage() {
    return this._http.get<APIResponse>("http://localhost:8080/packages/packagesSubscriptions");
  }

  post(pack: createPackage) {
    console.log(pack)
    return this._http.post<APIResponse>("http://localhost:8080/packages", pack);
  }

  delete(id: number) {
    return this._http.delete<APIResponse>('http://localhost:8080/packages/' + id);
  }

  update(pakcgaeId: string, price: string) {
    return this._http.put<APIResponse>('http://localhost:8080/packages/' + pakcgaeId + '?price=' + price, price);
  }

  getPackagesCount() {
    return this._http.get<APIResponse>("http://localhost:8080/packages/count");
  }

  getBestPackage() {
    return this._http.get<APIResponse>("http://localhost:8080/packages/bestPackage");
  }

  public getPackages(): Observable<Response<any>> {
    const url = "http://127.0.0.1:8080/packages";
    return this._http.get<Response<any>>(url);
}
}
