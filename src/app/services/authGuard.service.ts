import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {SessionStorageService} from "./session-storage.service";
import {ApiService} from "./api.service";
import {LoginDTO} from "../dtos/users/login-dto.model";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(
    private router: Router,
    private sessionStorage: SessionStorageService,
  ) {
  }

  isLoggedIn(key: string): boolean {
    return this.sessionStorage.getItem(key) !== null;
  }

  logoutAndNavigateToLogin(): void {
    this.sessionStorage.clearAllItems();
    this.router.navigate(['user/login']);
  }

}