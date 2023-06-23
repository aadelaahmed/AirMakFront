import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {EditPropertyComponent} from "./components/edit-property/edit-property.component";
import {AddPropertyComponent} from "./components/add-property/add-property.component";
import {UserPropertiesComponent} from "./components/user-properties/user-properties.component";
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import {AddApartmentComponent} from "./components/add-property-component/add-property-component.component";
import {LoginComponent} from "./components/user/login/login.component";
import {RegisterComponent} from "./components/user/register/register.component";
import {ForgetPasswordComponent} from "./components/user/forget-password/forget-password.component";
import {ResetPasswordComponent} from "./components/user/reset-password/reset-password.component";
import { ProfileComponent } from './components/user/profile/profile.component';
import {ConfirmationCodeComponent} from "./components/user/confirmation-code/confirmation-code.component";
import {EditProfileComponent} from "./components/user/edit-profile/edit-profile.component";
import {UpdatePasswordComponent} from "./components/user/update-password/update-password.component";
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentConfirmationComponent } from './components/payment-confirmation/payment-confirmation.component';
import { UserPackagesComponent } from './components/userPackages/userPackages.component';
import { PropertyDiscoveryComponent } from './components/property-discovery/property-discovery.component';


import { AdminHomeComponent } from './components/adminHome/adminHome.component';
import { PackageComponent } from './components/packages/packages.component';
import { DetailsComponent } from './components/packageDetails/details.component';
import { PendingComponent } from './components/pending/pending.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full', title: 'City Tours - Home'},
  {path: 'home', component: HomeComponent, title: 'City Tours - Home'},
  {path: 'property/edit/:id', component: EditPropertyComponent, title: 'Edit Property'},
  {path: 'property/add', component: AddPropertyComponent, title: 'Add Property'},
  {path: 'user/properties', component: UserPropertiesComponent, title: 'User\'s Properties'},
  {path: 'property/details/:id', component: PropertyDetailsComponent, title: 'PropertyDetails'},
  {path: 'login', component: LoginComponent, title: 'City Tours - Login'},
  {path: 'logout', component: LoginComponent, title: 'City Tours - Login'},

  {path: 'register', component: RegisterComponent, title: 'City Tours - Register'},
  {path: 'forget-password', component: ForgetPasswordComponent, title: 'City Tours - Forget Password'},
  {path: 'reset-password', component: ResetPasswordComponent, title: 'City Tours - Reset Password'},
  {path: 'confirmation-email', component: ConfirmationCodeComponent, title: 'City Tours - Confirmation Email'},
  {path: 'property', component: AddApartmentComponent, title: 'City Tours - Add New Property'},
  {path: 'profile/view-profile', component: ProfileComponent, title: 'City Tours - My Profile'},
  {path: 'profile/edit-profile', component: EditProfileComponent, title: 'City Tours - Edit Profile'},
  {path: 'profile/update-password', component: UpdatePasswordComponent, title: 'City Tours - Update Password'},

  {path: 'payment', component: PaymentComponent, title: 'payment'},
  {path: 'confirmation', component: PaymentConfirmationComponent, title: 'confirmation'},
  {path: 'packages', component: UserPackagesComponent, title: 'packages'},
  {path: 'discoverproperty', component: PropertyDiscoveryComponent, title: 'property'},

  {path:'admin',component:AdminHomeComponent},
  {path:'create',component:PackageComponent},
  {path:'package/details/:id',component:DetailsComponent},
  {path:'pending',component:PendingComponent},

  {path: '**', component: PageNotFoundComponent, pathMatch: 'full', title: 'City Tours - Page Not Found'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
