import {Component, OnInit} from "@angular/core";
import {Address} from "../../interface/address";
import {Property} from "../../interface/property";
import {FirebaseStorageService} from "../../services/firebase-storage/firebase-storage.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Image} from "../../interface/image";

@Component({
  selector: 'add-apartment',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  formData: FormGroup;
  isSubmitted: boolean = false;
  images: Image[];

  constructor(private storageService: FirebaseStorageService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.formData = this.formBuilder.group({
      property_type: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      availability: ['', Validators.required],
      listing_type: ['', Validators.required],
      floor_no: ['', Validators.required],
      wifi: ['', Validators.required],
      bedroom_count: ['', Validators.required],
      bathroom_count: ['', Validators.required],
      air_conditioning: ['', Validators.required],
      tv: ['', Validators.required],
      property_number: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      streetNo: ['', Validators.required],
      country: ['', Validators.required],
      lng: ['', Validators.required],
      lat: ['', Validators.required],
      img1: ['', Validators.required],
      img2: ['', Validators.required],
      img3: ['', Validators.required],
    });
  }

  onFileSelected(event: any) {
    //TODO : whenever user selects a new image, save this image into the array
    // and when submit button of form, then iterate through this array to add each
    // image at the cloud.
    const file: File = event.target.files[0];
    //this.uploadImage(file);
  }

  uploadImage() {
    const fileImg1 = this.formData.get('img1').value;
    const fileImg2 = this.formData.get('img2').value;
    const fileImg3 = this.formData.get('img3').value;

    this.images = [];

    for (let i = 0; i < 3; i++) {
      const file = i === 0 ? fileImg1 : i === 1 ? fileImg2 : fileImg3;

      this.storageService.uploadFile(file).subscribe(
        (downloadUrl: string) => {
          this.images.push(new Image(downloadUrl));
          console.log('Image uploaded. Download URL:', downloadUrl);
        },
        (error: any) => {
          // Handle the upload error
          console.error('Error uploading image:', error);
        }
      );
    }
  }


  onSubmit(): void {
    this.uploadImage();
    console.log(this.formData);
    this.isSubmitted = true;
    const address = new Address();
    address.street = this.formData.get('street').value;
    console.log(address.street);
    address.city = this.formData.get('city').value;
    address.streetNo = this.formData.get('streetNo').value;
    address.country = this.formData.get('country').value;
    address.lng = this.formData.get('lng').value;
    address.lat = this.formData.get('lat').value;
    console.log(this.formData.get('city').value);
    const property = new Property();
    property.address = address;
    property.propertyType = this.formData.get('property_type').value;
    property.description = this.formData.get('description').value;
    property.price = this.formData.get('price').value;
    property.availability = this.formData.get('availability').value;
    property.listingType = this.formData.get('listing_type').value;
    property.floorNo = this.formData.get('floor_no').value;
    property.wifi = this.formData.get('wifi').value;
    property.bedRoomCount = this.formData.get('bedroom_count').value;
    property.bathRoomCount = this.formData.get('bathroom_count').value;
    property.airCondition = this.formData.get('air_conditioning').value;
    property.tv = this.formData.get('tv').value;
    property.propertyNo = this.formData.get('property_number').value;
    // TODO:
    // Perform further actions like API request or state update
    // by using a service
  }

}
