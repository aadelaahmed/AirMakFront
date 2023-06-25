import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from './session-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private sessionStorage: SessionStorageService,
  ) {}

  isLoggedIn(key: string): boolean {
    return this.sessionStorage.getItem(key) !== null;
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  setLoggedIn(value: boolean) {
    this.isLoggedInSubject.next(value);
  }

  getRole(): any {
    return this.sessionStorage.getItem('role');
  }
}
