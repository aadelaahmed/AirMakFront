import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {HeaderComponent} from './components/shared/header/header.component';
import {FooterComponent} from './components/shared/footer/footer.component';
import {NgOptimizedImage} from "@angular/common";
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import {firebaseConfig} from "../environments/environment";
import { EditPropertyComponent } from './components/edit-property/edit-property.component';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { ExploringComponent } from './components/exploring/exploring.component';
import {AddPropertyComponent} from "./components/add-property/add-property.component";
import {AddPropertyService} from "./services/add-property/add-property.service";
import {HttpClientModule} from "@angular/common/http";
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    EditPropertyComponent,
    PropertyDetailsComponent,
    ExploringComponent,
    AddPropertyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireStorageModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AddPropertyService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
