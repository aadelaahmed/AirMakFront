import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {EditPropertyComponent} from "./components/edit-property/edit-property.component";
import {AddPropertyComponent} from "./components/add-property/add-property.component";
import { PropertyDetailsComponent } from './components/property-details/property-details.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full', title: 'AirMAK'},
  {path: 'home', component: HomeComponent, title: 'AirMAK'},
  {path: 'edit/property', component: EditPropertyComponent, title: 'Edit Property'},
  {path: 'add/property', component: AddPropertyComponent, title: 'Add Property'},
  {path: 'propertyDetails', component: PropertyDetailsComponent, title: 'Property Details'},
  {path: '**', component: PageNotFoundComponent, pathMatch: 'full', title: 'AirMak - Page Not Found'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
