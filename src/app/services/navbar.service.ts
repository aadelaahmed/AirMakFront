import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

 _loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor() {
  }

}
