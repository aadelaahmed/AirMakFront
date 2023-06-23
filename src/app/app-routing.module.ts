import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {AddPropertyComponent} from "./components/add-property-component/add-property-component.component";
import { PaymentComponent } from './components/payment/payment.component';
import { PackagesComponent } from './components/packages/packages.component';
import { PaymentConfirmationComponent } from './components/payment-confirmation/payment-confirmation.component';
import { PropertyDiscoveryComponent } from './components/property-discovery/property-discovery.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full', title: 'City Tours - Home'},
  {path: 'home', component: HomeComponent, title: 'City Tours - Home'},
  {path: 'payment', component: PaymentComponent, title: 'payment'},
  {path: 'confirmation', component: PaymentConfirmationComponent, title: 'confirmation'},
  {path: 'packages', component: PackagesComponent, title: 'packages'},
  {path: 'property', component: AddPropertyComponent, title: 'Add New Property'},
  {path: 'discoverproperty', component: PropertyDiscoveryComponent, title: 'property'},
  {path: '**', component: PageNotFoundComponent, pathMatch: 'full', title: 'City Tours - Page Not Found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
