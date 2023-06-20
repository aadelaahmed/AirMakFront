import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {AddApartmentComponent} from "./components/add-property-component/add-property-component.component";
import {LoginComponent} from "./components/user/login/login.component";
import {RegisterComponent} from "./components/user/register/register.component";
import {ForgetPasswordComponent} from "./components/user/forget-password/forget-password.component";
import {ResetPasswordComponent} from "./components/user/reset-password/reset-password.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full', title: 'City Tours - Home'},
  {path: 'home', component: HomeComponent, title: 'City Tours - Home'},
  {path: 'login', component: LoginComponent, title: 'City Tours - Login'},
  {path: 'register', component: RegisterComponent, title: 'City Tours - Register'},
  {path: 'forget-password', component: ForgetPasswordComponent, title: 'City Tours - Forget Password'},
  {path: `reset-password`, component: ResetPasswordComponent, title: 'City Tours - Reset Password'},
  {path: 'property', component: AddApartmentComponent, title: 'City Tours - Add New Property'},
  {path: '**', component: PageNotFoundComponent, pathMatch: 'full', title: 'City Tours - Page Not Found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
