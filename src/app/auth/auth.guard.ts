import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthGuardService} from '../services/authGuard.service';
import {Observable, map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
  constructor(private authService: AuthGuardService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isLoggedIn$.pipe(
      map((isLoggedIn: boolean) => {
        // if (!isLoggedIn) {
        //   console.log("GUARDDDDDDDDDDD ", isLoggedIn);
        //   this.router.navigate(['/login']);
        //   return false;
        // }

        const allowedUserRoutes = [
          '/user/home',
          '/user/properties',
          '/user/profile',
          '/user/profile/view-profile',
          '/user/profile/edit-profile',
          '/user/profile/update-password',
          '/user/payment',
          '/user/confirmation',
          '/user/packages',
          /^\/user\/property\/details\/\d+$/,
          /^\/user\/property\/edit\/\d+$/
        ];

        const allowedAdminRoutes = [
          '/admin/dashboard',
          '/admin/add-admin',
          '/admin/create-package',
          '/admin/package/details/:id',
          '/admin/pending',
          '/user/property/details',
          /^\/user\/property\/details\/\d+$/
        ];

        const allowedNotAdminOrUserRoutes = [
          '/user/home',
          '/login',
          '/user/register',
          '/user/property/discovery',
          '/user/packages',
          '/user/forget-password',
        ];

        const currentRoute = state.url;
        const userRole = this.authService.getRole();
        console.log('userRole in auth is: ', userRole);

        if (userRole === 'USER' && !allowedUserRoutes.includes(currentRoute)) {
          this.router.navigate(['/unauthorized']); // Redirect to an unauthorized page or show an error message
          return false;
        }

        if (userRole === 'ADMIN' && !allowedAdminRoutes.includes(currentRoute)) {
          this.router.navigate(['/unauthorized']); // Redirect to an unauthorized page or show an error message
          return false;
        }

        if (!isLoggedIn && !userRole && !allowedNotAdminOrUserRoutes.includes(currentRoute)) {
          this.router.navigate(['/unauthorized']); // Redirect to an unauthorized page or show an error message
          return false;
        }

        return true;
      })
    );
  }
}
