import { Component, OnInit } from '@angular/core';
import { PageMetadata } from 'src/app/interface/PageMetaData';
import { Property } from 'src/app/interface/property';
import { PropertyService } from 'src/app/services/property.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import {LoadingBarService} from "../../services/loading-bar.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  properties: Property[];
  pageMetadata: PageMetadata;
  userID: string;
  isLoading :boolean;

  constructor(private propertyService: PropertyService,private sessionStorageService: SessionStorageService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.userID = this.sessionStorageService.getItem('userID');
    console.log('User ID: ', this.userID);
    this.getProperties();
  }

  getProperties() {
    this.propertyService.getProperties(0).subscribe(data => {
        this.isLoading = false;
      this.properties = data.payload as Property[];
      this.pageMetadata = data.metadata as PageMetadata;
    },
      (error) => {
        // Error handler
        this.isLoading = false;
        console.error('Error adding property:', error);
      });
  }

    protected readonly LoadingBarService = LoadingBarService;
}
