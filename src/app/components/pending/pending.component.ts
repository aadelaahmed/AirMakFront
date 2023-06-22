import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PendingProperty } from 'src/app/models/PendingProperty.model';
import { PendingService } from 'src/app/services/pending.service';

@Component({
  selector: 'app-home',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class  PendingComponent implements OnInit {

  pendingProperty: PendingProperty[] = [];

  constructor(private _http: HttpClient, private router: Router, private pendingService: PendingService) {
  }

  ngOnInit(): void {
    
    this.pendingService.get().subscribe({
      next: response => {
        this.pendingProperty = response.payload;
      

      },
      error: error => { }
    });

    
    
    
     

   

  }


  accept(id: number) {
   

    this.pendingService.update(id).subscribe(
      {
        next: reposnse => {
          console.log("yassin");
          console.log(reposnse);
          this.router.navigate(['/admin']);


        },
        error: error => { 
              
          
        }

      }

    );

  }


}
