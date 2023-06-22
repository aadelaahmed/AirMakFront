import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BestPackage } from 'src/app/models/BestPackage.model';
import { APIResponse } from 'src/app/models/api-response.model';
import { Package } from 'src/app/models/getPackage.model';
import { PackageService } from 'src/app/services/package.service';

@Component({
  selector: 'app-home',
  templateUrl: './adminHome.component.html',
  styleUrls: ['./adminHome.component.css']
})
export class AdminHomeComponent implements OnInit {

  packages: Package[] = [];
   numbers: number[] = [];
   numberOfPackages:number=5;
   package = new BestPackage();

  constructor(private _http: HttpClient, private router: Router, private packageService: PackageService) {
  }

  ngOnInit(): void {
    
    this.packageService.get().subscribe({
      next: response => {
        this.packages = response.payload;
      

      },
      error: error => { }
    });

    
      this.packageService.getCountOfSubscriptionsForPackage().subscribe({
        next: response => {
       
          this.numbers = response.payload;

  
        },
        error: error => { }
      });
    
      this.packageService.getPackagesCount().subscribe({
        next: response => {
       
          this.numberOfPackages = response.payload;

  
        },
        error: error => { }
      });

      this.packageService.getBestPackage().subscribe({
        next: response => {
       
          this.package = response.payload;

  
        },
        error: error => { }
      });
    

  }


  delete(id: number) {
   

    this.packageService.delete(id).subscribe(
      {
        next: reposnse => {
          alert(reposnse.errors.message);
          this.router.navigate(['/admin']);


        },
        error: error => { }

      }

    );

  }


}
