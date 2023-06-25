import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { EditPropertyComponent } from "./components/edit-property/edit-property.component";
import { AddPropertyComponent } from "./components/add-property/add-property.component";
import { UserPropertiesComponent } from "./components/user-properties/user-properties.component";
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { LoginComponent } from "./components/user/login/login.component";
import { RegisterComponent } from "./components/user/register/register.component";
import { ForgetPasswordComponent } from "./components/user/forget-password/forget-password.component";
import { ResetPasswordComponent } from "./components/user/reset-password/reset-password.component";
import { ProfileComponent } from './components/user/profile/profile.component';
import { ConfirmationCodeComponent } from "./components/user/confirmation-code/confirmation-code.component";
import { EditProfileComponent } from "./components/user/edit-profile/edit-profile.component";
import { UpdatePasswordComponent } from "./components/user/update-password/update-password.component";
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentConfirmationComponent } from './components/payment-confirmation/payment-confirmation.component';
import { UserPackagesComponent } from './components/userPackages/userPackages.component';
import { PropertyDiscoveryComponent } from './components/property-discovery/property-discovery.component';
import { AdminHomeComponent } from './components/adminHome/adminHome.component';
import { PackageComponent } from './components/packages/packages.component';
import { DetailsComponent } from './components/packageDetails/details.component';
import { PendingComponent } from './components/pending/pending.component';
import { authGuard } from "./auth/auth.guard";
import { AdminComponent } from "./components/admin/admin.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user/home',
    pathMatch: 'full',
    data: { title: 'AirMAK - Home' }
  },
  { path: 'login', component: LoginComponent, data: { title: 'AirMAK - Login' } },
  {
    path: 'user',
    canActivate: [authGuard],
    children: [
      {
        path: 'property',
        children: [
          { path: 'discovery', component: PropertyDiscoveryComponent, data: { title: 'AirMAK - Property' } },
          { path: 'edit/:id', component: EditPropertyComponent, title: 'Edit Property' },
          { path: 'add', component: AddPropertyComponent, title: 'Add Property' },
          { path: 'details/:id', component: PropertyDetailsComponent, title: 'PropertyDetails' },
        ]
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, data: { title: 'AirMAK - Home' } },
      { path: 'logout', component: LoginComponent, data: { title: 'AirMAK - Logout' } },
      { path: 'properties', component: UserPropertiesComponent, title: 'AirMAK - User\'s Properties' },
      {
        path: 'register',
        children: [
          { path: '', component: RegisterComponent, data: { title: 'AirMAK - Register' } },
          { path: 'confirmation-email', component: ConfirmationCodeComponent, data: { title: 'AirMAK - Confirmation Email' } }
        ]
      },

      { path: 'forget-password', component: ForgetPasswordComponent, data: { title: 'AirMAK - Forget Password' } },
      { path: 'reset-password', component: ResetPasswordComponent, data: { title: 'AirMAK - Reset Password' } },
      {
        path: 'profile',
        children: [
          { path: '', redirectTo: 'view-profile', pathMatch: 'full' },
          { path: 'view-profile', component: ProfileComponent, data: { title: 'AirMAK - My Profile' } },
          { path: 'edit-profile', component: EditProfileComponent, data: { title: 'AirMAK - Edit Profile' } },
          { path: 'update-password', component: UpdatePasswordComponent, data: { title: 'AirMAK - Update Password' } }
        ]
      },
      { path: 'payment', component: PaymentComponent, data: { title: 'AirMAK - Payment' } },
      { path: 'confirmation', component: PaymentConfirmationComponent, data: { title: 'AirMAK - Confirmation' } },
      { path: 'packages', component: UserPackagesComponent, data: { title: 'AirMAK - Packages' } },
    ]
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminHomeComponent, data: { title: 'AirMAK - Dashboard' } },
      { path: 'add-admin', component: AdminComponent, data: { title: 'AirMAK - Add Admin' } },
      { path: 'create-package', component: PackageComponent, data: { title: 'AirMAK - Create Package' } },
      { path: 'package/details/:id', component: DetailsComponent, data: { title: 'AirMAK - Package Details' } },
      { path: 'pending', component: PendingComponent, data: { title: 'AirMAK - Pending' } }
    ]
  },


  { path: '**', component: PageNotFoundComponent, data: { title: 'AirMAK - Page Not Found' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
