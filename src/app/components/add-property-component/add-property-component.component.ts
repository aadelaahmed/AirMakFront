import {Component} from "@angular/core";
import {Address} from "../../interface/address";
import {Property} from "../../interface/property";

@Component({
  selector: 'add-apartment',
  template: 'your-html-template', // Replace with your HTML template code
})
export class AddApartmentComponent {
  formData: any = {}; // Property to hold form data

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
