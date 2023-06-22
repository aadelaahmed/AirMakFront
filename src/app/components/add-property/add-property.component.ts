import {Component, OnInit} from "@angular/core";
import {Address} from "../../interface/address";
import {User} from "../../interface/user";
import {Property} from "../../interface/property";
import {FirebaseStorageService} from "../../services/firebase-storage.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Image} from "../../interface/image";
import {AddPropertyService} from "../../services/add-property.service";
import {forkJoin, Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'add-apartment',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  formData: FormGroup;
  isSubmitted: boolean = false;
  uploadProgress: number = 0;
  isUploadFinished: boolean = false;
  uploadedImages: Image[] = [];
  isFormValidated: boolean = false;

  constructor(private addPropertyService: AddPropertyService, private storageService: FirebaseStorageService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.formData = this.formBuilder.group({
      property_type: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      availability: ['', Validators.required],
      listing_type: ['', Validators.required],
      floor_no: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      wifi: ['', Validators.required],
      bedroom_count: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      bathroom_count: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      air_conditioning: ['', Validators.required],
      tv: ['', Validators.required],
      property_number: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      street: ['', Validators.required],
      city: ['', Validators.required],
      streetNo: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      country: ['', Validators.required],
      lng: ['', [Validators.required, Validators.pattern(/^-?\d{1,3}(\.\d{1,6})?$/)]],
      lat: ['', [Validators.required, Validators.pattern(/^-?\d{1,2}(\.\d{1,6})?$/)]],
      img1: ['', Validators.required],
      img2: ['', Validators.required],
      img3: ['', Validators.required],
    });
  }

  uploadImages(fileList1: FileList, fileList2: FileList, fileList3: FileList): void {
    if (this.isFormValidated){
      const fileImg1 = fileList1[0];
      const fileImg2 = fileList2[0];
      const fileImg3 = fileList3[0];
      const uploadObservables: Observable<string>[] = [];
      // Create an upload Observable for each file
      const uploadObservable1 = this.storageService.uploadFile(fileImg1);
      const uploadObservable2 = this.storageService.uploadFile(fileImg2);
      const uploadObservable3 = this.storageService.uploadFile(fileImg3);

      uploadObservables.push(uploadObservable1, uploadObservable2, uploadObservable3);

      // Combine all upload Observables into a single Observable
      const combinedObservable = forkJoin(uploadObservables);

      combinedObservable.pipe(
        map((downloadUrls: string[]) => {
          // Handle the successful uploads
          for (let i = 0; i < downloadUrls.length; i++) {
            const downloadUrl = downloadUrls[i];
            this.uploadedImages.push(new Image(downloadUrl));
            console.log(`Image ${i + 1} uploaded. Download URL: ${downloadUrl}`);
            // You can store the download URLs or perform further actions
          }
        })
      ).subscribe(
        () => {
          // All uploads are completed
          this.uploadProgress = 100;
          this.isUploadFinished = true;
          this.uploadedImages = this.uploadedImages;
          // Call the addProperty method here or perform further actions
          this.onSubmit();
        },
        (error: any) => {
          // Handle any upload error
          console.error('Error uploading images:', error);
        }
      );
    }
  }


  onSubmit(): void {
    this.isFormValidated = this.formData.valid;
    if (!this.isFormValidated) {
      console.log("not validated");
    } else {
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
      property.desc = this.formData.get('description').value;
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
      property.images = [];
      property.images = this.uploadedImages;
      console.log("test images in property -> " + property.images);
      //TODO : get current user id
      property.user = new User();
      property.user.id = 1;
      this.addPropertyService.addProperty(property);
    }
  }
}
