import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Property } from 'src/app/interface/property';
import { EditPropertyService } from 'src/app/services/edit-property/edit-property.service';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent {
  propertyId: number;
  property: Property = new Property();
  mapVisible: boolean = false;
  center: google.maps.LatLngLiteral;
  zoom: number = 15 ;
  markerIcon: string;
  showPrice: boolean = true;


  constructor(private route: ActivatedRoute, private propertyService: EditPropertyService) {
    propertyService.baseUrl = "http://localhost:8080/properties";
  }

  getAndDisplayProperty(id: number) {
    this.propertyService.getPropertyById(id).subscribe(
      (payload) => {
        console.log("/////////////////")
        console.log(payload);
        this.property = this.propertyService.mapResponseToProperty(payload);
        this.markerIcon = "https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png";
        // this.markerIcon = "assets/img/map icons/1.png";

        this.center = {
          lat: this.property.address.lat,
          lng: this.property.address.lng
        };
        console.log(this.property);
        console.log("/////////////////")
      },
      (error) => {
        console.log("//////////eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee///////")
        console.error(error);
        console.log("/////////////////")
      }

    );
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      // this.propertyId = params['id'];
      this.propertyId = 55;
      console.log('Property ID:', this.propertyId);
      this.getAndDisplayProperty(this.propertyId);
    });
  }

  onZoomChanged(event:any) {
    console.log("zoom :" + this.zoom)
    if (this.zoom > 13)
      this.showPrice = true;
    this.showPrice = false;
  }

}
