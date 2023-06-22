import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {LoadingBarService} from "../../services/loading-bar.service";

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.css']
})
export class EditPropertyComponent implements OnInit {
  formData: FormGroup;
  isSubmitted = false;

  constructor(  private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formData = this.formBuilder.group({
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      availability: ['', Validators.required],
      listingType: ['', Validators.required],
      bedroom_count: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      bathroom_count: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      airCondition: ['', Validators.required],
      wifi: ['', Validators.required],
      tv: ['', Validators.required],
      property_number: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]]
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.formData.valid) {
      // Perform the submission or update operation

      console.log(this.formData.value);
    }
  }

  protected readonly LoadingBarService = LoadingBarService;
}
