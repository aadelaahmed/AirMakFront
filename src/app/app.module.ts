import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {HeaderComponent} from './components/shared/header/header.component';
import {FooterComponent} from './components/shared/footer/footer.component';
import {NgOptimizedImage} from "@angular/common";
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import { AddPropertyComponent } from './components/add-property-component/add-property-component.component';
import {FormsModule} from "@angular/forms";
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { PaymentComponent } from './components/payment/payment.component';
import { HttpClientModule } from '@angular/common/http';
import { PaymentConfirmationComponent } from './components/payment-confirmation/payment-confirmation.component';
import { PackagesComponent } from './components/packages/packages.component';
import { PropertyDiscoveryComponent } from './components/property-discovery/property-discovery.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    AddPropertyComponent,
    PaymentComponent,
    PaymentConfirmationComponent,
    PackagesComponent,
    PropertyDiscoveryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    FormsModule,
    AngularFireStorageModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
