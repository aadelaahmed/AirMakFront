import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PageMetadata } from 'src/app/interface/PageMetaData';
import { PropertyFilter } from 'src/app/interface/PropertyFilter';
import { Property } from 'src/app/interface/property';
import { PropertyService } from 'src/app/services/property.service';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Router } from '@angular/router';
import { MapInfo } from 'src/app/models/map.model';


@Component({
  selector: 'app-property-discovery',
  templateUrl: './property-discovery.component.html',
  styleUrls: ['./property-discovery.component.css']
})
export class PropertyDiscoveryComponent implements OnInit {
  isLoaded: boolean = false;
  propertyFilter: PropertyFilter = new PropertyFilter();
  properties: Property[];
  page: number = 0;

  pageMetadata: PageMetadata;

  rangeValues: string = "";


  constructor(private propertyService: PropertyService, private router: Router) {
    map: MapInfo;
    // this.searchForProperties(this.page);
    this.propertyService.filterProperties(this.propertyFilter, this.page + 1).subscribe(response => {
      this.properties = response.payload as Property[];
      console.log(response)
      this.pageMetadata = response.metadata as PageMetadata;
      console.log(this.pageMetadata)
      this.isLoaded = true;

      console.log("Filter : " + JSON.stringify(this.propertyFilter));
      console.log("All : " + JSON.stringify(this.properties));
      console.log("1");
    })
  }

  ngOnInit() {
    console.log("2")
  }

  updateRange() {
    const values = this.rangeValues.split("-");
    const fromValue = Number(values[0]);
    const toValue = Number(values[1]);

    console.log("From:", fromValue);
    console.log("To:", toValue);
  }

  searchForProperties(page: number) {
    console.log("price");
    this.page = page;
    // this.propertyService.filterProperties(this.propertyFilter, page + 1).subscribe(response => {
    //   this.properties = response.payload as Property[];
    //   console.log(response)
    //   this.pageMetadata = response.metadata as PageMetadata;
    //   console.log(this.pageMetadata)
    //   this.isLoaded = true;
    // })

  }

  counterArray(length: number): number[] {
    return Array(length).fill(0).map((x, i) => i);
  }



  public egyptMainCities: string[] = [
    "Cairo",
    "Alexandria",
    "Giza",
    "Shubra El-Kheima",
    "Port Said",
    "Suez",
    "Luxor",
    "Aswan",
    "Tanta",
    "Mansoura",
    "Damietta",
    "Ismailia",
    "Fayoum",
    "Zagazig",
    "Asyut",
    "Beni Suef",
    "Sohag",
    "Hurghada",
    "Minya",
    "Qena",
    "Safaga",
    "Assiut",
    "Banha",
    "Kafr El Sheikh",
    "Damanhur",
    "Al-Minya",
    "Qalyub",
    "Mallawi",
    "Damanhur",
    "Al-Minya",
    "Qalyub",
    "Mallawi"
  ];


  imageUrl: string = "assets/img/ll.png";
  map = new MapInfo();
  propertyInfo: Property = new Property();
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;

  moveToPropertyDetails(propertyId: number) {
    this.router.navigate(['property/details', propertyId]);
    console.log("Property Id to Redirect : " + propertyId);
  }

  Over(property: Property, marker: MapMarker) {
    this.propertyInfo = property;
    if (this.infoWindow != undefined) this.infoWindow.open(marker);
    console.log("The Property On Selected Mark : " + this.propertyInfo)
    console.log(property);
  }

  Out() {
    this.infoWindow.close();
  }

  imageBounds: google.maps.LatLngBoundsLiteral = {
    south: 30.883889,
    west: 34.267383,
    north: 32.035631,
    east: 35.396374
  };
}
