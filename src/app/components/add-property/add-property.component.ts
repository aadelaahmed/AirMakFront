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
import {LoadingBarService} from "../../services/loading-bar.service";
import {SuccessPopupService} from "../../services/success-popup.service";
import { SessionStorageService } from "src/app/services/session-storage.service";

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
  isFormValidated: boolean = false;
  address = new Address();
  property = new Property();
  propertyPositionFromMap: any;
  centerPointForMap: google.maps.LatLngLiteral;
  lat:number = null;
  lng:number = null;
  ngOnInit() {
    this.isSubmitted = false;
    this.formData = this.formBuilder.group({
      property_type: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      //availability: ['', Validators.required],
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
      //country: ['', Validators.required],
      /*lng: ['', [Validators.required, Validators.pattern(/^-?\d{1,3}(\.\d{1,6})?$/)]],
      lat: ['', [Validators.required, Validators.pattern(/^-?\d{1,2}(\.\d{1,6})?$/)]],*/
      imgs: ['', Validators.required],
      /*img2: ['', Validators.required],
      img3: ['', Validators.required],*/
    });
  }

  constructor(private loadinBarService: LoadingBarService, private addPropertyService: AddPropertyService, private storageService: FirebaseStorageService, private formBuilder: FormBuilder,  private sessionStorage:SessionStorageService) {
    this.centerPointForMap = {
      lat: 30.182102629242127,
      lng: 30.58154140412807
    };
  }
  uploadImages(fileList: FileList) {
    if (this.isFormValidated) {
      this.property.images = [];
      const fileImg1 = fileList[0];
      const fileImg2 = fileList[1];
      const fileImg3 = fileList[2];
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
            this.property.images.push(new Image(downloadUrl));
            console.log(`Image ${i + 1} uploaded. Download URL: ${downloadUrl}`);
          }
        })
      ).subscribe(
        () => {
          // All uploads are completed
          this.addNewProperty();
        },
        (error: any) => {
          // Handle any upload error
          console.error('Error uploading images:', error);
          LoadingBarService.isLoading = false;

        }
      );
    }
  }

  addNewProperty() {
    console.log("check how many success executed");
    this.uploadProgress = 100;
    this.isUploadFinished = true;
    console.log(this.formData);
    this.address.street = this.formData.get('street').value;
    console.log(this.address.street);
    this.address.city = this.formData.get('city').value;
    this.address.streetNo = this.formData.get('streetNo').value;
    // this.address.country = this.formData.get('country').value;
    this.address.country = "Egypt";
    /*this.address.lng = this.formData.get('lng').value;
    this.address.lat = this.formData.get('lat').value;*/
    console.log(this.formData.get('city').value);
    this.property.address = this.address;
    this.property.propertyType = this.formData.get('property_type').value;
    this.property.description = this.formData.get('description').value;
    this.property.price = this.formData.get('price').value;
    // this.property.availability = this.formData.get('availability').value;
    this.property.availability = 1;
    this.property.listingType = this.formData.get('listing_type').value;
    this.property.floorNo = this.formData.get('floor_no').value;
    this.property.wifi = this.formData.get('wifi').value;
    this.property.bedRoomCount = this.formData.get('bedroom_count').value;
    this.property.bathRoomCount = this.formData.get('bathroom_count').value;
    this.property.airCondition = this.formData.get('air_conditioning').value;
    this.property.tv = this.formData.get('tv').value;
    this.property.publishDate = new Date();
    this.property.propertyNo = this.formData.get('property_number').value;
    //this.property.images = [];
    //this.property.images = this.uploadedImages;
    this.property.propertyState = "PENDING";
    console.log("test images in property -> " + this.property.images);
    //TODO : get current user id
    this.property.user = new User();
    this.property.user.id = this.sessionStorage.getItem("userID");
    this.property.address.lat = this.lat;
    this.property.address.lng = this.lng;
    console.log("property details : ");
    console.log(this.property);
    console.log("check on images ->" + this.property.images[2]);
    this.addPropertyService.addProperty(this.property);
  }
  public egyptMainCities: string[] = [
    "Cairo",
    "Alexandria",
    "Giza",
    "Shubra El-Kheima",
    "Port Said",
    "Suez",
    "Luxor",
    "Aswan",
    "Tanta",
    "Mansoura",
    "Damietta",
    "Ismailia",
    "Fayoum",
    "Zagazig",
    "Asyut",
    "Beni Suef",
    "Sohag",
    "Hurghada",
    "Minya",
    "Qena",
    "Safaga",
    "Assiut",
    "Banha",
    "Kafr El Sheikh",
    "Damanhur",
    "Al-Minya",
    "Qalyub",
    "Mallawi",
    "Damanhur",
    "Al-Minya",
    "Qalyub",
    "Mallawi"
  ];

  onSubmit(fileList: FileList) {
    this.isFormValidated = this.formData.valid;
    this.isSubmitted = true;
    console.log("fileList length ->"+fileList.length);
    LoadingBarService.isLoading = true;
    const propertyType = this.formData.get('property_type').value.toString().toLowerCase();
    if (propertyType === 'room') {
      this.formData.get('bedroom_count').setValue(0);
    }
    if (!this.isFormValidated || this.lat == null || this.lng == null || fileList.length != 3) {
      console.log("not validated");
      LoadingBarService.isLoading = false;
    } else {
      this.uploadImages(fileList);
    }
  }

  click(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.propertyPositionFromMap = event.latLng.toJSON();
    this.lng = this.propertyPositionFromMap.lng;
    this.lat = this.propertyPositionFromMap.lat;
  }
  protected readonly LoadingBarService = LoadingBarService;
}
