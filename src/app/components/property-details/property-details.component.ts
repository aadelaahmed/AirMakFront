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
  imageUrl:string;

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
      },
      (error) => {
        console.log("//////////eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee///////")
        console.error(error);
      }

    );
  }

  ngOnInit() {
    // this.imageUrl = "https://firebasestorage.googleapis.com/v0/b/airmak-163da.appspot.com/o/1687473125679_349463878_3531148067160639_1216578188164938866_n.jpg?alt=media&token=a0294873-68a0-4bd3-9ce0-92ca718f7371";
    this.propertyId = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log('Property ID in propertyDetails:', this.propertyId);
    this.getAndDisplayProperty(this.propertyId);
  }

  onZoomChanged(event:any) {
    console.log("zoom :" + this.zoom)
    if (this.zoom > 13)
      this.showPrice = true;
    this.showPrice = false;
  }

}
