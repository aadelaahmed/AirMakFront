import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs';
import { Packages } from 'src/app/interface/packages';
import { PackageService } from 'src/app/services/package.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent {
  public packages: Packages[];

  constructor(private packageService: PackageService, private router: Router) {
    this.getPackages();
  }

  getPackages() {
    this.packageService.getPackages().subscribe(data => {
      console.log(data);
      const packages = data.payload as Packages[];
      this.packages = packages;
    });
  }

  
  subscribeNow(selectedPackages:Packages) {
    this.router.navigate(['/payment'], { queryParams: selectedPackages});
  }
}
