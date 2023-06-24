import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import { AuthGuardService } from '../services/authGuard.service';

export const authGuard: CanActivateFn = (route, state) => {
  const currentUser = inject(AuthGuardService);
  const router = inject(Router);

  if (!currentUser.isLoggedIn("userID")) {
    console.log("GUARDDDDDDDDDDD ", currentUser.isLoggedIn("userID"))
    router.navigate(['user/login'])
    return false;
  }

  return true;
};
