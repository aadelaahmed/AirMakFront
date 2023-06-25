import { GoogleMapsModule } from '@angular/google-maps';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import {firebaseConfig} from "../environments/environment";
import { EditPropertyComponent } from './components/edit-property/edit-property.component';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import {AddPropertyComponent} from "./components/add-property/add-property.component";
import {AddPropertyService} from "./services/add-property.service";
import { UserPropertiesComponent } from './components/user-properties/user-properties.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NgOptimizedImage } from "@angular/common";
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RegisterComponent } from './components/user/register/register.component';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgetPasswordComponent } from './components/user/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/user/reset-password/reset-password.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { ConfirmationCodeComponent } from './components/user/confirmation-code/confirmation-code.component';
import { EditProfileComponent } from './components/user/edit-profile/edit-profile.component';
import { UpdatePasswordComponent } from './components/user/update-password/update-password.component';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';

import { PaymentComponent } from './components/payment/payment.component';
import { PaymentConfirmationComponent } from './components/payment-confirmation/payment-confirmation.component';
import { PropertyDiscoveryComponent } from './components/property-discovery/property-discovery.component';
import { UserPackagesComponent } from './components/userPackages/userPackages.component';
import { PendingComponent } from './components/pending/pending.component';
import { AdminHomeComponent } from './components/adminHome/adminHome.component';
import { PackageComponent } from './components/packages/packages.component';

import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';
import { HeaderComponent } from './components/shared/header/header.component';
import { LoginComponent } from './components/user/login/login.component';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    EditPropertyComponent,
    PropertyDetailsComponent,
    AddPropertyComponent,
    UserPropertiesComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    ProfileComponent,
    ConfirmationCodeComponent,
    EditProfileComponent,
    UpdatePasswordComponent,
    PaymentComponent,
    PaymentConfirmationComponent,
    UserPackagesComponent,
    PropertyDiscoveryComponent,
    PackageComponent,
    AdminHomeComponent,
    PendingComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireStorageModule,
    ReactiveFormsModule,
    HttpClientModule,
    GoogleMapsModule
  ],
  providers: [
    AddPropertyService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '248555964328-9ch256vbo4bc3fdcheqf6iiqt7pe88na.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('251985627474760')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  // providers: [AddPropertyService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
