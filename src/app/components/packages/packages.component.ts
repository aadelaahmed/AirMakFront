import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { APIResponse } from 'src/app/models/api-response.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createPackage } from 'src/app/models/postPackage.model';
import { PackageService } from 'src/app/services/package.service';
import { Package } from 'src/app/models/getPackage.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackageComponent implements OnInit {
  packageForm: FormGroup;
  packages: Package[] = [];
  constructor(private _http: HttpClient, private router: Router, private _formBuilder: FormBuilder, private packageService: PackageService) {

  }

  ngOnInit(): void {
    this.packageForm = this._formBuilder.group({
      name:          ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      propertyCount: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(4)]],
      duration:      ['', [Validators.required, Validators.minLength(2), Validators.maxLength(4)]],
      price:         ['', [Validators.required, Validators.minLength(2), Validators.maxLength(4)]],
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
        console.log(response.payload);
        if (response.status) {
          this.router.navigate(['/admin']);
        }
        else {

        }
      },
      error: error => { alert("Error"); }
    }
    );







  }



}
