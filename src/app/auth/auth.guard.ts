import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import { AuthGuardService } from '../services/authGuard.service';

export const authGuard: CanActivateFn = (route, state) => {
  const currentUser = inject(AuthGuardService);
  const router = inject(Router);

  if (!currentUser.isLoggedIn("userID")) {
    console.log("GUARDDDDDDDDDDD ", currentUser.isLoggedIn("userID"));
    router.navigate(['user/login']);
    return false;
  }

  const allowedUserRoutes = [
    'user/home',
    'user/properties',
    'user/profile',
    'user/profile/view-profile',
    'user/profile/edit-profile',
    'user/profile/update-password',
    'user/payment',
    'user/confirmation',
    'user/packages'
  ];

  const allowedAdminRoutes = [
    'admin/dashboard',
    'admin/add-admin',
    'admin/create-package',
    'admin/package/details/:id',
    'admin/pending'
  ];

  const currentRoute = state.url;
  const userRole = currentUser.getRole();

  if (userRole === 'USER' && !allowedUserRoutes.includes(currentRoute)) {
    router.navigate(['unauthorized']); // Redirect to an unauthorized page or show an error message
    return false;
  }

  if (userRole === 'ADMIN' && !allowedAdminRoutes.includes(currentRoute)) {
    router.navigate(['unauthorized']); // Redirect to an unauthorized page or show an error message
    return false;
  }

  return true;
};

