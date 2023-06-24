import { Component, OnInit } from '@angular/core';
import { PageMetadata } from 'src/app/interface/PageMetaData';
import { Property } from 'src/app/interface/property';
import { PropertyService } from 'src/app/services/property.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  properties: Property[];
  pageMetadata: PageMetadata;
  userID: string;

  constructor(private propertyService: PropertyService,private sessionStorageService: SessionStorageService) {
  }

  ngOnInit() {
    this.userID = this.sessionStorageService.getItem('userID');
    console.log('User ID: ', this.userID);
    this.getProperties();
  }

  getProperties() {
    this.propertyService.getProperties(0).subscribe(data => {
      this.properties = data.payload as Property[];
      this.pageMetadata = data.metadata as PageMetadata;
    })
  }
}
