import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {EditPropertyComponent} from "./components/edit-property/edit-property.component";
import {AddPropertyComponent} from "./components/add-property/add-property.component";
import {UserPropertiesComponent} from "./components/user-properties/user-properties.component";
import {TryEditComponent} from "./components/try-edit/try-edit.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full', title: 'City Tours - Home'},
  {path: 'home', component: HomeComponent, title: 'City Tours - Home'},
  {path: 'property/edit/:id', component: EditPropertyComponent, title: 'Edit Property'},
  {path: 'property/add', component: AddPropertyComponent, title: 'Add Property'},
  {path: 'user/properties', component: UserPropertiesComponent, title: 'User\'s Properties'},
  {path: 'try/:id', component: TryEditComponent, title: 'Try User\'s Properties'},
  {path: '**', component: PageNotFoundComponent, pathMatch: 'full', title: 'City Tours - Page Not Found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
