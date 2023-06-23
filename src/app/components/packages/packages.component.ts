import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { APIResponse } from 'src/app/models/api-response.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createPackage } from 'src/app/models/postPackage.model';
import { PackageService } from 'src/app/services/package.service';
import { Package } from 'src/app/models/getPackage.model';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackageComponent implements OnInit {
  packageForm: FormGroup;
  packages: Package[] = [];
  constructor(private popupService: PopupService,private _http: HttpClient, private router: Router, private _formBuilder: FormBuilder, private packageService: PackageService) {

  }

  ngOnInit(): void {
    this.packageForm = this._formBuilder.group({
      name:          ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      propertyCount: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
      duration:      ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
      price:         ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
    });

    this.packageService.get().subscribe({
      next: response => {
        this.packages = response.payload;
      },
      error: error => { }
    });
  }

  add(): void {

    let student: createPackage = this.packageForm.value;
    this.packageService.post(student).subscribe({
      next: response => {
        
        this.popupService.successPopup("Package Created");

          this.router.navigate(['/admin']);
        
       
      },
      error: error => {


       }
    }
    );







  }



}
