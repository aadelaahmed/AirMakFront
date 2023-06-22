import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {HeaderComponent} from './components/shared/header/header.component';
import {FooterComponent} from './components/shared/footer/footer.component';
import {NgOptimizedImage} from "@angular/common";
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {AddApartmentComponent} from './components/add-property-component/add-property-component.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from './components/user/login/login.component';
import {RegisterComponent} from './components/user/register/register.component';
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgetPasswordComponent } from './components/user/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/user/reset-password/reset-password.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { ConfirmationCodeComponent } from './components/user/confirmation-code/confirmation-code.component';
import {SharedService} from "./services/shared.service";
import { EditProfileComponent } from './components/user/edit-profile/edit-profile.component';
import { UpdatePasswordComponent } from './components/user/update-password/update-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    AddApartmentComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    ProfileComponent,
    ConfirmationCodeComponent,
    EditProfileComponent,
    UpdatePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
