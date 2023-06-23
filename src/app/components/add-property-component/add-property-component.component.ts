import {Component} from "@angular/core";
import {Address} from "../../interface/address";
import {Property} from "../../interface/property";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import { AngularFireModule } from '@angular/fire/compat';
import {FirebaseStorageService} from "../../services/firebase-storage.service";
@Component({
  selector: 'add-apartment',
  template: 'your-html-template', // Replace with your HTML template code
})
export class AddPropertyComponent {
  formData: any = {}; // Property to hold form data
  constructor(private storageService: FirebaseStorageService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.uploadImage(file);
  }

  uploadImage(file: File) {
    this.storageService.uploadFile(file).subscribe(
      (downloadUrl: string) => {
        // Handle the download URL returned after successful upload
        console.log('Image uploaded. Download URL:', downloadUrl);
        //TODO:
        // Here you can pass the download URL to the server or perform any further actions
      },
      (error: any) => {
        // Handle the upload error
        console.error('Error uploading image:', error);
      }
    );
  }
  onSubmit() {
    const address = new Address();
    address.street = this.formData.street;
    address.city = this.formData.city;
    address.streetNo = this.formData.streetNo;
    address.country = this.formData.country;
    address.lng = this.formData.lng;
    address.lat = this.formData.lat;

    const property = new Property();
    property.address = address;
    property.propertyType = this.formData.property_type;
    property.description = this.formData.description;
    property.price = this.formData.price;
    property.availability = this.formData.availability;
    property.listingType = this.formData.listing_type;
    property.floorNo = this.formData.floor_no;
    property.wifi = this.formData.wifi;
    property.bedRoomCount = this.formData.bedroom_count;
    property.bathRoomCount = this.formData.bathroom_count;
    property.airCondition = this.formData.air_conditioning;
    property.tv = this.formData.tv;
    property.propertyNo = this.formData.property_number;

    // Perform further actions like API request or state update
    // ...
  }
}
