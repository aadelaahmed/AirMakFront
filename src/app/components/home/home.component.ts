import { Component } from '@angular/core';
import { PageMetadata } from 'src/app/interface/PageMetaData';
import { Property } from 'src/app/interface/property';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  properties: Property[];
  pageMetadata: PageMetadata;

  constructor(private propertyService: PropertyService) {
  }

  ngOnInit() {
    this.getProperties();
  }

  getProperties() {
    this.propertyService.getProperties(0).subscribe(data => {
      this.properties = data.payload as Property[];
      this.pageMetadata = data.metadata as PageMetadata;
    })
  }
}
