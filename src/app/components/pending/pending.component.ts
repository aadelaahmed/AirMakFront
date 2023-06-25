import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PendingProperty } from 'src/app/models/PendingProperty.model';
import { PendingService } from 'src/app/services/pending.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-home',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class  PendingComponent implements OnInit {

  pendingProperty: PendingProperty[] = [];

  constructor(    private popupService: PopupService,
    private _http: HttpClient, private router: Router, private pendingService: PendingService) {
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
          console.log(reposnse);
          this.popupService.successPopup(reposnse.payload);
          this.router.navigate(['admin/pending']);
        },
        error: error => { 
          this.popupService.errorPopup(error.payload);
        }
      }
    );
  }

  showDetails(id:number) {
    this.router.navigate(['/user/property/details', id]); 
  }
}
