import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {LoadingBarService} from "../../services/loading-bar.service";
import {ActivatedRoute} from "@angular/router";
import {EditPropertyService} from "../../services/edit-property.service";
import {Observable} from "rxjs";
import {Property} from "../../interface/property";
import {UpdatePropertyDTO} from "../../interface/update-property";
import {user} from "@angular/fire/auth";
import {User} from "../../interface/user";
import { SessionStorageService } from 'src/app/services/session-storage.service';


@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.css']
})
export class EditPropertyComponent implements OnInit {
  formData: FormGroup;
  isSubmitted = false;
  propertyId:number;
  currentProperty:Property;
  constructor(private editPropertyService:EditPropertyService, private route: ActivatedRoute, private formBuilder: FormBuilder,  private sessionStorage:SessionStorageService) { }

  ngOnInit(): void {
    this.propertyId = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log("propertyId ->"+ this.propertyId);
    let observableProperty = this.editPropertyService.getPropertyById(this.propertyId);
    if (observableProperty != null){
      this.populateData(observableProperty);
    }else{
      //TODO: handle if there is an error when fetching the property by id.
      //navigate to 404 error page
    }
    this.formData = this.formBuilder.group({
      description: ['', Validators.required],
      // price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      price: ['', [Validators.required]],
      //availability: ['', Validators.required],
      listingType: ['', Validators.required],
      bedroom_count: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      bathroom_count: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      airCondition: ['', Validators.required],
      wifi: ['', Validators.required],
      tv: ['', Validators.required],
      //property_number: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]]
    });
  }
  populateData(observableProperty: Observable<Property>) {
    // Fetch property data and populate the form
    LoadingBarService.isLoading= true;
    this.editPropertyService.getPropertyById(this.propertyId).subscribe(
      (property: Property) => {
        LoadingBarService.isLoading= false;
        this.currentProperty = property;
        console.log("fetched property ->"+property);
        console.log("currentProperty ->"+this.currentProperty);
        this.formData.patchValue({
          description: property.description,
          price: property.price,
          // availability: property.availability,
          listingType: property.listingType,
          bedroom_count: property.bedRoomCount,
          bathroom_count: property.bathRoomCount,
          airCondition: property.airCondition,
          wifi: property.wifi,
          tv: property.tv,
        });
        console.log("current value screen for listingtype ->"+this.formData.get('listingType').value);
        console.log("current value screen for airCondition ->"+ this.formData.get('airCondition').value);
        console.log("current value screen for property.listingType ->"+ property.listingType);
        console.log("current value screen for property.airCondition ->"+ property.airCondition);
      },
      (error: any) => {
        // Handle error
        console.log(error);
        LoadingBarService.isLoading= false;
      }
    );
  }
  onSubmit(): void {
    this.isSubmitted = true;
    if (this.formData.valid) {
      // Perform the submission or update operation
      LoadingBarService.isLoading = true;
      console.log(this.formData.value);
      const updatedProperty:UpdatePropertyDTO = new UpdatePropertyDTO();
      updatedProperty.description = this.formData.get('description').value;
      updatedProperty.airCondition = this.formData.get('airCondition').value;
      updatedProperty.bedRoomCount = this.formData.get('bedroom_count').value;
      updatedProperty.bathRoomCount = this.formData.get('bathroom_count').value;
      updatedProperty.tv = this.formData.get('tv').value;
      updatedProperty.listingType = this.formData.get('listingType').value;
      updatedProperty.wifi = this.formData.get('wifi').value;
      updatedProperty.price = this.formData.get('price').value;
      updatedProperty.availability = this.currentProperty.availability;
      updatedProperty.id = this.currentProperty.id;
      updatedProperty.user = new User();
      //TODO: get user id from opened session.
      updatedProperty.user.id = this.sessionStorage.getItem("userID");

      console.log("check data in invalid form ->"+JSON.stringify(this.formData.value));
      this.editPropertyService.editProperty(updatedProperty);
    }else{
      LoadingBarService.isLoading = false;
      //console.log("check data in invalid form ->"+JSON.stringify(this.formData));
      console.log("check data in invalid form ->"+JSON.stringify(this.formData.value));
      console.log("unvalid edit form");
    }
  }

  protected readonly LoadingBarService = LoadingBarService;
}
