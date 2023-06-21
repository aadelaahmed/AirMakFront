import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIResponse } from 'src/app/models/api-response.model';
import { Package } from 'src/app/models/getPackage.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  package=new Package();
  studentFormEdit: FormGroup;

  constructor(private _activatedRoute:ActivatedRoute,private _http:HttpClient,private _formBuilder: FormBuilder){
  }
  ngOnInit(): void {

    
    this._activatedRoute.paramMap
    .subscribe(parms=>{
      let id=parms.get('id');
    this.getPackageById(id);

    });

    
  }
  getPackageById(id:string|null)
  {
    this._http.get<APIResponse>('http://localhost:8097/packages/'+id)
    .subscribe(
      {
        next:reponse=>{
          this.package=reponse.payload;
        }
      }
    );
  }
  

  
  update(): void {


  }

  
}
