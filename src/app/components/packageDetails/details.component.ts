import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { APIResponse } from 'src/app/models/api-response.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PackageService } from 'src/app/services/package.service';
import { Package } from 'src/app/models/getPackage.model';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  package = new Package();
  packageFormEdit: FormGroup;

  constructor(private popupService: PopupService,private formBuilder: FormBuilder,private _activatedRoute: ActivatedRoute, private router: Router, private _http: HttpClient, private packageService: PackageService) {
  }

  ngOnInit(): void {

    this._activatedRoute.paramMap
      .subscribe(parms => {
        let id = parms.get('id');
        this.getPackageById(id);

      });

      this.packageFormEdit = this.formBuilder.group({
        price:         ['', [Validators.required]],
      });


  }
  getPackageById(id: string | null) {
    this._http.get<APIResponse>('http://localhost:8080/packages/' + id)
      .subscribe(
        {
          next: reponse => {
            this.package = reponse.payload;
            console.log(this.package)
          }
        }
      );
  }



  update(pakcgaeId:string,price:string): void {


    this.packageService.update(pakcgaeId,price).subscribe({
      next: response => {
        console.log(response.payload);
        if (response.status) {
          this.popupService.successPopup('Update Successfuly');

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
