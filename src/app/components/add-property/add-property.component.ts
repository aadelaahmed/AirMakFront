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
import { Component, OnInit } from "@angular/core";
import { Address } from "../../interface/address";
import { User } from "../../interface/user";
import { Property } from "../../interface/property";
import { FirebaseStorageService } from "../../services/firebase-storage/firebase-storage.service";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Image } from "../../interface/image";
import { AddPropertyService } from "../../services/add-property/add-property.service";
import { forkJoin, Observable } from "rxjs";
import { map } from "rxjs/operators";

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

  constructor(private loadinBarService:LoadingBarService,private addPropertyService: AddPropertyService, private storageService: FirebaseStorageService, private formBuilder: FormBuilder) {
  propertyPositionFromMap: any;
  centerPointForMap: google.maps.LatLngLiteral = {
    lat: 30.182102629242127,
    lng: 30.58154140412807
  };

  constructor(private addPropertyService: AddPropertyService, private storageService: FirebaseStorageService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.isSubmitted = false;
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
      this.property.images = [];
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
          LoadingBarService.isLoading= false;

        }
      );
    }
  }

  addNewProperty(){
    console.log("check how many success executed");
    this.uploadProgress = 100;
    this.isUploadFinished = true;
    //TODO: then, add the property to the database.
    console.log(this.formData);
    this.address.street = this.formData.get('street').value;
    console.log(this.address.street);
    this.address.city = this.formData.get('city').value;
    this.address.streetNo = this.formData.get('streetNo').value;
    this.address.country = this.formData.get('country').value;
    this.address.lng = this.formData.get('lng').value;
    this.address.lat = this.formData.get('lat').value;
    console.log(this.formData.get('city').value);
    this.property.address = this.address;
    this.property.propertyType = this.formData.get('property_type').value;
    this.property.desc = this.formData.get('description').value;
    this.property.price = this.formData.get('price').value;
    this.property.availability = this.formData.get('availability').value;
    this.property.listingType = this.formData.get('listing_type').value;
    this.property.floorNo = this.formData.get('floor_no').value;
    this.property.wifi = this.formData.get('wifi').value;
    this.property.bedRoomCount = this.formData.get('bedroom_count').value;
    this.property.bathRoomCount = this.formData.get('bathroom_count').value;
    this.property.airCondition = this.formData.get('air_conditioning').value;
    this.property.tv = this.formData.get('tv').value;
    this.property.propertyNo = this.formData.get('property_number').value;
    //this.property.images = [];
    //this.property.images = this.uploadedImages;
    this.property.propertyState = "PENDING";
    console.log("test images in property -> " + this.property.images);
    //TODO : get current user id
    this.property.user = new User();
    this.property.user.id = 1;
    console.log("check on images ->"+this.property.images[2]);
    this.addPropertyService.addProperty(this.property);
  }
  onSubmit(fileList1: FileList, fileList2: FileList, fileList3: FileList): void {
    this.isFormValidated = this.formData.valid;
    this.isSubmitted = true;
    LoadingBarService.isLoading= true;
    if (!this.isFormValidated) {
      console.log("not validated");
      LoadingBarService.isLoading= false;
    } else {
      this.uploadImages(fileList1,fileList2,fileList3);
    }
  }

  click(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.propertyPositionFromMap = event.latLng.toJSON();
    console.log(this.propertyPositionFromMap);
    console.log(this.propertyPositionFromMap.lat);
    console.log(this.propertyPositionFromMap.lng);

  }

  protected readonly LoadingBarService = LoadingBarService;
}
