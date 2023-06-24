import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {LoginComponent} from "./components/user/login/login.component";
import {RegisterComponent} from "./components/user/register/register.component";
import {ForgetPasswordComponent} from "./components/user/forget-password/forget-password.component";
import {ResetPasswordComponent} from "./components/user/reset-password/reset-password.component";
import {ProfileComponent} from './components/user/profile/profile.component';
import {ConfirmationCodeComponent} from "./components/user/confirmation-code/confirmation-code.component";
import {EditProfileComponent} from "./components/user/edit-profile/edit-profile.component";
import {UpdatePasswordComponent} from "./components/user/update-password/update-password.component";
import {PaymentComponent} from './components/payment/payment.component';
import {PaymentConfirmationComponent} from './components/payment-confirmation/payment-confirmation.component';
import {UserPackagesComponent} from './components/userPackages/userPackages.component';
import {PropertyDiscoveryComponent} from './components/property-discovery/property-discovery.component';
import {AdminHomeComponent} from './components/adminHome/adminHome.component';
import {PackageComponent} from './components/packages/packages.component';
import {DetailsComponent} from './components/packageDetails/details.component';
import {PendingComponent} from './components/pending/pending.component';
import {authGuard} from "./auth/auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user/home',
    pathMatch: 'full',
    data: {title: 'City Tours - Home'}
  },
  {
    path: 'user',
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent, data: {title: 'City Tours - Home'}},
      {path: 'login', component: LoginComponent, data: {title: 'City Tours - Login'}},
      {path: 'logout', component: LoginComponent, data: {title: 'City Tours - Logout'}},
      {
        path: 'register',
        children: [
          {path: '', component: RegisterComponent, data: {title: 'City Tours - Register'}},
          {path: 'confirmation-email', component: ConfirmationCodeComponent, data: {title: 'City Tours - Confirmation Email'}}
        ]
      },
      {path: 'forget-password', component: ForgetPasswordComponent, canActivate: [authGuard],data: {title: 'City Tours - Forget Password'}},
      {path: 'reset-password', component: ResetPasswordComponent, data: {title: 'City Tours - Reset Password'}},
      {
        path: 'profile',
        canActivate: [authGuard],
        children: [
          {path: '', redirectTo: 'view-profile', pathMatch: 'full'},
          {path: 'view-profile', component: ProfileComponent, data: {title: 'City Tours - My Profile'}},
          {path: 'edit-profile', component: EditProfileComponent, data: {title: 'City Tours - Edit Profile'}},
          {path: 'update-password', component: UpdatePasswordComponent, data: {title: 'City Tours - Update Password'}}
        ]
      },
      {path: 'payment', component: PaymentComponent, data: {title: 'City Tours - Payment'}},
      {path: 'confirmation', component: PaymentConfirmationComponent, data: {title: 'City Tours - Confirmation'}},
      {path: 'packages', component: UserPackagesComponent, data: {title: 'City Tours - Packages'}},
      {path: 'discoverproperty', component: PropertyDiscoveryComponent, data: {title: 'City Tours - Property'}}
    ]
  },
  {
    path: 'admin',
    // canActivate: [authGuard],
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: AdminHomeComponent, data: {title: 'City Tours - Property'}},
      {path: 'create-package', component: PackageComponent, data: {title: 'City Tours - Create Package'}},
      {path: 'package/details/:id', component: DetailsComponent, data: {title: 'City Tours - Package Details'}},
      {path: 'pending', component: PendingComponent, data: {title: 'City Tours - Pending'}}
    ]
  },
  {path: '**', component: PageNotFoundComponent, data: {title: 'City Tours - Page Not Found'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
