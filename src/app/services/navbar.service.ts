import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private _loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  isLoggedIn(): Observable<boolean> {
    return this._loggedIn.asObservable();
  }

  setLoggedIn(value: boolean): void {
    this._loggedIn.next(value);
  }
}
